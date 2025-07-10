import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }

  body {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    color: ${props => props.theme.colors.text};
    min-height: 100vh;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }

  header {
    text-align: center;
    padding: 2rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  header h1 {
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.5rem;
    font-size: 2.5rem;
    font-weight: 700;
    background: ${props => props.theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  main {
    flex: 1;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }

  footer {
    text-align: center;
    padding: 1.5rem 0;
    margin-top: 2rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 0.875rem;
    color: ${props => props.theme.colors.lightText};
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 16px;
  }

  button {
    cursor: pointer;
    background: ${props => props.theme.colors.gradient};
    color: white;
    border: none;
    padding: 0.875rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }

    &:active {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  }

  input, textarea {
    background: rgba(255, 255, 255, 0.9);
    color: ${props => props.theme.colors.text};
    border: 1px solid rgba(102, 126, 234, 0.2);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    font-size: 0.95rem;
    width: 100%;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.accent};
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      background: rgba(255, 255, 255, 1);
    }

    &::placeholder {
      color: ${props => props.theme.colors.lightText};
    }
  }

  /* Estilos para scrollbar em todos os elementos */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #764ba2, #667eea);
  }

  /* Animações */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .fade-in {
    animation: fadeIn 0.5s ease-out;
  }

  .slide-in {
    animation: slideIn 0.3s ease-out;
  }
`;

