/**
 * Authentication Utility Functions
 * Helper functions for JWT token management and authentication
 */

/**
 * Get the raw JWT token from localStorage
 * @returns {string|null} The JWT token or null if not found
 */
export const getToken = () => {
    try {
        return localStorage.getItem('token');
    } catch (error) {
        console.error('Error getting token from localStorage:', error);
        return null;
    }
};

/**
 * Set JWT token in localStorage
 * @param {string} token - The JWT token to store
 */
export const setToken = (token) => {
    try {
        localStorage.setItem('token', token);
    } catch (error) {
        console.error('Error setting token in localStorage:', error);
    }
};

/**
 * Remove token from localStorage and clear user session
 */
export const logout = () => {
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Also remove user data if stored
        
        // Optional: Clear other auth-related data
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('tokenExpiry');
        
        // Redirect to login page (if using React Router)
        // window.location.href = '/login';
        
        console.log('User logged out successfully');
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

/**
 * Decode JWT token payload without verification
 * @param {string} token - The JWT token to decode
 * @returns {object|null} Decoded payload or null if invalid
 */
export const decodeToken = (token) => {
    try {
        if (!token) return null;
        
        // JWT has three parts separated by dots
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        
        // Decode the payload (second part)
        const payload = parts[1];
        const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        
        return JSON.parse(decodedPayload);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

/**
 * Check if token is expired
 * @param {object} decodedToken - The decoded JWT payload
 * @returns {boolean} True if token is expired
 */
export const isTokenExpired = (decodedToken) => {
    if (!decodedToken || !decodedToken.exp) return true;
    
    // JWT exp is in seconds, Date.now() is in milliseconds
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
};

/**
 * Check if user is authenticated
 * Returns decoded token if it exists and is not expired
 * @returns {object|null} Decoded token if valid, null otherwise
 */
export const isAuthenticated = () => {
    try {
        const token = getToken();
        if (!token) return null;
        
        const decodedToken = decodeToken(token);
        if (!decodedToken) return null;
        
        if (isTokenExpired(decodedToken)) {
            // Token is expired, clean up
            logout();
            return null;
        }
        
        return decodedToken;
    } catch (error) {
        console.error('Error checking authentication:', error);
        return null;
    }
};

/**
 * Get user info from stored token
 * @returns {object|null} User information or null if not authenticated
 */
export const getUserInfo = () => {
    const decodedToken = isAuthenticated();
    if (!decodedToken) return null;
    
    return {
        userId: decodedToken.userId,
        email: decodedToken.email,
        exp: decodedToken.exp,
        iat: decodedToken.iat
    };
};

/**
 * Check if token will expire soon (within specified minutes)
 * @param {number} minutesThreshold - Minutes before expiration to trigger warning
 * @returns {boolean} True if token expires soon
 */
export const isTokenExpiringSoon = (minutesThreshold = 5) => {
    const decodedToken = isAuthenticated();
    if (!decodedToken) return false;
    
    const currentTime = Date.now() / 1000;
    const timeUntilExpiry = decodedToken.exp - currentTime;
    const minutesUntilExpiry = timeUntilExpiry / 60;
    
    return minutesUntilExpiry <= minutesThreshold;
};

/**
 * Get time remaining until token expires
 * @returns {object|null} Object with days, hours, minutes, seconds or null
 */
export const getTokenTimeRemaining = () => {
    const decodedToken = isAuthenticated();
    if (!decodedToken) return null;
    
    const currentTime = Date.now() / 1000;
    const timeRemaining = decodedToken.exp - currentTime;
    
    if (timeRemaining <= 0) return null;
    
    const days = Math.floor(timeRemaining / (24 * 3600));
    const hours = Math.floor((timeRemaining % (24 * 3600)) / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = Math.floor(timeRemaining % 60);
    
    return { days, hours, minutes, seconds, totalSeconds: timeRemaining };
};

/**
 * Create Authorization header for API requests
 * @returns {object|null} Authorization header object or null
 */
export const getAuthHeader = () => {
    const token = getToken();
    if (!token || !isAuthenticated()) return null;
    
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
};

/**
 * Handle authentication errors (401, 403)
 * Automatically logout user if authentication fails
 * @param {object} error - Error object from API response
 */
export const handleAuthError = (error) => {
    if (error.response) {
        const status = error.response.status;
        
        // Handle authentication errors
        if (status === 401 || status === 403) {
            console.warn('Authentication failed, logging out user');
            logout();
            
            // Optionally redirect to login
            // window.location.href = '/login';
            
            return true; // Indicates auth error was handled
        }
    }
    
    return false; // Not an auth error
};

/**
 * Refresh token (if you implement refresh token functionality)
 * This is a placeholder for future implementation
 * @returns {Promise<boolean>} Success status
 */
export const refreshToken = async () => {
    try {
        // Placeholder for refresh token logic
        // const refreshToken = localStorage.getItem('refreshToken');
        // const response = await fetch('/auth/refresh', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ refreshToken })
        // });
        
        console.warn('Refresh token functionality not implemented yet');
        return false;
    } catch (error) {
        console.error('Error refreshing token:', error);
        return false;
    }
};

/**
 * Check if user has specific role (if roles are stored in token)
 * @param {string} role - Role to check for
 * @returns {boolean} True if user has the role
 */
export const hasRole = (role) => {
    const decodedToken = isAuthenticated();
    if (!decodedToken) return false;
    
    // Assuming roles are stored in token (you might need to adjust this)
    return decodedToken.roles && decodedToken.roles.includes(role);
};

/**
 * Storage helper functions
 */
export const storage = {
    /**
     * Get item from localStorage with error handling
     * @param {string} key - Storage key
     * @returns {string|null} Stored value or null
     */
    get: (key) => {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.error(`Error getting ${key} from localStorage:`, error);
            return null;
        }
    },
    
    /**
     * Set item in localStorage with error handling
     * @param {string} key - Storage key
     * @param {string} value - Value to store
     */
    set: (key, value) => {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.error(`Error setting ${key} in localStorage:`, error);
        }
    },
    
    /**
     * Remove item from localStorage with error handling
     * @param {string} key - Storage key to remove
     */
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing ${key} from localStorage:`, error);
        }
    }
};

// Default export with all functions
export default {
    getToken,
    setToken,
    logout,
    decodeToken,
    isTokenExpired,
    isAuthenticated,
    getUserInfo,
    isTokenExpiringSoon,
    getTokenTimeRemaining,
    getAuthHeader,
    handleAuthError,
    refreshToken,
    hasRole,
    storage
};
