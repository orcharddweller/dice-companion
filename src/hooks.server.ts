import type { Handle } from '@sveltejs/kit';

// Development CSP
const devCsp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self';
  connect-src 'self';
  object-src 'none';
  frame-ancestors 'none';
`.replace(/\s+/g, ' ');

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	if (import.meta.env.DEV) {
		response.headers.set('Content-Security-Policy', devCsp);
	}

	return response;
};
