import axios from 'axios';

// Configuração do cliente axios para o backend
const api = axios.create({
  baseURL: 'https://chatbot-backend-lz8l.onrender.com', // URL do servidor Node.js
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para enviar mensagem ao chatbot
export const sendMessage = async (message, history) => {
  try {
    const response = await api.post('/api/chat', {
      message,
      history,
    });
    
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    throw error;
  }
};
