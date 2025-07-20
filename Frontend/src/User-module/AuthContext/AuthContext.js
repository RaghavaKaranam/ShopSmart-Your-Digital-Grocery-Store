import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// ✅ Set expiration time (e.g., 15 minutes)
const EXPIRATION_TIME = 15 * 60 * 1000; // 15 minutes

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔁 On load: check sessionStorage and validate expiry
  useEffect(() => {
    const stored = sessionStorage.getItem('user');
    const expiry = sessionStorage.getItem('sessionExpiry');

    if (stored && expiry && Date.now() < parseInt(expiry)) {
      setUser(JSON.parse(stored));
    } else {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('sessionExpiry');
    }
  }, []);

  // ✅ Login function
  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('sessionExpiry', Date.now() + EXPIRATION_TIME);
  };

  // ✅ Signup (optional)
  const signup = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('sessionExpiry', Date.now() + EXPIRATION_TIME);
  };

  // ✅ Logout
  const logout = () => {
    alert("Your session has expired or you have been logged out.");
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('sessionExpiry');
  };

  // 🔁 Check for session expiry periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const expiry = sessionStorage.getItem('sessionExpiry');
      if (expiry && Date.now() > parseInt(expiry)) {
        logout();
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
