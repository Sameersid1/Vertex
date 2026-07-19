<div align="center">

# 🚀 Vertex Forge

### AI-Powered Cloud IDE with Intelligent Coding Assistance

Build, edit, preview, and collaborate on projects directly in your browser with an AI-powered development environment inspired by **VS Code**, **GitHub Copilot**, and **StackBlitz**.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Monaco-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" />
  <img src="https://img.shields.io/badge/WebContainers-FF6B35?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Ollama-000000?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/yourusername/vertex-forge?style=social" />
  <img src="https://img.shields.io/github/forks/yourusername/vertex-forge?style=social" />
</p>

</div>

---

# 📖 About

**Vertex Forge** is a modern **AI-powered Cloud IDE** built with **Next.js**, **Monaco Editor**, **WebContainers**, and **Local LLMs**.

Instead of switching between multiple applications, Vertex Forge allows developers to:

- 💻 Write code
- 🤖 Get AI assistance
- ⚡ Run projects
- 🌐 Preview applications
- 📁 Manage files
- 💬 Chat with AI

—all from a single browser window.

The goal of Vertex Forge is to bring together the best parts of **VS Code**, **GitHub Copilot**, **StackBlitz**, and **Cursor** into one seamless development experience.

---

# ✨ Features

## 🤖 AI Coding Assistant

- Context-aware code suggestions
- Inline ghost text completions
- AI Chat Assistant
- Explain code
- Fix bugs
- Refactor code
- Generate boilerplate
- Accept / Reject AI suggestions
- Local LLM support using Ollama

---

## 📝 Smart Code Editor

- Monaco Editor
- Syntax highlighting
- IntelliSense support
- Beautiful custom dark theme
- Auto indentation
- Multi-file editing
- File tabs
- Keyboard shortcuts

---

## 📁 File Explorer

- Create files
- Create folders
- Rename files
- Delete files
- Recursive folder structure
- File tree
- Automatic synchronization

---

## ⚡ Browser Development Environment

Powered by **WebContainers**

- Run Node.js in browser
- Install npm packages
- Live Preview
- Automatic server detection
- File System API
- Browser Terminal support

---

## 💬 AI Chat

- Persistent conversations
- Context-aware responses
- Streaming AI responses
- Code explanations
- Debugging assistance
- Architecture guidance

---

## 🔐 Authentication

- Google Login
- GitHub Login
- Session Management
- Protected Routes
- Secure Authentication using NextAuth v5

---

## 🎨 Modern UI

- Responsive Design
- Glassmorphism
- Beautiful animations
- Dark Mode
- VS Code inspired interface
- Sidebar Navigation

---

# 🏗️ Architecture

```text
                        Vertex Forge

                              │
                              ▼

                    Next.js Application

        ┌──────────────────┼────────────────────┐

        ▼                  ▼                    ▼

 Authentication      Monaco Editor          AI Services

        │                  │                    │

        ▼                  ▼                    ▼

     Prisma ORM      File Explorer      Prompt Builder

        │                  │                    │

        ▼                  ▼                    ▼

     MongoDB         WebContainer          Ollama

        │                  │                    │

        └──────────────┬───┴────────────────────┘

                       ▼

                 Live Browser Preview
```

---

# 🛠 Tech Stack

## Frontend

| Technology | Purpose |
|------------|----------|
| Next.js 15 | Full Stack Framework |
| TypeScript | Type Safety |
| React | UI Library |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| shadcn/ui | Components |
| Monaco Editor | Code Editing |
| Lucide React | Icons |
| Zustand | State Management |

---

## Backend

| Technology | Purpose |
|------------|----------|
| Next.js API Routes | Backend |
| NextAuth v5 | Authentication |
| Prisma ORM | Database ORM |
| MongoDB | Database |

---

## AI Stack

| Technology | Purpose |
|------------|----------|
| Ollama | Local AI Runtime |
| Qwen2.5 Coder | Code Generation |
| CodeLlama | Coding Model |
| AI SDK | Streaming Responses |
| Custom Prompt Builder | Context-aware prompting |

---

## Runtime

| Technology | Purpose |
|------------|----------|
| WebContainers | Browser Runtime |
| Node.js | JavaScript Runtime |
| npm | Package Manager |

---

# 📂 Project Structure

```text
vertex-forge/

├── app/
│
├── components/
│
├── hooks/
│
├── lib/
│
├── prisma/
│
├── public/
│
├── types/
│
└── middleware.ts
```

---

# 🤖 AI Suggestion Workflow

```text
User writes code

        │

        ▼

Monaco Editor

        │

        ▼

Collect Editor Context

        │

        ▼

Build AI Prompt

        │

        ▼

Ollama API

        │

        ▼

Qwen / CodeLlama

        │

        ▼

Generate Suggestion

        │

        ▼

Ghost Text Completion
```

---

# ⚡ WebContainer Workflow

```text
Project Files

      │

      ▼

Write Files

      │

      ▼

Boot WebContainer

      │

      ▼

Install Dependencies

      │

      ▼

Start Development Server

      │

      ▼

Live Browser Preview
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/yourusername/vertex-forge.git
```

```bash
cd vertex-forge
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a **.env** file

```env
DATABASE_URL=

AUTH_SECRET=

AUTH_GOOGLE_ID=

AUTH_GOOGLE_SECRET=

AUTH_GITHUB_ID=

AUTH_GITHUB_SECRET=
```

---

## Run Development Server

```bash
npm run dev
```

---

# 📦 Major Libraries Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui
- Monaco Editor
- Zustand
- NextAuth
- Prisma
- MongoDB
- WebContainers API
- AI SDK
- Ollama

---

# 🎯 Highlights

- 🤖 AI Powered Coding Assistant
- 💬 AI Chat
- 📝 Monaco Code Editor
- ⚡ Browser-based Node.js Runtime
- 🌐 Live Preview
- 📁 Smart File Explorer
- 🔐 Authentication
- 🧠 Local AI Models
- 🚀 Fast Development Experience
- 🎨 Beautiful Modern UI

---

# 🚧 Roadmap

- [ ] GitHub Repository Import
- [ ] AI Agent Mode
- [ ] Terminal Commands using AI
- [ ] Docker Deployment
- [ ] Multiple AI Models
- [ ] Workspace Templates
- [ ] Collaborative Editing
- [ ] Voice Coding
- [ ] AI Code Review

---

# 👨‍💻 Author

### Mohd Sameer

If you found this project useful, consider giving it a ⭐ on GitHub.

---

<div align="center">

### ⭐ Star this repository if you like Vertex Forge!

Built with ❤️ using Next.js, WebContainers and Local AI.

</div>