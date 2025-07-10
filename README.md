# Vagner Terraplanista - Chatbot Frontend React

Este projeto é uma implementação em React do frontend para o chatbot **Vagner Terraplanista**, que consome o backend Node.js desenvolvido anteriormente.

## 🤖 Sobre o Vagner Terraplanista

**Vagner Terraplanista** é um assistente especializado em teorias da Terra Plana, criado para fornecer informações e responder perguntas sobre essa perspectiva alternativa do nosso planeta. Ele utiliza a tecnologia avançada da API Gemini do Google para processar mensagens e gerar respostas contextualizadas e informativas.

### ✨ Principais Funcionalidades

- 🧠 **Respostas baseadas em IA avançada** (Google Gemini)
- 💾 **Histórico de conversas persistente**
- 📱 **Interface responsiva e amigável**
- 📊 **Sistema de logs para análise de interações**
- 🎨 **Design moderno com gradientes e animações**
- 📋 **Seção informativa "Sobre este Bot"**

### 👨‍💻 Desenvolvido por

- **Henrique Sagawa**
- **Equipe IFPR**
- **Projeto IIW2023A**

## 🚀 Melhorias Implementadas (Atividade B3.P1.A1)

### Nova Identidade Visual
- **Nome personalizado**: Vagner Terraplanista
- **Slogan**: "Seu companheiro para explorar teorias alternativas!"
- **Design moderno**: Gradientes, animações e efeitos visuais
- **Cores atualizadas**: Paleta roxa/azul com efeitos glassmorphism

### Seção "Sobre este Bot"
- **Localização**: Integrada na sidebar
- **Conteúdo expansível**: Botão "Saiba Mais" / "Ocultar"
- **Informações completas**: Nome, descrição, funcionalidades e autoria
- **Design atrativo**: Avatar, gradientes e animações

### Melhorias de UI/UX
- **Layout responsivo**: Adaptação para mobile com menu hambúrguer
- **Animações suaves**: Transições e efeitos hover
- **Tipografia moderna**: Fonte Inter do Google Fonts
- **Acessibilidade**: Foco visual e navegação por teclado

## 📁 Estrutura do Projeto

```
chatbot-terra-plana-react/
├── src/
│   ├── components/
│   │   ├── BotInfo.jsx           # 🆕 Seção "Sobre este Bot"
│   │   ├── ResponsiveLayout.jsx  # 🆕 Layout responsivo
│   │   ├── ChatBot.jsx           # Componente principal do chatbot
│   │   ├── ChatArea.jsx          # Área de chat
│   │   ├── ErrorMessage.jsx      # Componente para mensagens de erro
│   │   ├── LoadingIndicator.jsx  # Indicador de carregamento
│   │   └── Sidebar.jsx           # 🔄 Barra lateral atualizada
│   ├── services/
│   │   └── api.js                # Serviço para comunicação com o backend
│   ├── styles/
│   │   ├── global.css            # Estilos globais básicos
│   │   └── GlobalStyles.js       # 🔄 Estilos globais atualizados
│   ├── App.jsx                   # 🔄 Componente principal atualizado
│   └── main.jsx                  # Ponto de entrada da aplicação
├── index.html                    # 🔄 HTML principal atualizado
├── package.json                  # Dependências e scripts
└── vite.config.js                # Configuração do Vite
```

## 🛠️ Requisitos

- Node.js (versão 16 ou superior)
- Backend do chatbot Terra Plana rodando em [http://localhost:3000]()
- Conexão com internet (para obter IP do usuário)

## 📦 Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```

## ⚙️ Configuração

1. Abra o arquivo `src/services/api.js` e verifique se a URL do backend está correta:
   ```js
   const API_BASE_URL = 'http://localhost:3000/api'; // URL do servidor Node.js
   ```

2. Para produção, atualize a URL para apontar para o backend no Render:
   ```js
   const API_BASE_URL = 'https://seu-backend.onrender.com/api';
   ```

## 🚀 Uso

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. O frontend estará disponível em `http://localhost:5173`

## 📱 Responsividade

O projeto agora inclui um sistema de layout responsivo que se adapta automaticamente a diferentes tamanhos de tela:

- **Desktop**: Layout lado a lado com sidebar fixa
- **Tablet**: Layout adaptativo com sidebar redimensionável
- **Mobile**: Menu hambúrguer com sidebar deslizante

## 🎨 Personalização

### Tema e Cores
As cores e temas podem ser ajustados no objeto `theme` em `src/App.jsx`:

```js
const theme = {
  colors: {
    primary: '#ffffff',
    secondary: '#f8f9fa',
    accent: '#667eea',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    // ... outras cores
  }
};
```

### Identidade do Bot
Para personalizar a identidade do bot, edite o arquivo `src/components/BotInfo.jsx`:

```js
const botData = {
  name: "Seu Nome do Bot",
  slogan: "Seu slogan aqui!",
  description: [
    "Primeira descrição...",
    "Segunda descrição..."
  ],
  // ... outras configurações
};
```

## 🏗️ Build para Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist`, prontos para serem servidos por qualquer servidor web estático.

## 🌐 Deploy

### Frontend (Vercel, Netlify, etc.)
1. Faça o build do projeto: `npm run build`
2. Configure a URL do backend nas variáveis de ambiente ou no código
3. Deploy na plataforma escolhida

### Backend (Render)
1. Configure as variáveis de ambiente no Render
2. Atualize a URL do backend no frontend para apontar para o Render

## 🔧 Funcionalidades Técnicas

- Interface de chat responsiva e amigável
- Envio de mensagens para o backend
- Exibição de respostas do chatbot
- Indicador de digitação durante o processamento
- Tratamento de erros de comunicação
- Histórico de mensagens
- Sistema de logs automático
- Integração com ranking de bots
- Detecção de IP do usuário

## 📊 Integração com o Backend

### Endpoints Utilizados

- **POST /api/chat**: Comunicação principal com o chatbot
- **POST /api/log-connection**: Registro de logs de acesso
- **POST /api/ranking/registrar-acesso-bot**: Registro para sistema de ranking
- **GET /api/ranking/visualizar**: Visualização do ranking

## 🎯 Critérios de Avaliação Atendidos

✅ **Implementação da Seção de Informações**: Seção clara e visível apresenta nome, descrição e autoria  
✅ **Qualidade do Layout e Estilo**: Interface organizada e visualmente atrativa  
✅ **Clareza do Conteúdo**: Nome, slogan e descrição claros e informativos  
✅ **Responsividade**: Layout adaptativo para diferentes tamanhos de tela  
✅ **Documentação**: README atualizado com nova identidade  
✅ **Deploy Funcional**: Pronto para deploy com todas as funcionalidades

## 📝 Changelog

### Versão 2.0 (Atividade B3.P1.A1)
- ✨ Adicionada seção "Sobre este Bot" com informações completas
- 🎨 Nova identidade visual com nome "Vagner Terraplanista"
- 📱 Layout responsivo para dispositivos móveis
- 🌈 Tema atualizado com gradientes e animações
- 📚 Documentação completamente atualizada

### Versão 1.0 (Atividade B2.P1.A7)
- 🚀 Implementação inicial do frontend React
- 🔗 Integração com backend Node.js
- 📊 Sistema de logs automático
- 🏆 Integração com ranking de bots

---

**Vagner Terraplanista** - Explorando perspectivas alternativas com tecnologia avançada! 🌍✨

