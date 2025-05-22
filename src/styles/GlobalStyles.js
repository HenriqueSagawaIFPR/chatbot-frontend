import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  body {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.lightText};
    min-height: 100vh;
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
    border-bottom: 1px solid ${props => props.theme.colors.accent};
    margin-bottom: 2rem;
  }

  header h1 {
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.5rem;
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
    border-top: 1px solid ${props => props.theme.colors.accent};
    font-size: 0.9rem;
    color: ${props => props.theme.colors.lightText};
    opacity: 0.7;
  }

  button {
    cursor: pointer;
    background-color: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.lightText};
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-weight: 500;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${props => props.theme.colors.text};
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  input, textarea {
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.lightText};
    border: 1px solid ${props => props.theme.colors.accent};
    border-radius: 4px;
    padding: 0.75rem;
    font-size: 1rem;
    width: 100%;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.text};
    }
  }
`;
