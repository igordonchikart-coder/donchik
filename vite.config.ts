import path from 'node:path'
import { defineConfig, type Plugin, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import { loadTrustpilotSummary } from './server/trustpilotSummary'

function trustpilotDevApi(): Plugin {
  return {
    name: 'trustpilot-dev-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (request, response, next) => {
        if (request.url?.split('?')[0] !== '/api/trustpilot') {
          next()
          return
        }

        const summary = await loadTrustpilotSummary()
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify(summary))
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), trustpilotDevApi()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
})
