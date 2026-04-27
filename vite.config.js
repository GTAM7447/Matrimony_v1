import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const connectSrcParts = [
    "'self'",
    'https://mttlprv1.digiledge.info',
    'http://localhost:8080',
    'ws://localhost:*',
    'wss://localhost:*',
  ]
  const apiBase = env.VITE_API_BASE_URL || 'http://localhost:8080'
  try {
    const apiOrigin = new URL(apiBase).origin
    if (!connectSrcParts.includes(apiOrigin)) {
      connectSrcParts.push(apiOrigin)
    }
  } catch {
    /* ignore invalid VITE_API_BASE_URL */
  }

  return {
  plugins: [react(), tailwindcss()],

  // Cache configuration
  cacheDir: 'node_modules/.vite',

  // Force dependency re-optimization on config changes
  optimizeDeps: {
    force: false, // Set to true to force re-optimization
  },

  server: {
    // Force cache clearing and fresh reloads
    hmr: {
      overlay: true, // Show errors in browser overlay
    },
    watch: {
      usePolling: true, // Better file change detection
    },

    // Security headers for development
    headers: {
      // Prevent browser caching during development
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store',
      // Content Security Policy - Prevents XSS attacks
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Note: unsafe-inline needed for dev
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https: blob:",
        `connect-src ${connectSrcParts.join(' ')}`,
        "frame-ancestors 'none'",
      ].join('; '),

      // Prevent MIME type sniffing
      'X-Content-Type-Options': 'nosniff',

      // Prevent clickjacking
      'X-Frame-Options': 'DENY',

      // XSS Protection (legacy browsers)
      'X-XSS-Protection': '1; mode=block',

      // Referrer Policy - Controls information sent in Referer header
      'Referrer-Policy': 'strict-origin-when-cross-origin',

      // Permissions Policy - Controls browser features
      'Permissions-Policy': [
        'geolocation=()',
        'microphone=()',
        'camera=()',
        'payment=()',
        'usb=()',
        'magnetometer=()',
      ].join(', '),
    },
  },

  // Build configuration for production
  build: {
    // Generate source maps for debugging (disable in prod if needed)
    sourcemap: false,

    // Minify for security (obfuscation)
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },

    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
  },
}
})
