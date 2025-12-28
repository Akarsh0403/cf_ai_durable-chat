# Project: cf_ai_durable-chat

This is a complete AI-powered chat application built entirely on the Cloudflare developer platform, created for the Cloudflare AI assignment. The application provides a chat interface where a user can have a stateful conversation with an AI, meaning the AI remembers the context of previous messages within the session.



---

### Features

* **Conversational AI:** Powered by the Llama 3 model via Cloudflare Workers AI.
* **Stateful Sessions:** Remembers conversation history using Cloudflare Durable Objects. Each browser session gets its own unique chat history.
* **Serverless Backend:** All logic is handled by a Cloudflare Worker.
* **Web Interface:** A clean, simple chat UI built with HTML, CSS, and vanilla JavaScript, hosted on Cloudflare Pages.

### Tech Stack

* **LLM:** Cloudflare Workers AI (`@cf/meta/llama-3-8b-instruct`)
* **Workflow & Coordination:** Cloudflare Workers
* **Memory / State:** Cloudflare Durable Objects
* **User Interface:** Cloudflare Pages

---

### Running Locally

To run this project on your local machine, you'll need Node.js and the Cloudflare `wrangler` CLI installed.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[YOUR_USERNAME]/cf_ai_durable-chat.git
    cd cf_ai_durable-chat
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the local development server:**
    This command will start a local server that simulates the Cloudflare environment, including Workers and Durable Objects.
    ```bash
    npx wrangler dev
    ```

4.  **Open the application:**
    Open your web browser and navigate to `http://localhost:8787`. You should see the chat interface and can begin a conversation.

---

### Deployment

Follow these steps to deploy the application to your Cloudflare account.

1.  **Login to Wrangler:**
    Authorize `wrangler` with your Cloudflare account.
    ```bash
    npx wrangler login
    ```

2.  **Deploy the Worker and Durable Object:**
    This command will build and publish your Worker and Durable Object to the Cloudflare network.
    ```bash
    npx wrangler deploy
    ```

3.  **Deploy the Frontend with Cloudflare Pages:**
    * Push your project to your GitHub repository.
    * In the Cloudflare dashboard, go to **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
    * Select your `cf_ai_durable-chat` repository.
    * In the "Build settings", select the framework preset **None**.
    * Set the **Build output directory** to `public`.
    * Click **Save and Deploy**.

4.  **Connect Pages to your Worker:**
    * After your Pages project is deployed, go to its settings: **Settings** -> **Functions**.
    * Under **Function bindings**, click **Add binding**.
    * Set the **Variable name** to `AI_WORKER`.
    * From the **Service** dropdown, select your `cf_ai_durable-chat` worker.
    * Click **Save**. The Pages site will now be able to communicate with your Worker. Your site will automatically redeploy with the new settings.
