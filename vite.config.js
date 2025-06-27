import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    // Adiciona o host público temporário à lista de permitidos
    allowedHosts: [
        '5173-ij0jtqfs403p83jlho7v9-01a13679.manusvm.computer'
    ]
  },
});

