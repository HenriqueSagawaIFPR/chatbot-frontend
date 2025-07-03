# Chatbot Terra Plana - Frontend React

Este projeto é uma implementação em React do frontend para o chatbot de Terra Plana, que consome o backend Node.js desenvolvido anteriormente.

**Atualização B2.P1.A7**: Integração com sistema de logs centralizado e ranking de bots para a "Vitrine de Bots do IIW2023A".

## Estrutura do Projeto
```
chatbot-terra-plana-react/
├── src/
│   ├── components/
│   │   ├── ChatBot.jsx         # Componente principal do chatbot
│   │   ├── ErrorMessage.jsx    # Componente para exibir mensagens de erro
│   │   ├── LoadingIndicator.jsx # Componente de indicador de carregamento
│   │   ├── ResponsiveApp.jsx   # Componente de layout responsivo
│   │   └── Sidebar.jsx         # Componente da barra lateral
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
- Conexão com internet (para obter IP do usuário)

## Instalação
1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```

## Configuração
1. Abra o arquivo `src/services/api.js` e verifique se a URL do backend está correta:
   ```javascript
   const API_BASE_URL = 'http://localhost:3000/api'; // URL do servidor Node.js
   ```
   
2. Se o backend estiver rodando em uma porta ou host diferente, ajuste a URL conforme necessário.

3. Para produção, atualize a URL para apontar para o backend no Render:
   ```javascript
   const API_BASE_URL = 'https://seu-backend.onrender.com/api';
   ```

## Uso
1. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```
2. O frontend estará disponível em `http://localhost:5173`

## Novas Funcionalidades (B2.P1.A7)

### Sistema de Logs Automático
O frontend agora registra automaticamente todas as interações do usuário:

- **Acesso inicial**: Quando o chatbot é carregado
- **Envio de mensagens**: Cada vez que o usuário envia uma mensagem
- **Recebimento de respostas**: Quando o bot responde
- **Erros**: Quando ocorrem problemas no processamento

### Integração com Sistema de Ranking
- Registro automático de acessos para o ranking da "Vitrine de Bots"
- Identificação única do bot "Vagner Terraplanista"

### Obtenção de Informações do Usuário
- Detecção automática do IP do usuário via API externa
- Fallback para IP local em caso de erro

## Funcionalidades
- Interface de chat responsiva e amigável
- Envio de mensagens para o backend
- Exibição de respostas do chatbot
- Indicador de digitação durante o processamento
- Tratamento de erros de comunicação
- Histórico de mensagens
- **Sistema de logs automático**
- **Integração com ranking de bots**
- **Detecção de IP do usuário**

## Integração com o Backend

### Endpoints Utilizados

#### POST /api/chat
- **Descrição**: Envio de mensagens e recebimento de respostas
- **Uso**: Comunicação principal com o chatbot

#### POST /api/log-connection
- **Descrição**: Registro de logs de acesso
- **Uso**: Automático em cada interação do usuário

#### POST /api/ranking/registrar-acesso-bot
- **Descrição**: Registro para sistema de ranking
- **Uso**: Automático no carregamento inicial

#### GET /api/ranking/visualizar
- **Descrição**: Visualização do ranking
- **Uso**: Disponível para consulta

### Fluxo de Logs
1. **Carregamento da página**: Registra `acesso_inicial_chatbot`
2. **Envio de mensagem**: Registra `enviou_mensagem_chatbot`
3. **Recebimento de resposta**: Registra `recebeu_resposta_chatbot`
4. **Erro**: Registra `erro_processamento_mensagem`

## Personalização
- Cores e temas podem ser ajustados no objeto `theme` em `src/App.jsx`
- Estilos adicionais podem ser modificados nos componentes individuais usando styled-components
- Ações de log podem ser personalizadas no componente `ChatBot.jsx`

## Build para Produção
Para criar uma versão otimizada para produção:
```
npm run build
```

Os arquivos serão gerados na pasta `dist`, prontos para serem servidos por qualquer servidor web estático.

## Deploy

### Frontend (Vercel, Netlify, etc.)
1. Faça o build do projeto: `npm run build`
2. Configure a URL do backend nas variáveis de ambiente ou no código
3. Deploy na plataforma escolhida

### Backend (Render)
1. Configure as variáveis de ambiente no Render:
   - `MONGO_URI`: String de conexão do MongoDB Atlas compartilhado
   - `MONGODB_URI`: String de conexão do MongoDB principal
   - `GEMINI_API_KEY`: Chave da API do Google Gemini

2. Atualize a URL do backend no frontend para apontar para o Render

## Monitoramento e Debug

### Logs de Acesso
- Acesse `https://seu-backend.onrender.com/api/logs-access` para ver os logs de acesso
- Acesse `https://seu-backend.onrender.com/api/ranking/visualizar` para ver o ranking

### Console do Navegador
- Logs de sucesso e erro das operações de log são exibidos no console
- Útil para debug durante o desenvolvimento

## Estrutura de Dados dos Logs

Os logs são salvos no MongoDB Atlas compartilhado com a estrutura:
```javascript
{
  col_data: "2024-01-15",           // Data (YYYY-MM-DD)
  col_hora: "14:30:25",             // Hora (HH:MM:SS)
  col_IP: "192.168.1.1",            // IP do usuário
  col_nome_bot: "Vagner Terraplanista", // Nome do bot
  col_acao: "acesso_inicial_chatbot"     // Ação realizada
}
```
