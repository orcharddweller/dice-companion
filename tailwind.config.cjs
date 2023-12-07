/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#5ec522',
					secondary: '#dc2626',
					accent: '#fb923c',
					neutral: '#3D4451',
					'base-100': '#FFFFFF',
					info: '#3ABFF8',
					success: '#22c55e',
					warning: '#FBBD23',
					error: '#ef4444'
				}
			}
		]
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
