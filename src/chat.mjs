export class ChatSession {
    constructor(state, env) {
        this.state = state;
        this.env = env;
        // In-memory storage for the conversation history for this session.
        this.messages = [];
    }

    async fetch(request) {
        // The request comes from the main worker.
        const { message } = await request.json();

        // Add the user's message to our history.
        this.messages.push({ role: 'user', content: message });

        // Run the AI model with the current conversation history.
        const aiResponse = await this.env.AI.run('@cf/meta/llama-3-8b-instruct', {
            messages: this.messages,
        });

        // Add the AI's response to our history.
        this.messages.push({ role: 'assistant', content: aiResponse.response });

        // Return the latest AI response to the user.
        return new Response(JSON.stringify({ response: aiResponse.response }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }
}