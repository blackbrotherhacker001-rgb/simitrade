# CryptoSim AI Project Report

This report provides a comprehensive overview of the AI-powered CryptoSim trading platform. It is divided into two sections: a detailed technical documentation of the AI project and a practical blueprint for its web integration and deployment.

---

### Part 1: AI Project Technical Documentation

This section serves as a complete technical guide for a developer working on the CryptoSim platform.

#### 1. Project Overview

**CryptoSim** is an advanced cryptocurrency trading simulation platform designed to provide a realistic, yet controlled, trading environment. Its core purpose is to allow both novice and experienced users to practice trading strategies without financial risk. The platform solves the problem of inaccessible or intimidating live markets by offering a safe sandbox with simulated data. The key AI-driven feature is the ability for an administrator to dynamically influence market behavior, creating specific trends (bullish, bearish, etc.) for training and demonstration purposes. A secondary AI feature powers a customer support chatbot to assist users.

#### 2. Core AI Model & Architecture

*   **Model Type**: The AI functionalities are powered by a **Large Language Model (LLM)**. Specifically, the project utilizes Google's Gemini models through the **Genkit** framework, a modern TypeScript-native library for building AI-powered applications.

*   **Architectural Design**: The system is built on a modern serverless web architecture, leveraging the capabilities of Next.js and Vercel.

    *   **Frontend**: A responsive user interface built with **Next.js**, **React**, **TypeScript**, and styled with **Tailwind CSS** and **ShadCN UI** components. The frontend is a rich client-side application that interacts with backend logic via server actions.
    *   **Backend & AI Integration**: The backend logic is co-located with the frontend code, a key feature of Next.js. The AI capabilities are implemented as **Genkit Flows**, which are server-side TypeScript functions marked with the `'use server';` directive. These flows define the prompts and logic for interacting with the Google Gemini LLM.
    *   **Data Flow**:
        1.  **Admin (Market Simulation)**: An admin selects a market trend (e.g., 'bullish') in the admin dashboard.
        2.  The frontend component calls the `simulateMarketTrend` server function.
        3.  The Genkit flow sends a structured prompt to the Gemini LLM.
        4.  The LLM returns a descriptive text about the trend, which is displayed to the admin. Simultaneously, the selected trend is saved to the browser's `localStorage` to control the client-side market data simulation.
        5.  **User (Live Chat)**: A user sends a message in the chat interface. The frontend calls the `chat` server function with the conversation history. The Genkit flow formats this history and sends it to the Gemini LLM, which generates a contextual reply as a customer support agent.

#### 3. Detailed Functionality Breakdown

The project contains two primary AI-driven functions:

1.  **`simulateMarketTrend`**
    *   **Purpose**: This function is called from the admin panel. It takes a predefined market trend and generates a detailed, expert-level description of how a financial market would behave under that trend. It's a tool for the admin to understand the simulation they are activating.
    *   **Code Snippet (`src/ai/flows/simulate-market-trend.ts`)**:
        ```typescript
        const prompt = ai.definePrompt({
          name: 'simulateMarketTrendPrompt',
          input: {schema: SimulateMarketTrendInputSchema},
          output: {schema: SimulateMarketTrendOutputSchema},
          prompt: `You are an expert financial analyst. Based on the desired market trend, generate a detailed description of how the market will behave.

        Market Trend: {{{trend}}}

        Description:`,
        });
        ```

