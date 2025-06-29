import React, { createContext, useState } from 'react';

// Create a Context
export const UserContext = createContext();

// Create a Provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const login = (user) => {
    setUserData(user);
  };

  const logout = () => {
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}








