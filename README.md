# Product Management Application

A modern, full-stack Product Management application built with the MERN stack (MongoDB, Express, React/Next.js, Node.js) and TypeScript.

## 🚀 Capabilities

-   **Infinite Scrolling**: Efficiently browse large product lists with cursor-based pagination.
-   **Real-time Search**: Instantly filter products using a debounced search bar.
-   **Product Creation**: Add new products via a responsive modal form.
-   **Modern UI**: Aesthetics-first design using Tailwind CSS v4, glassmorphism, and smooth gradients.
-   **Type Safety**: Full TypeScript support across both client and server.

## 🛠 Tech Stack

### Client (Frontend)
-   **Framework**: [Next.js 16](https://nextjs.org/) (Pages Router)
-   **Library**: React 19
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Language**: TypeScript

### Server (Backend)
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB (via Mongoose)
-   **Language**: TypeScript

## 📦 Prerequisites

-   Node.js (v20 or higher recommended)
-   npm (Node Package Manager)
-   A MongoDB instance (Local or Atlas)

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Shashank-9676/product-management.git
cd product-management
```

### 2. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Configure Environment Variables:
Create a `.env` file (or use `.env.test`/`.env.production`) in the `server` directory with the following content:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

Start the Server:

```bash
npm run dev
```
The server will start on `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal, navigate to the client directory, and install dependencies:

```bash
cd client
npm install
```

Configure Environment Variables:
Create a `.env.local` file in the `client` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the Client:

```bash
npm run dev
```
The client will start on `http://localhost:3000`.

## 🏃‍♂️ Running the Application

1.  Ensure your **MongoDB** is running or accessible.
2.  Start the **Server** (`npm run dev` in `server/`).
3.  Start the **Client** (`npm run dev` in `client/`).
4.  Open your browser and navigate to `http://localhost:3000`.

## 📂 Project Structure

```
product-management/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── components/     # UI Components (SearchBar, ProductForm, etc.)
│   │   ├── hooks/          # Custom Hooks (useInfiniteProducts)
│   │   ├── pages/          # Next.js Pages
│   │   ├── services/       # API Integration
│   │   ├── styles/         # Global Styles (Tailwind)
│   │   └── types/          # TypeScript Interfaces
├── server/                 # Express Backend
│   ├── src/
│   │   ├── config/         # Environment Config
│   │   ├── controllers/    # Request Handlers
│   │   ├── models/         # Mongoose Models
│   │   ├── routes/         # API Routes
│   │   ├── services/       # Business Logic
│   └── dist/               # Compiled JS
└── README.md
```

## 📜 Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the application in development mode (Client/Server) |
| `npm run build` | Builds the application for production |
| `npm start` | Starts the production build |
