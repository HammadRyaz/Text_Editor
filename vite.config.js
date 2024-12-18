import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/Text__Editor/', // Replace with your repository name
    plugins: [react()],
});