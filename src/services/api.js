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

/**
 * Registra um log de acesso do usuário conforme especificação da atividade B2.P1.A7
 * @param {string} ip - O IP do usuário
 * @param {string} acao - A ação realizada pelo usuário
 * @returns {Promise<object>} - A resposta da API
 */
export const registrarLogAcesso = async (ip, acao) => {
  try {
    const { data } = await apiClient.post('/log-connection', {
      ip: ip,
      acao: acao
    });
    return data;
  } catch (error) {
    console.error('Erro ao registrar log de acesso:', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao registrar log de acesso');
  }
};

/**
 * Registra um acesso ao bot para o sistema de ranking
 * @param {string} botId - O ID do bot
 * @param {string} nomeBot - O nome do bot
 * @param {string} usuarioId - O ID do usuário (opcional)
 * @returns {Promise<object>} - A resposta da API
 */
export const registrarAcessoBotRanking = async (botId, nomeBot, usuarioId = null) => {
  try {
    const payload = {
      botId: botId,
      nomeBot: nomeBot,
      timestampAcesso: new Date().toISOString()
    };
    
    if (usuarioId) {
      payload.usuarioId = usuarioId;
    }

    const { data } = await apiClient.post('/ranking/registrar-acesso-bot', payload);
    return data;
  } catch (error) {
    console.error('Erro ao registrar acesso para ranking:', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao registrar acesso para ranking');
  }
};

/**
 * Busca o ranking de bots
 * @returns {Promise<Array<object>>} - Array com os dados do ranking
 */
export const getRankingBots = async () => {
  try {
    const { data } = await apiClient.get('/ranking/visualizar');
    return data;
  } catch (error) {
    console.error('Erro ao buscar ranking:', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao buscar ranking');
  }
};

/**
 * Busca informações do usuário (IP, etc.)
 * @returns {Promise<object>} - Informações do usuário
 */
export const getUserInfo = async () => {
  try {
    // Usando um serviço externo para obter informações do IP
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return { ip: data.ip };
  } catch (error) {
    console.error('Erro ao obter informações do usuário:', error);
    return { ip: '127.0.0.1' }; // IP padrão em caso de erro
  }
};

// Você pode adicionar mais funções aqui conforme necessário, como deletar chat, etc.

