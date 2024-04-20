// first

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: '/app/5173',
//   },
// })

//second

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   server: {
//     port: 5173,
//     watch: {
//       usePolling: true,
//     },
//     host: true,
//     strictPort: true,
//   },
//   plugins: [react()],
//   build: {
//     outDir: "/app/5173",
//   },
// });

//mine

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});
