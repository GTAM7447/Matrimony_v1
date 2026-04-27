// Security Event Logger - Enterprise-Grade Audit Trail
// Logs all security-critical events for monitoring and compliance
import { BASE_URL } from "../apiConfig";

/**
 * Security Event Types
 */
export const SecurityEvents = {
    // Authentication Events
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    SESSION_EXPIRED: 'SESSION_EXPIRED',

    // Token Events  
    TOKEN_REFRESH_SUCCESS: 'TOKEN_REFRESH_SUCCESS',
    TOKEN_REFRESH_FAILURE: 'TOKEN_REFRESH_FAILURE',
    TOKEN_EXPIRED: 'TOKEN_EXPIRED',
    INVALID_TOKEN: 'INVALID_TOKEN',

    // Access Events
    UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
    FORBIDDEN_ACCESS: 'FORBIDDEN_ACCESS',
    PROTECTED_ROUTE_ACCESS: 'PROTECTED_ROUTE_ACCESS',

    // Security Threats
    SUSPECTED_XSS: 'SUSPECTED_XSS',
    SUSPECTED_CSRF: 'SUSPECTED_CSRF',
    RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
    SUSPICIOUS_ACTIVITY: 'SUSPICIOUS_ACTIVITY',

    // Account Events
    PASSWORD_CHANGE: 'PASSWORD_CHANGE',
    EMAIL_CHANGE: 'EMAIL_CHANGE',
    PROFILE_UPDATE: 'PROFILE_UPDATE',
};

/**
 * Security Event Severity Levels
 */
export const SecuritySeverity = {
    INFO: 'INFO',
    WARNING: 'WARNING',
    ERROR: 'ERROR',
    CRITICAL: 'CRITICAL',
};

/**
 * Get security event severity
 */
const getEventSeverity = (eventType) => {
    const criticalEvents = [
        SecurityEvents.SUSPECTED_XSS,
        SecurityEvents.SUSPECTED_CSRF,
        SecurityEvents.UNAUTHORIZED_ACCESS,
    ];

    const errorEvents = [
        SecurityEvents.LOGIN_FAILURE,
        SecurityEvents.TOKEN_REFRESH_FAILURE,
        SecurityEvents.INVALID_TOKEN,
        SecurityEvents.FORBIDDEN_ACCESS,
    ];

    const warningEvents = [
        SecurityEvents.SESSION_EXPIRED,
        SecurityEvents.TOKEN_EXPIRED,
        SecurityEvents.RATE_LIMIT_EXCEEDED,
    ];

    if (criticalEvents.includes(eventType)) return SecuritySeverity.CRITICAL;
    if (errorEvents.includes(eventType)) return SecuritySeverity.ERROR;
    if (warningEvents.includes(eventType)) return SecuritySeverity.WARNING;
    return SecuritySeverity.INFO;
};

/**
 * Get user context for logging
 */
const getUserContext = () => {
    try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            return {
                userId: user.id || user.sub,
                email: user.email,
                roles: user.authorities || user.roles || [],
            };
        }
    } catch (error) {
        console.error('Failed to get user context:', error);
    }
    return { userId: null, email: null, roles: [] };
};

/**
 * Get device/browser info
 */
const getDeviceInfo = () => ({
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
});

/**
 * Send log to backend
 */
const sendToBackend = async (logEntry) => {
    try {
        // Only send if explicitly enabled
        if (import.meta.env.VITE_ENABLE_AUDIT_LOGS !== 'true') {
            return;
        }

        // ... inside logSecurityEvent
        await fetch(`${BASE_URL}/api/v1/audit/security-event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(logEntry),
        });
    } catch (error) {
        // Silently fail - don't break app if logging fails
        console.error('Failed to send security log:', error);
    }
};

/**
 * Main logging function
 * @param {string} eventType - Type of security event
 * @param {object} metadata - Additional event data
 * @param {boolean} sendToServer - Whether to send to backend (default: true)
 */
export const logSecurityEvent = (eventType, metadata = {}, sendToServer = true) => {
    const severity = getEventSeverity(eventType);
    const userContext = getUserContext();
    const deviceInfo = getDeviceInfo();

    const logEntry = {
        event: eventType,
        severity,
        timestamp: new Date().toISOString(),
        user: userContext,
        device: deviceInfo,
        metadata: {
            url: window.location.href,
            referrer: document.referrer,
            ...metadata,
        },
    };

    // Console log with color coding
    const colors = {
        INFO: 'color: #3b82f6', // Blue
        WARNING: 'color: #f59e0b', // Orange
        ERROR: 'color: #ef4444', // Red
        CRITICAL: 'color: #dc2626; font-weight: bold', // Dark Red Bold
    };

    console.log(
        `%c[SECURITY ${severity}] ${eventType}`,
        colors[severity],
        logEntry
    );

    // Send to backend
    if (sendToServer) {
        sendToBackend(logEntry);
    }

    // Store locally for debugging (last 100 events)
    try {
        const logs = JSON.parse(sessionStorage.getItem('security_logs') || '[]');
        logs.push(logEntry);
        if (logs.length > 100) logs.shift(); // Keep only last 100
        sessionStorage.setItem('security_logs', JSON.stringify(logs));
    } catch (error) {
        console.error('Failed to store security log:', error);
    }
};

/**
 * Helper functions for common security events
 */

export const logLoginSuccess = (email, method = 'email') => {
    logSecurityEvent(SecurityEvents.LOGIN_SUCCESS, { email, method });
};

export const logLoginFailure = (email, reason) => {
    logSecurityEvent(SecurityEvents.LOGIN_FAILURE, { email, reason });
};

export const logLogout = (reason = 'user_initiated') => {
    logSecurityEvent(SecurityEvents.LOGOUT, { reason });
};

export const logUnauthorizedAccess = (endpoint, statusCode) => {
    logSecurityEvent(SecurityEvents.UNAUTHORIZED_ACCESS, { endpoint, statusCode });
};

export const logTokenRefresh = (success, error = null) => {
    logSecurityEvent(
        success ? SecurityEvents.TOKEN_REFRESH_SUCCESS : SecurityEvents.TOKEN_REFRESH_FAILURE,
        { error }
    );
};

export const logSuspiciousActivity = (description, data = {}) => {
    logSecurityEvent(SecurityEvents.SUSPICIOUS_ACTIVITY, { description, ...data });
};

/**
 * Get security logs for admin dashboard
 */
export const getSecurityLogs = () => {
    try {
        return JSON.parse(sessionStorage.getItem('security_logs') || '[]');
    } catch {
        return [];
    }
};

/**
 * Clear security logs
 */
export const clearSecurityLogs = () => {
    sessionStorage.removeItem('security_logs');
};

export default {
    logSecurityEvent,
    logLoginSuccess,
    logLoginFailure,
    logLogout,
    logUnauthorizedAccess,
    logTokenRefresh,
    logSuspiciousActivity,
    getSecurityLogs,
    clearSecurityLogs,
    SecurityEvents,
    SecuritySeverity,
};