2.  **`chat`**
    *   **Purpose**: This function powers the live support chat. It takes the history of a conversation and generates a contextually appropriate response, acting as a helpful support agent named "Eva".
    *   **Code Snippet (`src/ai/flows/chat-flow.ts`)**:
        ```typescript
        const prompt = ai.definePrompt({
          name: 'chatPrompt',
          input: {schema: ChatInputSchema},
          output: {schema: ChatOutputSchema},
          prompt: `You are a helpful customer support agent for a crypto trading platform called CryptoSim. Your name is Eva. 
          
          You are speaking with a user. Be friendly, helpful, and concise. Keep your responses short and to the point.

          Chat History:
          {{#each history}}
          {{#if (eq role 'user')}}User: {{content}}{{/if}}
          {{#if (eq role 'model')}}Eva: {{content}}{{/if}}
          {{/each}}
          
          Eva:`,
        });
        ```

#### 4. Data & Training Pipeline

This project utilizes a **pre-trained Large Language Model (Gemini)**. As such, there is no data collection or training pipeline involved in the development of this specific application.

*   **Data**: The model was pre-trained by Google on a massive and diverse dataset of text and code. The application simply sends text-based prompts (the "data") at inference time.
*   **Fine-Tuning**: No fine-tuning was performed. The desired behavior is achieved entirely through **prompt engineering**, where carefully crafted instructions are sent to the model to guide its output. This approach was chosen for its speed, cost-effectiveness, and simplicity, as it leverages the powerful zero-shot and few-shot capabilities of the base model without requiring a custom dataset or training infrastructure.

#### 5. Technologies & Libraries

*   **Frontend**:
    *   **Next.js**: Chosen as the primary framework for its hybrid rendering capabilities (Server and Client Components), file-based routing, and seamless integration of server-side logic (Server Actions).
    *   **React**: The foundational UI library for building component-based interfaces.
    *   **TypeScript**: Used for static typing to improve code quality, maintainability, and developer experience.
    *   **Tailwind CSS**: A utility-first CSS framework selected for its speed of development and ability to create custom designs without writing custom CSS.
    *   **ShadCN UI**: A component library built on top of Radix UI and Tailwind CSS, chosen for its beautiful, accessible, and highly customizable components that accelerate UI development.
*   **AI & Backend**:
    *   **Genkit**: The exclusive AI framework used for this project. It was selected for its tight integration with the Google ecosystem, its TypeScript-first approach, and its streamlined developer experience for defining prompts, flows, and schemas.
    *   **Zod**: A TypeScript-first schema declaration and validation library. It is used within Genkit to define the expected input and output structures for the AI models, ensuring type safety and data integrity.
*   **Platform**:
    *   **Node.js**: The underlying JavaScript runtime environment.

---

### Part 2: Web Integration & Deployment Blueprint

This section provides a step-by-step plan for building and deploying the CryptoSim website.

#### 1. Recommended Technology Stack

The project is already built with a modern, production-ready technology stack. The recommendation is to continue with this stack:

*   **Frontend**: **Next.js (with React & TypeScript)**. This provides server-side rendering for performance, a great developer experience, and a robust ecosystem.
*   **Backend**: **Next.js Server Actions & Genkit Flows**. By co-locating the backend logic with the frontend, we eliminate the need for a separate server application, simplifying development and deployment.
*   **Styling**: **Tailwind CSS** with **ShadCN UI**.
*   **Database**: The current version uses `localStorage` and mock data for simplicity. For a production application, a managed serverless database like **Firebase Firestore** is highly recommended. Firestore is a NoSQL, document-based database that integrates seamlessly with cloud functions and offers real-time data synchronization, which would be perfect for live user balances and trade history.

#### 2. API Design & Endpoints

Because the project uses Next.js Server Actions, there are no traditional REST or GraphQL API endpoints to manage. The "API" consists of the server-side functions that are securely called from the client-side components.

*   **`simulateMarketTrend(input: SimulateMarketTrendInput): Promise<SimulateMarketTrendOutput>`**
    *   **Purpose**: Generates a description for a market trend.
    *   **Request (`input`)**: `{ trend: 'bullish' | 'bearish' | 'sideways' | 'volatile' }`
    *   **Response (`output`)**: `{ description: string }`

*   **`chat(input: ChatInput): Promise<ChatOutput>`**
    *   **Purpose**: Handles a turn in the support chat.
    *   **Request (`input`)**: `{ history: Array<{ role: 'user' | 'model', content: string }> }`
    *   **Response (`output`)**: `{ reply: string }`

If a traditional API were required for a different client (e.g., a mobile app), these server actions could be easily wrapped in Next.js API Routes.

#### 3. User Interface (UI) & User Journey

1.  **User Journey**:
    *   A new user lands on the **Landing Page**, which showcases the platform's features.
    *   The user clicks "Login," which opens a **Wallet Authentication Dialog**. For this simulation, they can choose to log in as a standard "User" or an "Admin."
    *   **Standard User**: Upon login, the user is redirected to the **Dashboard Page**. This page features a large trading chart and a **Trading Panel** on the right. The user can set a trade amount and expiry time, then click "RISE" or "FALL."
    *   Clicking a trade button opens a **Trade Confirmation Dialog** with a summary and a 3-second countdown. Upon confirmation, the trade is "placed."
    *   The user can navigate to their **Profile Page** to view их balance, recent activity, and manage settings.
    *   **Admin User**: Upon login, the admin is redirected to the **Admin Dashboard**. From here, they can navigate to various management pages, including **User Management**, **Market Control** (to set the AI simulation trend), **Live Chat**, and more.

2.  **Conceptual Wireframes**:
    *   **Landing Page**: A large hero section with a headline ("Trade Crypto like a pro"), a call-to-action button, and a dynamic "Market Card" component on the side showing mock asset prices.
    *   **Dashboard Page**: A two-column layout. The left, larger column contains the main trading chart. The right, narrower column contains the trading panel with "Amount" and "Expiry" inputs and "RISE" / "FALL" buttons.
    *   **Admin Market Control Page**: A card-based interface with two main sections. The top section allows the admin to toggle between "Live Simulation" and "Manual Trend" modes. The bottom section, enabled in manual mode, shows four large clickable cards for "Bullish," "Bearish," "Sideways," and "Volatile" trends.

#### 4. Deployment Strategy

*   **Cloud Platform**: **Vercel** is the highly recommended platform. As the creators of Next.js, their platform is purpose-built for deploying Next.js applications. It offers a seamless Git-based workflow, automatic HTTPS, and a global edge network for optimal performance.
*   **CI/CD Process**:
    1.  **Source Control**: The codebase should be hosted in a Git repository (e.g., on GitHub, GitLab, or Bitbucket).
    2.  **Vercel Integration**: Connect the Git repository to a new Vercel project.
    3.  **Environment Variables**: Securely add the `GEMINI_API_KEY` to the Vercel project's environment variables. Do not commit this key to the Git repository.
    4.  **Automatic Deployments**: Vercel's default CI/CD pipeline will trigger automatically on every `git push` to the main branch.
        *   **Build**: Vercel automatically detects the Next.js framework and runs `next build`.
        *   **Deploy**: The build output is deployed to Vercel's global edge network.
    5.  **Preview Deployments**: For every pull request, Vercel will automatically create a unique preview deployment. This allows the team to review and test changes in a production-like environment before merging them into the main branch, ensuring quality and preventing regressions.
