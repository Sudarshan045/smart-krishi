// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { authService } from '../services/authService.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // true while we verify token on page load
  const [error, setError] = useState(null);

  // Persist session across page reloads
  useEffect(() => {
    const savedToken = localStorage.getItem('sk_token');
    const savedUser = localStorage.getItem('sk_user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      // Optionally re-verify token with the server
      authService.getMe()
        .then((res) => {
          setUser(res.user);
          localStorage.setItem('sk_user', JSON.stringify(res.user));
        })
        .catch(() => {
          // Token is stale — clear session
          clearSession();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }

    // Listen for 401 events dispatched by apiClient interceptor
    const handleExpiry = () => clearSession();
    window.addEventListener('auth:expired', handleExpiry);
    return () => window.removeEventListener('auth:expired', handleExpiry);
  }, []);

  const saveSession = (authToken, userData) => {
    setToken(authToken);
    setUser(userData);
    localStorage.setItem('sk_token', authToken);
    localStorage.setItem('sk_user', JSON.stringify(userData));
  };

  const clearSession = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('sk_token');
    localStorage.removeItem('sk_user');
  };

  /**
   * Register — creates account and logs in automatically
   */
  const register = async (name, email, password, mobile) => {
    setError(null);
    const res = await authService.register({ name, email, password, mobile });
    saveSession(res.token, res.user);
    return res;
  };

  /**
   * Login — authenticates and stores session
   */
  const login = async (email, password) => {
    setError(null);
    const res = await authService.login(email, password);
    saveSession(res.token, res.user);
    return res;
  };

  /**
   * Logout — clears session
   */
  const logout = useCallback(async () => {
    await authService.logout();
    clearSession();
  }, []);

  /**
   * Update user data in context (e.g., after profile update)
   * Does NOT hit the API — call userService.updateProfile first
   */
  const updateUserData = (updatedUser) => {
    const merged = { ...user, ...updatedUser };
    setUser(merged);
    localStorage.setItem('sk_user', JSON.stringify(merged));
  };

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!user && !!token,
    register,
    login,
    loginWithToken: async (authToken) => {
      localStorage.setItem('sk_token', authToken);
      const res = await authService.getMe();
      saveSession(authToken, res.user);
      return res.user;
    },
    logout,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};