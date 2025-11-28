//Atualmente o token esta sendo armazenado no localStorage, mas irei trocar para cookies futuromente por questoes de seguranca (httpOnly, secure, sameSite).

import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
  const stored = localStorage.getItem('token');
  return stored && stored !== 'null' && stored !== 'undefined' ? stored : null;
});

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
