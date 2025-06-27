import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }

  body {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    min-height: 100vh;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
    padding: 1.5rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  header h1 {
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.5rem;
    font-size: 2rem;
    font-weight: 600;
  }

  main {
    flex: 1;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }

  footer {
    text-align: center;
    padding: 1rem 0;
    margin-top: 2rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 0.875rem;
    color: ${props => props.theme.colors.lightText};
  }

  button {
    cursor: pointer;
    background-color: ${props => props.theme.colors.accent};
    color: white;
    border: none;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.95rem;
    transition: all 0.2s ease;

    &:hover {
      background-color: #0056b3;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  }

  input, textarea {
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.text};
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 0.875rem 1.25rem;
    font-size: 0.95rem;
    width: 100%;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.accent};
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }

    &::placeholder {
      color: ${props => props.theme.colors.lightText};
    }
  }

  /* Estilos para scrollbar em todos os elementos */
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.lightText};
    border-radius: 2px;
  }
`;
