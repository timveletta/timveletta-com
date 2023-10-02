/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		container: {
			screens: {
				'2xl': '1280px',
			},
		},
		extend: {
			maxHeight: {
				'1/2': '50vh',
			},
			height: {
				hero: 'calc(100vh - 6rem)',
				250: '250px',
				200: '200px',
			},
			maxWidth: {
				'1/2': '50vw',
			},
			colors: {
				primary: '#01bfa6',
				secondary: '#0f3d56',
				grey: '#F4F4F4',
			},
			inset: {
				'1/2': '50%',
			},
			gridTemplateColumns: {
				contact: '1fr 2fr',
			},
			fontFamily: {
				sans: ['Mulish', ...defaultTheme.fontFamily.sans],
			},
		},
	},
};
