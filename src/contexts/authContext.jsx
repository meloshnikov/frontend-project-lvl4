import React, { createContext, useState } from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('userId')) || null);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setUserId(data);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setUserId(null);
  };

  const getAuthHeader = () => {
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
  };

  const value = {
    userId, logIn, logOut, getAuthHeader,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
