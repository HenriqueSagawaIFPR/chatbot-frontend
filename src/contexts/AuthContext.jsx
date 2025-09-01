import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getCurrentUser, updateProfile, changePassword } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar se há um token válido ao inicializar
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Token inválido:', error);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [token]);

  // Função de login
  const login = async (credentials) => {
    try {
      setError(null);
      const response = await loginUser(credentials);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      setError(error.message || 'Erro no login');
      throw error;
    }
  };

  // Função de registro
  const register = async (userData) => {
    try {
      setError(null);
      const response = await registerUser(userData);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      setError(error.message || 'Erro no registro');
      throw error;
    }
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    setError(null);
  };

  // Função para atualizar perfil
  const updateUserProfile = async (profileData) => {
    try {
      setError(null);
      const updatedUser = await updateProfile(profileData);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      setError(error.message || 'Erro ao atualizar perfil');
      throw error;
    }
  };

  // Função para alterar senha
  const changeUserPassword = async (passwordData) => {
    try {
      setError(null);
      await changePassword(passwordData);
      setError(null);
    } catch (error) {
      setError(error.message || 'Erro ao alterar senha');
      throw error;
    }
  };

  // Função para limpar erros
  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    token,
    isLoading,
    error,
    login,
    register,
    logout,
    updateUserProfile,
    changeUserPassword,
    clearError,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
