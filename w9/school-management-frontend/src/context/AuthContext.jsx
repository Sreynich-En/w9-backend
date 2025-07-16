import { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // Current user data
  const [loading, setLoading] = useState(true); // Loading state

  // Function to decode JWT token
  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  // Function to check if token is valid (not expired)
  const isTokenValid = (token) => {
    try {
      const payload = decodeToken(token);
      if (!payload) return false;
      
      // Check if token is expired
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  };

  // Function to update auth state
  const updateAuth = (token) => {
    if (token && isTokenValid(token)) {
      const userData = decodeToken(token);
      setAuth(userData);
      localStorage.setItem('token', token);
      
      // Update API headers
      import('../api').then(module => {
        module.default.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      });
    } else {
      setAuth(null);
      localStorage.removeItem('token');
      
      // Remove API headers
      import('../api').then(module => {
        delete module.default.defaults.headers.common['Authorization'];
      });
    }
  };

  // Function to logout
  const logout = () => {
    setAuth(null);
    localStorage.removeItem('token');
    
    // Remove API headers
    import('../api').then(module => {
      delete module.default.defaults.headers.common['Authorization'];
    });
  };

  // Check for existing token on mount
  useEffect(() => {
    const checkAuthState = () => {
      const token = localStorage.getItem('token');
      
      if (token && isTokenValid(token)) {
        const userData = decodeToken(token);
        setAuth(userData);
        
        // Set API headers
        import('../api').then(module => {
          module.default.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        });
      } else {
        // Remove invalid token
        localStorage.removeItem('token');
        setAuth(null);
      }
      
      setLoading(false);
    };

    checkAuthState();
  }, []);

  // Context value
  const value = {
    auth,
    setAuth: updateAuth,
    loading,
    isAuthenticated: () => auth !== null,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;