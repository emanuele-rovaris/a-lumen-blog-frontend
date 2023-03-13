import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';
import * as path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/tests/setup.ts',
        coverage: {
            provider: 'c8',
            reporter: ["text", "html"],
        }
    }
})
