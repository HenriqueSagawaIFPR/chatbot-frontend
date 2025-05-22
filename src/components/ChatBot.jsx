import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { sendMessage } from '../services/api';
import ErrorMessage from './ErrorMessage';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: ${props => props.theme.colors.primary};
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.primary};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.accent};
    border-radius: 3px;
  }
`;

const MessageBubble = styled.div`
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: 18px;
  color: ${props => props.theme.colors.lightText};
  background-color: ${props => props.isUser 
    ? props.theme.colors.messageUser 
    : props.theme.colors.messageBot};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  word-break: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  
  &:first-child {
    margin-top: auto;
  }

  /* Estilos para elementos markdown */
  p {
    margin: 0;
  }

  code {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: monospace;
  }

  pre {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 1em;
    border-radius: 5px;
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
    opacity: 0.8;
  }
`;

const InputContainer = styled.div`
  display: flex;
  padding: 1rem;
  background-color: ${props => props.theme.colors.secondary};
  border-top: 1px solid ${props => props.theme.colors.accent};
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: 4px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.lightText};
  font-size: 1rem;
  margin-right: 0.5rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.text};
  }
`;

const SendButton = styled.button`
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.lightText};
  border: none;
  border-radius: 4px;
  padding: 0 1.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.text};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.messageBot};
  border-radius: 18px;
  margin-top: 0.5rem;
  
  span {
    height: 8px;
    width: 8px;
    margin: 0 1px;
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
  
  @keyframes bounce {
    0%, 80%, 100% { 
      transform: scale(0);
    }
    40% { 
      transform: scale(1.0);
    }
  }
`;

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Olá! Eu sou o Vagner, defensor da teoria da Terra Plana. Como posso ajudar você hoje?", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Função para rolar para a mensagem mais recente
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Efeito para rolar para baixo quando novas mensagens são adicionadas
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Função para enviar mensagem
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Adiciona a mensagem do usuário
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Prepara o histórico de mensagens no formato esperado pelo backend
      const messageHistory = messages.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      }));
      
      // Envia a mensagem para o backend
      const response = await sendMessage(inputMessage, messageHistory);
      
      // Adiciona a resposta do chatbot
      const botResponse = {
        id: messages.length + 2,
        text: response.response,
        isUser: false
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      
      // Adiciona mensagem de erro como componente ErrorMessage
      const errorMessage = {
        id: messages.length + 2,
        text: "Desculpe, tive um problema ao processar sua mensagem. Por favor, tente novamente.",
        isUser: false,
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
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

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map(message => (
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
    </ChatContainer>
  );
};

export default ChatBot;
