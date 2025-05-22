import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import ResponsiveApp from './components/ResponsiveApp';

const theme = {
  colors: {
    primary: '#1a1a2e',
    secondary: '#16213e',
    accent: '#0f3460',
    text: '#e94560',
    lightText: '#f1f1f1',
    darkText: '#333333',
    background: '#0f0f0f',
    messageUser: '#16213e',
    messageBot: '#0f3460',
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ResponsiveApp />
    </ThemeProvider>
  );
}

export default App;
