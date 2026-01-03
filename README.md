# [Project Name: e.g., AI Prompt Generator Backend]

## 📖 Project Overview
A Node.js backend service designed to integrate with [OpenAI/Gemini/Anthropic] to generate intelligent, context-aware responses. This service handles user requests, constructs optimized prompts based on selected modes, and communicates with the AI provider to return structured data.

## 🚀 Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js (or specify your framework)
* **AI Integration:** [e.g., OpenAI API / Google Gemini API]
* **Deployment:** Render

---

## 🛠️ Setup and Run Instructions

### Prerequisites
* Node.js (v14 or higher)
* npm (Node Package Manager)
* Git

### Installation
1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    ```

2.  **Navigate to the server directory:**
    *Note: The backend logic resides in the `server` folder.*
    ```bash
    cd server
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Environment Configuration:**
    Create a `.env` file in the `server` directory and add your API keys:
    ```env
    PORT=3000
    AI_API_KEY=your_api_key_here
    # Add other variables here
    ```

### Running Locally
To start the server in development mode:
```bash
npm start



🤖 AI Integration Logic
This project integrates with the [Provider Name] API. The integration is handled via a service controller that:

Receives the client payload.

Selects the appropriate "System Prompt" based on the user's requested mode.

Injects user-specific context into the prompt variables.

Parses the AI response before sending it back to the client.

🧠 Prompt Design Approach (Mandatory Explanation)
1. How Prompts are Structured
Our prompts follow a strict "Role-Context-Task" architecture to ensure consistency:

Role (System Message): Defines the AI's persona (e.g., "You are an expert code reviewer...").

Context: Provides the necessary background information or constraints (e.g., "The code is written in Python...").

Task: The specific instruction given by the user.

Example Structure:

System: [Role Definition] + [Output Constraints] User: [Input Data] + [Specific Question]

2. How Different Modes Affect Prompt Generation
The application supports different "Modes" to tailor the AI's output. These modes dynamically alter the system message and temperature settings:

Mode A ([e.g., Creative Mode]):

Effect: Uses a higher temperature (0.7) and a system prompt that encourages brainstorming and metaphorical language.

Mode B ([e.g., Strict/JSON Mode]):

Effect: Uses a low temperature (0.1) and enforces a strict JSON schema in the system prompt to ensure the output is machine-readable.

Mode C ([e.g., Debug Mode]):

Effect: Instructs the AI to provide step-by-step reasoning (Chain of Thought) before giving the final answer.

3. Why Prompt Constraints Were Chosen
To ensure the application is reliable and safe, the following constraints were engineered into the prompts:

Token Limits: We limit input tokens to [X] to prevent latency issues and cost overruns.

Format Locking: We explicitly instruct the AI to "Return only JSON" to prevent parsing errors on the frontend.

Safety Rails: The system prompt includes negative constraints (e.g., "Do not generate PII") to adhere to data privacy standards.

☁️ Deployment
This service is configured for deployment on Render.

Root Directory: server

Build Command: npm install

Start Command: npm start
