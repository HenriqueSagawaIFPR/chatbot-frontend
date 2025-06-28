import axios from 'axios';

// Define a URL base da sua API backend
// Certifique-se de que esta URL esteja correta e acessível pelo frontend
// Em desenvolvimento, pode ser algo como 'http://localhost:3000/api'
// Em produção, será a URL do seu servidor backend implantado
const API_BASE_URL = 'https://chatbot-backend-lz8l.onrender.com/api'; 

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Envia uma mensagem para o backend.
 * Pode ser para um chat existente (passando chatId) ou para criar um novo chat (omitindo chatId).
 * @param {string} message - O texto da mensagem do usuário.
 * @param {string|null} chatId - O ID do chat existente, ou null/undefined para criar um novo.
 * @returns {Promise<object>} - A resposta da API, contendo { response: string, chatId: string }.
 */
export const sendMessage = async (message, chatId) => {
  try {
    // A rota do backend agora é única: /api/chat
    // Passamos a mensagem e opcionalmente o chatId no corpo da requisição
    const payload = { message };
    if (chatId) {
      payload.chatId = chatId;
    }

    const { data } = await apiClient.post('/chat', payload);
    return data; // Espera-se { response: "texto", chatId: "id_do_chat" }
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro de comunicação com a API');
  }
};

/**
 * Busca a lista de chats existentes.
 * @returns {Promise<Array<object>>} - Um array de objetos de chat, contendo { _id, title, createdAt, updatedAt }.
 */
export const getChats = async () => {
  try {
    const { data } = await apiClient.get('/chats');
    return data; // Espera-se um array [{ _id, title, ... }, ...]
  } catch (error) {
    console.error('Erro ao buscar chats:', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao buscar lista de chats');
  }
};

/**
 * Busca os detalhes e mensagens de um chat específico.
 * @param {string} chatId - O ID do chat a ser buscado.
 * @returns {Promise<object>} - O objeto completo do chat, incluindo o array 'messages'.
 */
export const getChatById = async (chatId) => {
  try {
    const { data } = await apiClient.get(`/chats/${chatId}`);
    return data; // Espera-se o objeto completo do chat { _id, title, messages: [...], ... }
  } catch (error) {
    console.error('Erro ao buscar chat por ID:', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao buscar detalhes do chat');
  }
};

// Você pode adicionar mais funções aqui conforme necessário, como deletar chat, etc.

