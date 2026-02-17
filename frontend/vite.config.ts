import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0', // Allow network access
        allowedHosts: [
            'iraida-ascitic-nonpantheistically.ngrok-free.dev', // The current ngrok URL
            'localhost',
            '127.0.0.1'
        ],
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api')
            }
        }
    }
})
