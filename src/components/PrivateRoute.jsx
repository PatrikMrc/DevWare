import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  // Verifica se o token é válido
  const isAuthenticated =
    token && token.trim() !== '' && token !== 'null' && token !== 'undefined';

  if (!isAuthenticated) {
    // Redireciona para o login se não estiver logado
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado, exibe a página normalmente
  return children;
};
