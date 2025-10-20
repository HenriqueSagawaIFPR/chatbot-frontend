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

// Interceptor para adicionar token de autenticação automaticamente
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('token');
      // Não redirecionar automaticamente, deixar o componente decidir
    }
    return Promise.reject(error);
  }
);

// ===== FUNÇÕES DE AUTENTICAÇÃO =====

/**
 * Registra um novo usuário
 * @param {object} userData - Dados do usuário { username, email, password }
 * @returns {Promise<object>} - Resposta com user e token
 */
export const registerUser = async (userData) => {
  try {
    const { data } = await apiClient.post('/auth/register', userData);
    return data;
  } catch (error) {
    console.error('Erro no registro:', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro no registro');
  }
};

/**
 * Faz login do usuário
 * @param {object} credentials - Credenciais { username, password }
 * @returns {Promise<object>} - Resposta com user e token
 */
export const loginUser = async (credentials) => {
  try {
    const { data } = await apiClient.post('/auth/login', credentials);
    return data;
  } catch (error) {
    console.error('Erro no login:', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro no login');
  }
};

/**
 * Obtém dados do usuário logado
 * @returns {Promise<object>} - Dados do usuário
 */
export const getCurrentUser = async () => {
  try {
    const { data } = await apiClient.get('/auth/me');
    return data.user;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao buscar usuário');
  }
};

/**
 * Atualiza perfil do usuário
 * @param {object} profileData - Dados do perfil { username }
 * @returns {Promise<object>} - Usuário atualizado
 */
export const updateProfile = async (profileData) => {
  try {
    const { data } = await apiClient.put('/auth/profile', profileData);
    return data.user;
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao atualizar perfil');
  }
};

/**
 * Altera senha do usuário
 * @param {object} passwordData - Dados da senha { currentPassword, newPassword }
 * @returns {Promise<void>}
 */
export const changePassword = async (passwordData) => {
  try {
    await apiClient.post('/auth/change-password', passwordData);
  } catch (error) {
    console.error('Erro ao alterar senha:', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao alterar senha');
  }
};

// ===== FUNÇÕES DE CHAT (AGORA AUTENTICADAS) =====

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
    
    // Verificar se é erro de limite atingido
    if (error.response?.status === 403 && error.response?.data?.limitReached) {
      const limitError = new Error(error.response.data.error);
      limitError.limitReached = true;
      limitError.messageCount = error.response.data.messageCount;
      throw limitError;
    }
    
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
    return data; // Espera-se um array [{ _id, title, ... }, ... ]
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
 * Exclui um chat pelo ID
 * @param {string} chatId - O ID do chat a ser excluído
 * @returns {Promise<void>}
 */
export const deleteChat = async (chatId) => {
  try {
    await apiClient.delete(`/chats/${chatId}`);
  } catch (error) {
    console.error('Erro ao excluir chat:', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao excluir chat');
  }
};

/**
 * Atualiza o título de um chat
 * @param {string} chatId - ID do chat
 * @param {string} title - Novo título
 * @returns {Promise<object>} - Chat atualizado com {_id, title, createdAt, updatedAt}
 */
export const updateChatTitle = async (chatId, title) => {
  try {
    const { data } = await apiClient.put(`/chats/${chatId}/title`, { title });
    return data;
  } catch (error) {
    console.error('Erro ao atualizar título do chat:', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao atualizar título do chat');
  }
};

/**
 * Solicita uma sugestão de título por IA e já atualiza o chat no backend
 * @param {string} chatId - ID do chat
 * @returns {Promise<object>} - Chat atualizado com {_id, title, createdAt, updatedAt}
 */
export const suggestChatTitle = async (chatId) => {
  try {
    const { data } = await apiClient.post(`/chats/${chatId}/suggest-title`);
    return data;
  } catch (error) {
    console.error('Erro ao sugerir título do chat:', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao sugerir título do chat');
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

// ===== FUNÇÕES DE ADMINISTRAÇÃO =====
export const adminListUsers = async () => {
  try {
    const { data } = await apiClient.get('/admin/users');
    return data;
  } catch (error) {
    console.error('Erro ao listar usuários (admin):', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao listar usuários');
  }
};

export const adminUpdateUser = async (userId, update) => {
  try {
    const { data } = await apiClient.put(`/admin/users/${userId}/status`, update);
    return data.user;
  } catch (error) {
    console.error('Erro ao atualizar usuário (admin):', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao atualizar usuário');
  }
};

export const adminListChats = async () => {
  try {
    const { data } = await apiClient.get('/admin/chats');
    return data;
  } catch (error) {
    console.error('Erro ao listar chats (admin):', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao listar chats');
  }
};

export const adminGetChat = async (chatId) => {
  try {
    const { data } = await apiClient.get(`/admin/chats/${chatId}`);
    return data;
  } catch (error) {
    console.error('Erro ao obter chat (admin):', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao obter chat');
  }
};

export const adminDeleteChat = async (chatId) => {
  try {
    const { data } = await apiClient.delete(`/admin/chats/${chatId}`);
    return data;
  } catch (error) {
    console.error('Erro ao excluir chat (admin):', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao excluir chat');
  }
};

// ===== CONFIGURAÇÃO DO BOT (ADMIN) =====
export const adminGetBotConfig = async () => {
  try {
    const { data } = await apiClient.get('/admin/bot-config');
    return data; // { key, systemInstruction, updatedAt? }
  } catch (error) {
    console.error('Erro ao obter configuração do bot (admin):', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao obter configuração do bot');
  }
};

export const adminUpdateBotConfig = async (systemInstruction) => {
  try {
    const { data } = await apiClient.put('/admin/bot-config', { systemInstruction });
    return data; // { key, systemInstruction, updatedAt }
  } catch (error) {
    console.error('Erro ao atualizar configuração do bot (admin):', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao atualizar configuração do bot');
  }
};

// ===== ANALYTICS E LOGS (ADMIN) =====
export const adminGetAnalytics = async () => {
  try {
    const { data } = await apiClient.get('/admin/analytics');
    return data;
  } catch (error) {
    console.error('Erro ao obter analytics (admin):', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao obter analytics');
  }
};

export const adminGetLogs = async (limit = 200) => {
  try {
    const { data } = await apiClient.get(`/admin/logs?limit=${encodeURIComponent(limit)}`);
    return data;
  } catch (error) {
    console.error('Erro ao obter logs (admin):', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao obter logs');
  }
};

export const adminGetAccessLogs = async (limit = 200) => {
  try {
    const { data } = await apiClient.get(`/admin/access-logs?limit=${encodeURIComponent(limit)}`);
    return data;
  } catch (error) {
    console.error('Erro ao obter logs de acesso (admin):', error.response?.data || error.message);
    throw error.response?.data || new Error('Erro ao obter logs de acesso');
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

