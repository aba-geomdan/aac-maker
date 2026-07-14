import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import obfuscator from 'vite-plugin-javascript-obfuscator';

// GitHub Pages: https://aba-geomdan.github.io/aac-maker/ 로 배포되므로
// base 경로를 '/aac-maker/' 로 지정해야 자산(JS/CSS) 404가 안 난다.
export default defineConfig({
  plugins: [
    react(),
    obfuscator({
      apply: 'build',
      include: [/\.js$/],
      exclude: [/node_modules/],
      debugger: false,
      options: {
        compact: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.75,
        identifierNamesGenerator: 'hexadecimal',
        controlFlowFlattening: false,
        deadCodeInjection: false,
        debugProtection: false,
        selfDefending: false,
      },
    }),
  ],
  base: '/aac-maker/',
  build: {
    outDir: 'dist',
    // 단일 파일 앱 + base64 로고가 커서 청크 경고 한도를 올린다
    chunkSizeWarningLimit: 2000,
  },
});
