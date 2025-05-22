# Chatbot Terra Plana - Frontend React

Este projeto é uma implementação em React do frontend para o chatbot de Terra Plana, que consome o backend Node.js desenvolvido anteriormente.

## Estrutura do Projeto
```
chatbot-terra-plana-react/
├── src/
│   ├── components/
│   │   ├── ChatBot.jsx         # Componente principal do chatbot
│   │   ├── ErrorMessage.jsx    # Componente para exibir mensagens de erro
│   │   ├── LoadingIndicator.jsx # Componente de indicador de carregamento
│   │   └── ResponsiveApp.jsx   # Componente de layout responsivo
│   ├── hooks/                  # Hooks personalizados (se necessário)
│   ├── services/
│   │   └── api.js              # Serviço para comunicação com o backend
│   ├── styles/
│   │   ├── global.css          # Estilos globais básicos
│   │   └── GlobalStyles.js     # Estilos globais com styled-components
│   ├── App.jsx                 # Componente principal da aplicação
│   └── main.jsx                # Ponto de entrada da aplicação
├── index.html                  # Arquivo HTML principal
├── package.json                # Dependências e scripts
└── vite.config.js              # Configuração do Vite
```

## Requisitos
- Node.js (versão 16 ou superior)
- Backend do chatbot Terra Plana rodando em http://localhost:3000

## Instalação
1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```

## Configuração
1. Abra o arquivo `src/services/api.js` e verifique se a URL do backend está correta:
   ```javascript
   const api = axios.create({
     baseURL: 'http://localhost:3000', // URL do servidor Node.js
     headers: {
       'Content-Type': 'application/json',
     },
   });
   ```
   
2. Se o backend estiver rodando em uma porta ou host diferente, ajuste a URL conforme necessário.

## Uso
1. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```
2. O frontend estará disponível em `http://localhost:5173`

## Funcionalidades
- Interface de chat responsiva e amigável
- Envio de mensagens para o backend
- Exibição de respostas do chatbot
- Indicador de digitação durante o processamento
- Tratamento de erros de comunicação
- Histórico de mensagens

## Integração com o Backend
O frontend se comunica com o backend através do endpoint `/api/chat`, enviando a mensagem do usuário e o histórico de conversas. O backend processa a mensagem usando a API Gemini da Google e retorna a resposta.

## Personalização
- Cores e temas podem ser ajustados no objeto `theme` em `src/App.jsx`
- Estilos adicionais podem ser modificados nos componentes individuais usando styled-components

## Build para Produção
Para criar uma versão otimizada para produção:
```
npm run build
```

Os arquivos serão gerados na pasta `dist`, prontos para serem servidos por qualquer servidor web estático.
