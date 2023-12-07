import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],

	kit: {
		csp: {
			directives: {
				'default-src': ['self'],
				'script-src': ['self', 'https://analytics.umami.is'],
				'style-src': ['self', 'unsafe-inline'],
				'img-src': ['self', 'data:'],
				'connect-src': ['self', 'https://analytics.umami.is'],
				'font-src': ['self'],
				'object-src': ['none'],
				'frame-ancestors': ['none']
			}
		},
		adapter: adapter()
	}
};

export default config;
