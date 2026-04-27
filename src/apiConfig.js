// Centralized API Configuration
// This file is separate to avoid circular dependencies between api.js, auth.js, etc.

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
