# 💬 webSocket-chat

A lightweight and minimalistic **web-based chat application** where users can talk in real time. Powered by Node.js, the native `ws` WebSocket package, and vanilla JavaScript, this project is all about simplicity, speed, and learning the core of real-time web communication—no bloat, no distractions.

---

## 🚀 Features

* 🗨️ Real-time group chat
* 👥 Multiple users can join and chat instantly
* 🌱 Minimal and distraction-free UI
* ⚡ Blazing fast thanks to true WebSocket technology (`ws`)

---

## ⚙️ Technologies Used

* **Node.js** — Runs the server logic
* **ws** — Native WebSocket implementation for Node.js
* **JavaScript (vanilla)** — Manages the front-end interactions
* **HTML/CSS** — Simple, clean user interface

---

## 📁 Project Structure

```
webSocket-chat/
│
├── server.js         # Node.js + ws WebSocket server
├── public/
│   ├── index.html    # Minimal UI for the chat room
│   └── client.js     # Handles WebSocket client logic
└── README.md
```

---

## 🔧 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Birabhadra/Mini-Projects.git
cd Mini-Projects/webSocket-chat
```

### 2. Install dependencies

```bash
npm install
```
*(Only pulls in `ws`—no unnecessary libraries!)*

### 3. Start the server

```bash
node server.js
```

### 4. Open the app

Visit [http://localhost:3000](http://localhost:3000) in your browser  
Open in multiple tabs or browsers and start chatting!

---

## ▶️ How It Works

1. **Connect:** The client (`client.js`) uses a WebSocket to join the server.
2. **Chat:** Messages are sent instantly to the server, which broadcasts them to all connected clients—super fast and truly real-time.
3. **Minimal UI:** The interface is intentionally simple, putting the focus on conversation.

---

## 🤓 Why You'll Love This Project

* See how real-time communication works with **pure WebSockets** (no abstractions).
* Very little code—easy to hack, learn, and extend.
* Great for learning the basics of Node.js servers, networking, and front-end integration.

---

## 🌱 Possible Improvements

* Add user nicknames or avatars
* Show users joining/leaving
* Support private messages or rooms
* Add message timestamps
* Store chat history

---

## 🧠 What I Learned

* How to build real-time apps with WebSockets
* Node.js networking and `ws` fundamentals
* Handling client-server communication with vanilla JavaScript
* Building simple but functional UIs

---

## 🙌 Author

**Birabhadra Sahoo**

---

⭐ If you enjoyed the project, give it a ⭐️!
