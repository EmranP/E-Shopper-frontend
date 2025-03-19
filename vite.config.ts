import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@constants': path.resolve(__dirname, 'src/app/constants'),
		},
	},
	build: {
		outDir: 'dist',
		sourcemap: true,
	},
})
