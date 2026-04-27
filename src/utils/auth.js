// Enterprise-Grade Authentication Utility
// Supports both HttpOnly cookies (preferred) and client-side cookies (fallback)

import Cookies from 'js-cookie';
import { BASE_URL } from '../apiConfig';
import {
    logLoginSuccess,
    logLogout,
    logSecurityEvent,
    SecurityEvents
} from './securityLogger';

// Cookie keys
const ACCESS_TOKEN_KEY = 'access_token'; // HttpOnly (backend-set)
const REFRESH_TOKEN_KEY = 'refresh_token'; // HttpOnly (backend-set)
const CLIENT_TOKEN_KEY = 'auth_token'; // Fallback (client-set, for migration)

const TOKEN_EXPIRY_DAYS = 7;

/**
 * Cookie configuration for client-side cookies (fallback)
 */
const cookieConfig = {
    expires: TOKEN_EXPIRY_DAYS,
    sameSite: 'strict',
    secure: window.location.protocol === 'https:',
};

/**
 * Check if we're using HttpOnly cookies (preferred) or client cookies (fallback)
 */
export const isUsingHttpOnlyCookies = () => {
    // If backend sets HttpOnly cookies, we can't read them with document.cookie
    // But we can detect them via a test API call or by trying to fetch
    return import.meta.env.VITE_USE_HTTPONLY_COOKIES === 'true';
};

/**
 * Store authentication token
 * @param {string} token - JWT token from backend
 */
export const setAuthToken = (token) => {
    if (!token) {
        console.error('Cannot set empty token');
        return;
    }

    try {
        // If backend sets HttpOnly cookies, we don't need to do anything client-side
        if (isUsingHttpOnlyCookies()) {
            console.log('✅ Token set by backend (HttpOnly)');
            return;
        }

        // Fallback: Set client-side cookie
        Cookies.set(CLIENT_TOKEN_KEY, token, cookieConfig);
        console.log('✅ Auth token stored (client-side fallback)');
    } catch (error) {
        console.error('Failed to store auth token:', error);
        logSecurityEvent(SecurityEvents.SUSPICIOUS_ACTIVITY, {
            action: 'token_store_failed',
            error: error.message,
        });
    }
};

/**
 * Retrieve authentication token
 * @returns {string|null} - JWT token or null
 */
export const getAuthToken = () => {
    try {
        // With HttpOnly cookies, we can't read the token
        // But we check if 'user' exists in localStorage as a proxy for session existence
        // Real validation happens on API calls (401 response)
        if (isUsingHttpOnlyCookies()) {
            return localStorage.getItem('user') ? 'http_only_token' : null;
        }

        // Fallback: Read from client-side cookie
        const token = Cookies.get(CLIENT_TOKEN_KEY);
        return token || null;
    } catch (error) {
        console.error('Failed to retrieve auth token:', error);
        return null;
    }
};

/**
 * Remove authentication tokens (local cleanup only)
 * Note: Backend logout (/api/v1/auth/logout) is called from AuthContext.hardLogout
 */
export const removeAuthToken = () => {
    try {
        // Remove client-side cookies
        Cookies.remove(CLIENT_TOKEN_KEY, {
            sameSite: 'strict',
            secure: window.location.protocol === 'https:',
        });

        // Clean up any legacy localStorage items
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

        logLogout('user_initiated');
        console.log('✅ Auth tokens removed');
    } catch (error) {
        console.error('Failed to remove auth token:', error);
    }
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
    const token = getAuthToken();
    if (!token) return false;

    // With HttpOnly cookies, we can't check expiry client-side
    // Backend will handle this and return 401 if expired
    if (isUsingHttpOnlyCookies()) {
        return true; // Assume valid if proxy check passed in getAuthToken
    }

    // Fallback: Check token expiry
    if (isTokenExpired(token)) {
        removeAuthToken();
        logSecurityEvent(SecurityEvents.TOKEN_EXPIRED);
        return false;
    }

    return true;
};

/**
 * Decode JWT token (client-side only, no verification)
 * @param {string} token - JWT token
 * @returns {object|null}
 */
export const decodeToken = (token) => {
    if (!token || token === 'http_only_token') return null;

    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Failed to decode token:', error);
        logSecurityEvent(SecurityEvents.INVALID_TOKEN, {
            error: error.message,
        });
        return null;
    }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean}
 */
export const isTokenExpired = (token) => {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
};

/**
 * Get current user info
 * @returns {object|null}
 */
export const getCurrentUser = () => {
    // Try to get from localStorage first
    try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
    } catch (error) {
        console.error('Failed to get user from localStorage:', error);
    }

    // Fallback: Decode from token (if not HttpOnly)
    const token = getAuthToken();
    if (!token || token === 'http_only_token') return null;

    if (isTokenExpired(token)) {
        removeAuthToken();
        return null;
    }

    return decodeToken(token);
};

/**
 * Check if current user is admin
 * @returns {boolean}
 */
export const isAdmin = () => {
    const user = getCurrentUser();
    if (!user) return false;

    const authorities = user.authorities || user.roles || [];
    return authorities.some(role =>
        role.toUpperCase().includes('ADMIN')
    );
};

/**
 * Migrate old localStorage tokens to cookies
 */
export const migrateFromLocalStorage = () => {
    // Only migrate if not using HttpOnly cookies
    if (isUsingHttpOnlyCookies()) {
        // Clean up old tokens
        localStorage.removeItem('authToken');
        return;
    }

    const oldToken = localStorage.getItem('authToken');

    if (oldToken && !getAuthToken()) {
        console.log('📦 Migrating token from localStorage to cookie...');
        setAuthToken(oldToken);
        localStorage.removeItem('authToken');
    }
};

// Auto-migrate on module load
migrateFromLocalStorage();

export default {
    setAuthToken,
    getAuthToken,
    removeAuthToken,
    isAuthenticated,
    decodeToken,
    isTokenExpired,
    getCurrentUser,
    isAdmin,
    migrateFromLocalStorage,
    isUsingHttpOnlyCookies,
};
