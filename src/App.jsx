import React, { useState, useEffect, useCallback } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Sidebar from './components/Sidebar';
import RenameChatModal from './components/RenameChatModal';
import ChatArea from './components/ChatArea';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorMessage from './components/ErrorMessage';
import ResponsiveLayout from './components/ResponsiveLayout';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';
import AdminPanel from './components/AdminPanel';
import { getChats, getChatById, sendMessage, deleteChat } from './services/api'; 
import { GlobalStyles } from './styles/GlobalStyles';
import ConfirmModal from './components/ConfirmModal';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const theme = {
  colors: {
    primary: '#ffffff',
    secondary: '#f8f9fa',
    accent: '#667eea',
    text: '#2d3748',
    lightText: '#718096',
    darkText: '#1a202c',
    background: '#f7fafc',
    messageUser: '#667eea',
    messageBot: '#edf2f7',
    error: '#e53e3e',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  }
};

const AppLayout = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
`;

const ChatApplication = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [error, setError] = useState(null);
  const [chatToDelete, setChatToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [chatToRename, setChatToRename] = useState(null);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  console.log("Iniciando o ChatApplication...");

  const fetchChats = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      setError(null);
      const fetchedChats = await getChats();
      setChats(fetchedChats);
    } catch (err) {
      console.error("Erro ao buscar chats:", err);
      setError('Falha ao carregar a lista de conversas.');
      setChats([]);
    } finally {
      setIsLoadingChats(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchChats();
    }
  }, [fetchChats, isAuthenticated]);

  const handleSelectChat = useCallback(async (chatId) => {
    if (!chatId) {
        setActiveChat(null);
        return;
    }
    if (activeChat?._id === chatId) return;

    setIsLoadingMessages(true);
    setActiveChat(null);
    setError(null);
    try {
      const fetchedChat = await getChatById(chatId);
      setActiveChat(fetchedChat);
    } catch (err) {
      console.error("Erro ao buscar chat:", err);
      setError('Falha ao carregar a conversa selecionada.');
      setActiveChat(null);
    } finally {
      setIsLoadingMessages(false);
    }
  }, [activeChat?._id]);

  const handleNewChat = () => {
    setActiveChat(null);
    setError(null);
    setShowProfile(false);
  };

  const handleMessageSent = useCallback(async (chatId) => {
    await fetchChats(); 
    
    if (!activeChat || activeChat._id !== chatId) {
        handleSelectChat(chatId); 
    } else {
        try {
            const updatedChat = await getChatById(chatId);
            setActiveChat(updatedChat);
        } catch (err) {
            console.error("Erro ao recarregar chat após envio:", err);
            setError('Falha ao atualizar a conversa após envio.');
        }
    }
  }, [fetchChats, activeChat, handleSelectChat]);

  const handleShowProfile = () => {
    setShowProfile(true);
    setActiveChat(null);
    setError(null);
  };

  const handleShowAdmin = () => {
    setShowAdmin(true);
    setShowProfile(false);
    setActiveChat(null);
    setError(null);
  };

  // Se ainda está carregando a autenticação, mostrar loading
  if (authLoading) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <LoadingIndicator />
      </ThemeProvider>
    );
  }

    // Se não está autenticado, mostrar chat com limite de mensagens ou formulário de login
  if (!isAuthenticated) {
    if (showLoginForm) {
      return (
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <LoginForm onBack={() => setShowLoginForm(false)} />
        </ThemeProvider>
      );
    }
    
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ResponsiveLayout
          sidebar={
            <Sidebar 
              chats={[]} 
              onSelectChat={() => {}} 
              onNewChat={() => {}} 
              activeChatId={null} 
              isLoading={false}
              onRequestDelete={() => {}}
              onRequestRename={() => {}}
              onShowProfile={() => {}}
              isGuest={true}
              onShowLogin={() => setShowLoginForm(true)}
            />
          }
        >
          <ChatArea 
            activeChat={null} 
            onMessageSent={() => {}} 
            isGuest={true}
            key="guest-chat" // Força sempre um novo chat
          />
        </ResponsiveLayout>
      </ThemeProvider>
    );
  }

  // Se está mostrando o perfil, mostrar componente de perfil
  if (showProfile) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ResponsiveLayout
          sidebar={
            <Sidebar 
              chats={chats} 
              onSelectChat={handleSelectChat} 
              onNewChat={handleNewChat} 
              activeChatId={activeChat?._id} 
              isLoading={isLoadingChats}
              onRequestDelete={(chat) => { setChatToDelete(chat); setIsConfirmOpen(true); }}
              onRequestRename={(chat) => { setChatToRename(chat); setIsRenameOpen(true); }}
              onShowProfile={handleShowProfile}
              onShowAdmin={handleShowAdmin}
            />
          }
        >
          <UserProfile />
        </ResponsiveLayout>
      </ThemeProvider>
    );
  }

  // Painel Admin
  if (showAdmin) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AdminPanel onBack={() => setShowAdmin(false)} />
      </ThemeProvider>
    );
  }

  // Chat principal
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ResponsiveLayout
        sidebar={
          <Sidebar 
            chats={chats} 
            onSelectChat={handleSelectChat} 
            onNewChat={handleNewChat} 
            activeChatId={activeChat?._id} 
            isLoading={isLoadingChats}
            onRequestDelete={(chat) => { setChatToDelete(chat); setIsConfirmOpen(true); }}
            onRequestRename={(chat) => { setChatToRename(chat); setIsRenameOpen(true); }}
            onShowProfile={handleShowProfile}
            onShowAdmin={handleShowAdmin}
          />
        }
      >
        {isLoadingMessages ? (
          <LoadingIndicator /> 
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <ChatArea 
            activeChat={activeChat} 
            onMessageSent={handleMessageSent} 
          />
        )}
        {isConfirmOpen && (
          <ConfirmModal 
            title="Excluir conversa?"
            description={`Tem certeza que deseja excluir "${chatToDelete?.title}"? Essa ação não pode ser desfeita.`}
            confirmLabel="Excluir"
            cancelLabel="Cancelar"
            onCancel={() => { setIsConfirmOpen(false); setChatToDelete(null); }}
            onConfirm={async () => {
              try {
                if (chatToDelete?._id) {
                  await deleteChat(chatToDelete._id);
                  // Se o chat ativo foi excluído, limpar área de conversa
                  if (activeChat?._id === chatToDelete._id) {
                    setActiveChat(null);
                  }
                  await fetchChats();
                }
              } catch (err) {
                console.error('Falha ao excluir chat', err);
                setError('Falha ao excluir a conversa.');
              } finally {
                setIsConfirmOpen(false);
                setChatToDelete(null);
              }
            }}
            variant="danger"
          />
        )}
        {isRenameOpen && (
          <RenameChatModal
            isOpen={isRenameOpen}
            initialTitle={chatToRename?.title || ''}
            onCancel={() => { setIsRenameOpen(false); setChatToRename(null); }}
            onSuggest={async () => {
              try {
                if (!chatToRename?._id) return;
                const { suggestChatTitle } = await import('./services/api');
                const updated = await suggestChatTitle(chatToRename._id);
                setChats(prev => prev.map(c => c._id === updated._id ? { ...c, title: updated.title, updatedAt: updated.updatedAt } : c));
                if (activeChat?._id === updated._id) {
                  setActiveChat(prev => ({ ...prev, title: updated.title }));
                }
                setIsRenameOpen(false);
                setChatToRename(null);
              } catch (err) {
                console.error('Falha ao sugerir título', err);
                setError(typeof err === 'string' ? err : 'Falha ao sugerir título.');
              }
            }}
            onConfirm={async (newTitle) => {
              try {
                if (!chatToRename?._id || !newTitle) return;
                const { updateChatTitle } = await import('./services/api');
                const updated = await updateChatTitle(chatToRename._id, newTitle);
                // Atualiza lista localmente sem refetch completo
                setChats(prev => prev.map(c => c._id === updated._id ? { ...c, title: updated.title, updatedAt: updated.updatedAt } : c));
                // Se o chat renomeado é o ativo, atualiza também
                if (activeChat?._id === updated._id) {
                  setActiveChat(prev => ({ ...prev, title: updated.title }));
                }
              } catch (err) {
                console.error('Falha ao renomear chat', err);
                setError(typeof err === 'string' ? err : 'Falha ao renomear a conversa.');
              } finally {
                setIsRenameOpen(false);
                setChatToRename(null);
              }
            }}
          />
        )}
      </ResponsiveLayout>
    </ThemeProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <ChatApplication />
    </AuthProvider>
  );
}

export default App;

