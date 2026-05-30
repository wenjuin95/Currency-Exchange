import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
	alias: {
		"@": path.resolve(__dirname, "src"),
	},
  },

  // proxy configuration for development server (to avoid CORS issues when making API requests)
  server: {
	proxy: {
		'/bnm-api': {
			target: 'https://api.bnm.gov.my',
			changeOrigin: true,
			rewrite: (path) => path.replace(/^\/bnm-api/, ''),
		},
	},
  },
})
