import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';


// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",  // 可用 IP 連線
    port: 5174        // ✅ 指定 port
  },
  
  plugins: [react(), svgr()],
})
