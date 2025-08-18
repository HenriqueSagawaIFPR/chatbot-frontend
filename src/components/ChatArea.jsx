import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { sendMessage } from '../services/api'; // Assumindo que api.js será atualizado
import ErrorMessage from './ErrorMessage';

// Estilos reutilizados e adaptados de ChatBot.jsx
const ChatAreaContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  background-color: ${props => props.theme.colors.primary};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.lightText};
    border-radius: 2px;
  }
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  color: ${props => props.isUser ? '#ffffff' : props.theme.colors.text};
  background-color: ${props => props.isUser 
    ? props.theme.colors.messageUser 
    : props.theme.colors.messageBot};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  word-break: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-size: 0.95rem;
  line-height: 1.5;
  
  &:first-child {
    margin-top: auto;
  }

  /* Estilos para elementos markdown */
  p {
    margin: 0;
  }

  code {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9em;
  }

  pre {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 1em;
    border-radius: 8px;
    overflow-x: auto;
    margin: 0.5em 0;
  }

  ul, ol {
    margin: 0.5em 0;
    padding-left: 1.5em;
  }

  blockquote {
    border-left: 3px solid ${props => props.theme.colors.accent};
    margin: 0.5em 0;
    padding-left: 1em;
    color: ${props => props.theme.colors.lightText};
    font-style: italic;
  }
`;

const InputContainer = styled.div`
  display: flex;
  padding: 1.5rem;
  background-color: ${props => props.theme.colors.primary};
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  position: sticky;
  bottom: 0;
  z-index: 10;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 0.875rem 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};
  font-size: 0.95rem;
  margin-right: 0.75rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.lightText};
  }
`;

const SendButton = styled.button`
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  
  &:hover {
    background-color: #0056b3;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  padding: 0.75rem 1.25rem;
  background-color: ${props => props.theme.colors.messageBot};
  border-radius: 12px;
  margin-top: 0.5rem;
  
  span {
    height: 6px;
    width: 6px;
    margin: 0 2px;
    background-color: ${props => props.theme.colors.lightText};
    border-radius: 50%;
    display: inline-block;
    opacity: 0.4;
    
    &:nth-child(1) {
      animation: bounce 1.4s infinite ease-in-out;
      animation-delay: -0.32s;
    }
    
    &:nth-child(2) {
      animation: bounce 1.4s infinite ease-in-out;
      animation-delay: -0.16s;
    }
    
    &:nth-child(3) {
      animation: bounce 1.4s infinite ease-in-out;
    }
  }
`;

const WelcomeMessage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: ${props => props.theme.colors.lightText};
    text-align: center;
    padding: 2rem;

    h2 {
        margin-bottom: 1rem;
        color: ${props => props.theme.colors.text};
        font-size: 1.75rem;
        font-weight: 600;
    }

    p {
        font-size: 1.1rem;
        max-width: 400px;
        line-height: 1.6;
    }
`;

// Componente ChatArea
const ChatArea = ({ activeChat, onMessageSent }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Mensagens locais para exibição (virão de activeChat.messages)
  const [displayMessages, setDisplayMessages] = useState([]);

  // Atualiza mensagens quando activeChat muda
  useEffect(() => {
    if (activeChat && activeChat.messages) {
      // Mapeia as mensagens do backend para o formato do frontend
      setDisplayMessages(activeChat.messages.map((msg, index) => ({
        id: `${activeChat._id}-${index}`, // Cria um ID único para a chave React
        text: msg.content,
        isUser: msg.role === 'user',
        isError: false // Assumindo que não há erros armazenados
      })));
      setError(null); // Limpa erros ao trocar de chat
    } else {
      setDisplayMessages([]); // Limpa mensagens se não houver chat ativo
    }
  }, [activeChat]);

  // Rola para a mensagem mais recente
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [displayMessages]);

  // Função para enviar mensagem
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessageText = inputMessage;
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    // Adiciona mensagem do usuário visualmente (otimista)
    const optimisticUserMessage = {
        id: `temp-user-${Date.now()}`,
        text: userMessageText,
        isUser: true,
        isError: false
    };
    setDisplayMessages(prev => [...prev, optimisticUserMessage]);

    try {
      // Se não houver activeChat, envie para a API sem chatId (ela criará um novo chat)
      const response = await sendMessage(userMessageText, activeChat ? activeChat._id : undefined);

      // Adiciona a resposta do bot visualmente
      const botResponse = {
        id: `bot-${Date.now()}`,
        text: response.response,
        isUser: false,
        isError: false
      };
      setDisplayMessages(prev => [...prev, botResponse]);

      // Notifica o componente pai que uma mensagem foi enviada (para atualizar a lista de chats, etc)
      if (onMessageSent) {
        onMessageSent(response.chatId);
      }

    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      setError('Falha ao enviar mensagem. Tente novamente.');
      const errorMessage = {
        id: `error-${Date.now()}`,
        text: "Desculpe, tive um problema ao processar sua mensagem. Por favor, tente novamente.",
        isUser: false,
        isError: true
      };
      setDisplayMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Lidar com tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  // Se não houver chat ativo, mostra uma mensagem de boas-vindas, mas mantém o input
  if (!activeChat) {
    return (
        <ChatAreaContainer>
            <WelcomeMessage>
                <h2>Bem-vindo ao Chatbot!</h2>
                <p>Selecione uma conversa na barra lateral, inicie uma nova ou envie uma mensagem para começar.</p>
            </WelcomeMessage>
            <InputContainer>
              <MessageInput
                type="text"
                placeholder="Digite sua mensagem..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <SendButton 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
              >
                Enviar
              </SendButton>
            </InputContainer>
        </ChatAreaContainer>
    );
  }

  return (
    <ChatAreaContainer>
      <MessagesContainer>
        {displayMessages.map(message => (
          message.isError ? (
            <ErrorMessage 
              key={message.id}
              message={message.text}
            />
          ) : (
            <MessageBubble 
              key={message.id} 
              isUser={message.isUser}
            >
              {message.isUser ? (
                message.text
              ) : (
                <ReactMarkdown>{message.text}</ReactMarkdown>
              )}
            </MessageBubble>
          )
        ))}
        {isLoading && (
          <TypingIndicator>
            <span></span>
            <span></span>
            <span></span>
          </TypingIndicator>
        )}
        {error && <ErrorMessage message={error} />}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      
      <InputContainer>
        <MessageInput
          type="text"
          placeholder="Digite sua mensagem..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <SendButton 
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isLoading}
        >
          Enviar
        </SendButton>
      </InputContainer>
    </ChatAreaContainer>
  );
};

export default ChatArea;

