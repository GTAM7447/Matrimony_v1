// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

/**
 * Sync state with localStorage
 * 
 * @param {string} key - localStorage key
 * @param {any} initialValue - Default value if nothing in storage
 * @returns {[any, Function]} - [storedValue, setValue]
 * 
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'dark');
 */
export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
};

export default useLocalStorage;
