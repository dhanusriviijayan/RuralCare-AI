import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('arogya_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return mockUsers.patient; // Default demo user: Patient
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('arogya_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('arogya_user');
    }
  }, [user]);

  const login = (role = 'patient') => {
    const selected = mockUsers[role.toLowerCase()] || mockUsers.patient;
    setUser(selected);
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role) => {
    login(role);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, switchRole, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
