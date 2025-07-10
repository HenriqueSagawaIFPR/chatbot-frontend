import React, { useState } from 'react';
import styled from 'styled-components';

const InfoContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    margin: 10px;
    padding: 15px;
  }
`;

const BotHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 15px;
`;

const BotAvatar = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const BotTitle = styled.div`
  flex: 1;
`;

const BotName = styled.h2`
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const BotSlogan = styled.p`
  margin: 5px 0 0 0;
  font-style: italic;
  opacity: 0.9;
  font-size: 1rem;
`;

const ToggleButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
  }
`;

const ExpandedContent = styled.div`
  margin-top: 20px;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Description = styled.div`
  margin-bottom: 20px;
  line-height: 1.6;
  
  p {
    margin-bottom: 12px;
    opacity: 0.95;
  }
`;

const AuthorSection = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 15px;
`;

const AuthorTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  font-weight: 600;
  opacity: 0.9;
`;

const AuthorList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
`;

const AuthorItem = styled.li`
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(5px);
  }
`;

const FeaturesList = styled.div`
  margin-top: 15px;
  
  h4 {
    margin: 0 0 10px 0;
    font-size: 1rem;
    opacity: 0.9;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
  
  &::before {
    content: "🤖";
    font-size: 14px;
  }
`;

const BotInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const botData = {
    name: "Vagner Terraplanista",
    slogan: "Seu companheiro para explorar teorias alternativas!",
    description: [
      "Sou um assistente especializado em teorias da Terra Plana, criado para fornecer informações e responder perguntas sobre essa perspectiva alternativa do nosso planeta.",
      "Utilizo a tecnologia avançada da API Gemini do Google para processar suas mensagens e gerar respostas contextualizadas e informativas.",
      "Meu objetivo é apresentar argumentos e evidências relacionados à teoria da Terra Plana de forma educativa e respeitosa."
    ],
    features: [
      "Respostas baseadas em IA avançada (Google Gemini)",
      "Histórico de conversas persistente",
      "Interface responsiva e amigável",
      "Sistema de logs para análise de interações"
    ],
    authors: [
      "Henrique Sagawa",
      "Equipe IFPR",
      "Projeto IIW2023A"
    ]
  };

  return (
    <InfoContainer>
      <BotHeader>
        <BotAvatar>🌍</BotAvatar>
        <BotTitle>
          <BotName>{botData.name}</BotName>
          <BotSlogan>{botData.slogan}</BotSlogan>
        </BotTitle>
        <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Ocultar' : 'Saiba Mais'}
        </ToggleButton>
      </BotHeader>

      {isExpanded && (
        <ExpandedContent>
          <Description>
            {botData.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Description>

          <FeaturesList>
            <h4>🚀 Principais Funcionalidades:</h4>
            {botData.features.map((feature, index) => (
              <FeatureItem key={index}>{feature}</FeatureItem>
            ))}
          </FeaturesList>

          <AuthorSection>
            <AuthorTitle>👨‍💻 Desenvolvido por:</AuthorTitle>
            <AuthorList>
              {botData.authors.map((author, index) => (
                <AuthorItem key={index}>{author}</AuthorItem>
              ))}
            </AuthorList>
          </AuthorSection>
        </ExpandedContent>
      )}
    </InfoContainer>
  );
};

export default BotInfo;

