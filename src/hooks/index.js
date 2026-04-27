// src/hooks/index.js
// Centralized exports for all custom hooks

// Re-export useAuth from AuthContext (backward compatible)
export { useAuth } from '../context/AuthContext';

// Common utility hooks
export { useDebounce } from './useDebounce';
export { useLocalStorage } from './useLocalStorage';

// Admin hooks
export { useAdminProfiles } from './useAdminProfiles';

// Credit & Subscription hooks
export { useCredits, useCanPerformAction, useCreditCheck, ActionTypes } from './useCredits';

/**
 * Usage:
 * import { useAuth, useDebounce, useCredits, useAdminProfiles } from '../hooks';
 * 
 * OR individual imports still work:
 * import { useAuth } from '../context/AuthContext';
 */

