// Automatic Token Refresh System
// Handles refresh token flow with HttpOnly cookies

import { logTokenRefresh, SecurityEvents, logSecurityEvent } from './securityLogger';
import { BASE_URL } from '../apiConfig';

const REFRESH_ENDPOINT = `${BASE_URL}/api/v1/auth/refresh`;
const TOKEN_CHECK_INTERVAL = 60 * 1000; // Check every minute
const REFRESH_BEFORE_EXPIRY = 2 * 60 * 1000; // Refresh 2 minutes before expiry

let refreshTimer = null;
let isRefreshing = false;
let refreshPromise = null;

/**
 * Decode JWT without verification (client-side only)
 */
const decodeToken = (token) => {
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
        return null;
    }
};

/**
 * Check if token is about to expire
 * @param {number} expiryTime - Token expiry timestamp (seconds)
 * @returns {boolean}
 */
const isTokenExpiringSoon = (expiryTime) => {
    const now = Date.now();
    const expiryMs = expiryTime * 1000;
    const timeUntilExpiry = expiryMs - now;

    return timeUntilExpiry < REFRESH_BEFORE_EXPIRY && timeUntilExpiry > 0;
};

/**
 * Get access token from document.cookie
 * Note: With HttpOnly cookies, we can't read the token value directly
 * This is just for checking if cookie exists
 */
const hasAccessTokenCookie = () => {
    return document.cookie.split(';').some(cookie =>
        cookie.trim().startsWith('access_token=')
    );
};

/**
 * Call refresh endpoint to get new access token
 * Backend will read refresh_token from HttpOnly cookie and set new access_token cookie
 */
const refreshAccessToken = async () => {
    // Prevent multiple simultaneous refresh calls
    if (isRefreshing) {
        return refreshPromise;
    }

    isRefreshing = true;
    refreshPromise = (async () => {
        try {
            const response = await fetch(REFRESH_ENDPOINT, {
                method: 'POST',
                credentials: 'include', // Send cookies (refresh_token)
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Refresh failed: ${response.status}`);
            }

            const data = await response.json();

            // Backend should have set new access_token cookie
            logTokenRefresh(true);

            return { success: true, data };
        } catch (error) {
            console.error('Token refresh failed:', error);
            logTokenRefresh(false, error.message);

            // If refresh fails, user needs to login again
            logSecurityEvent(SecurityEvents.SESSION_EXPIRED, {
                reason: 'refresh_token_expired',
            });

            // Redirect to login
            window.location.href = '/signin';

            return { success: false, error };
        } finally {
            isRefreshing = false;
            refreshPromise = null;
        }
    })();

    return refreshPromise;
};

/**
 * Axios request interceptor to refresh token if needed
 * Install this in your axios instance
 */
export const createRefreshInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.request.use(
        async (config) => {
            // Skip refresh for login/refresh endpoints
            if (
                config.url?.includes('/login') ||
                config.url?.includes('/refresh') ||
                config.url?.includes('/signup')
            ) {
                return config;
            }

            // With HttpOnly cookies, we can't read token expiry from client
            // So we rely on backend returning 401 and handle it in response interceptor

            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // If 401 and not already retried, try refreshing
            // CRITICAL: Skip refresh for login requests to avoid infinite reload loops
            if (
                error.response?.status === 401 &&
                !originalRequest._retry &&
                !originalRequest.url?.includes('/login') &&
                !originalRequest.url?.includes('/auth')
            ) {
                originalRequest._retry = true;

                try {
                    await refreshAccessToken();

                    // Retry original request
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    return Promise.reject(refreshError);
                }
            }

            // Handle 403 Forbidden
            if (error.response?.status === 403) {
                logSecurityEvent(SecurityEvents.FORBIDDEN_ACCESS, {
                    endpoint: originalRequest.url,
                    method: originalRequest.method,
                });
            }

            return Promise.reject(error);
        }
    );
};

/**
 * Start periodic token check (for non-HttpOnly fallback)
 * This is backup - with HttpOnly cookies, backend handles most of this
 */
export const startTokenRefreshTimer = () => {
    if (refreshTimer) {
        clearInterval(refreshTimer);
    }

    // Initial check
    checkAndRefreshToken();

    // Check periodically
    refreshTimer = setInterval(checkAndRefreshToken, TOKEN_CHECK_INTERVAL);
};

/**
 * Stop token refresh timer
 */
export const stopTokenRefreshTimer = () => {
    if (refreshTimer) {
        clearInterval(refreshTimer);
        refreshTimer = null;
    }
};

/**
 * Check token and refresh if needed
 */
const checkAndRefreshToken = async () => {
    // With HttpOnly cookies, we can't check token expiry client-side
    // This function is mainly for logging and monitoring

    if (!hasAccessTokenCookie()) {
        console.log('No access token cookie found');
        return;
    }

    // If we had access to token (non-HttpOnly), we'd check expiry here
    // For now, just log that we have a cookie
    console.log('Access token cookie exists');
};

/**
 * Manual refresh trigger (for testing or explicit refresh)
 */
export const manualRefresh = async () => {
    return await refreshAccessToken();
};

export default {
    createRefreshInterceptor,
    startTokenRefreshTimer,
    stopTokenRefreshTimer,
    manualRefresh,
    refreshAccessToken,
};
