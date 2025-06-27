import React, { useState, useEffect, useCallback } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorMessage from './components/ErrorMessage';
import { getChats, getChatById, sendMessage } from './services/api'; 
import { GlobalStyles } from './styles/GlobalStyles';

const theme = {
  colors: {
    primary: '#ffffff',
    secondary: '#f8f9fa',
    accent: '#007bff',
    text: '#212529',
    lightText: '#6c757d',
    darkText: '#212529',
    background: '#ffffff',
    messageUser: '#007bff',
    messageBot: '#f8f9fa',
    error: '#dc3545',
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
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [error, setError] = useState(null);

  console.log("Iniciando o ChatApplication...");

  const fetchChats = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

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

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppLayout>
        <Sidebar 
          chats={chats} 
          onSelectChat={handleSelectChat} 
          onNewChat={handleNewChat} 
          activeChatId={activeChat?._id} 
          isLoading={isLoadingChats}
        />
        <MainContent>
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
        </MainContent>
      </AppLayout>
    </ThemeProvider>
  );
};

function App() {
  return <ChatApplication />;
}

export default App;

