import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatBot from './ChatBot';
import LoadingIndicator from './LoadingIndicator';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Header = styled.header`
  text-align: center;
  padding: 1.5rem 0;
  margin-bottom: 2rem;
  
  h1 {
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.5rem;
    font-size: 2.5rem;
    
    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }
  
  p {
    color: ${props => props.theme.colors.lightText};
    font-size: 1.2rem;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const Main = styled.main`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1rem 0;
  margin-top: 2rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.lightText};
  opacity: 0.7;
`;

const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  
  span {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 0.5rem;
    background-color: ${props => props.isConnected ? '#4CAF50' : '#F44336'};
  }
`;

const ResponsiveApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    // Simula carregamento inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsConnected(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AppContainer>
      <Header>
        <h1>Chatbot Terra Plana</h1>
        <p>Converse com Vagner, o defensor da Terra Plana</p>
      </Header>
      
      <Main>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <ConnectionStatus isConnected={isConnected}>
              <span></span>
              {isConnected ? 'Conectado ao servidor' : 'Desconectado do servidor'}
            </ConnectionStatus>
            <ChatBot />
          </>
        )}
      </Main>
      
      <Footer>
        <p>Desenvolvido com React e Node.js</p>
      </Footer>
    </AppContainer>
  );
};

export default ResponsiveApp;
