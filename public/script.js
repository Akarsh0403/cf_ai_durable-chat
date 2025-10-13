document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const chatBox = document.getElementById('chat-box');

    // Get or create a session ID for the user
    let sessionId = localStorage.getItem('chatSessionId');
    if (!sessionId) {
        // A simple way to generate a temporary unique ID
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('chatSessionId', sessionId);
    }

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();
        if (!message) return;

        // Display user's message
        addMessage(message, 'user-message');
        messageInput.value = '';
        messageInput.disabled = true;

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Session-Id': sessionId,
                },
                body: JSON.stringify({ message: message }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Update session ID if the server provides a new one
            const newSessionId = response.headers.get('X-Session-Id');
            if (newSessionId) {
                sessionId = newSessionId;
                localStorage.setItem('chatSessionId', newSessionId);
            }

            const data = await response.json();
            addMessage(data.response, 'ai-message');

        } catch (error) {
            console.error('Error:', error);
            addMessage('Sorry, something went wrong. Please try again.', 'ai-message');
        } finally {
             messageInput.disabled = false;
             messageInput.focus();
        }
    });

    function addMessage(text, className) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', className);
        messageElement.textContent = text;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
    }
});