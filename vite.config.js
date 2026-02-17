import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        tailwindcss(),
    ],
    server: {
        host: '0.0.0.0',
        allowedHosts: [
            'iraida-ascitic-nonpantheistically.ngrok-free.dev',  // ✅ Exact URL
            'localhost',
            '127.0.0.1',
        ],
    },
});