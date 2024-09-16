// @ts-check
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel/serverless';
import vue from '@astrojs/vue';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// 获取当前模块的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: vercel(),
    integrations: [
        vue({
            devtools: true
        }),
        react(),
        tailwind({
            applyBaseStyles: false,
        }),
    ],
    vite: {
        resolve: {
            alias: {
                '#mdc-imports': path.resolve(__dirname, './stub-mdc-imports.js'),
                '#mdc-configs': path.resolve(__dirname, './stub-mdc-imports.js'),
            }
        }
    }
});