import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import compression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	return {
		plugins: [
			vue(),
			vueDevTools(),
			Components({
				resolvers: [NaiveUiResolver()]
			}),
			compression({
				algorithm: 'brotliCompress',
			}),
		],
		build: {
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes('node_modules')) {
							if (id.includes('naive-ui')) {
								return 'naive-ui';
							}
							if (id.includes('vue')) {
								return 'vue';
							}
							return 'vendor';
						}
					},
				},
			},
		},
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			},
		},
		server: {
			port: Number(env.VITE_APP_PORT) || 3000,
			open: true
		}
	}
})
