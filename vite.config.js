import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves project sites from a /<repo-name>/ subpath, so all
  // built asset URLs need this prefix. Update this if the repo is renamed.
  base: '/Bharath-Darshan/',
})
