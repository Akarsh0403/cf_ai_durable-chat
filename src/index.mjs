export default {
    async fetch(request, env, ctx) {
        // This worker is an API endpoint.
        // The front-end is served by Cloudflare Pages.
        // We route requests based on the URL path.

        const url = new URL(request.url);

        if (url.pathname === '/api/chat') {
            return handleApiRequest(request, env);
        }

        // For local development, wrangler dev serves the `public` directory.
        // In production, Pages serves the static assets and this part is not hit.
        return new Response('Not Found', { status: 404 });
    },
};

async function handleApiRequest(request, env) {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    // Get the session ID from the client. If it doesn't exist, create a new one.
    // This uniquely identifies the user's chat session.
    let sessionId = request.headers.get('X-Session-Id');
    if (!sessionId) {
        sessionId = crypto.randomUUID();
    }

    // Every session ID maps to a unique Durable Object instance.
    const doId = env.CHAT_SESSION.idFromName(sessionId);
    const stub = env.CHAT_SESSION.get(doId);

    // Forward the request to the Durable Object and get the response.
    const response = await stub.fetch(request);
    const body = await response.text();

    // Return the AI's response, along with the session ID for the client.
    return new Response(body, {
        headers: {
            'Content-Type': 'application/json',
            'X-Session-Id': sessionId,
        },
    });
}