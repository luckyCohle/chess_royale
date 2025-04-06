♟️ Real-Time Multiplayer Chess Game
A full-stack, real-time multiplayer chess game built with WebSockets and React. This project allows two players to connect, play chess in real-time, request draws, resign, and handle all official chess rules like checkmate, stalemate, and more.

🖼️ Demo
Add a link or gif/screenshots here once deployed!

🔧 Tech Stack
🧠 Backend
Node.js

TypeScript

WebSocket (ws)

chess.js – Game logic and rule validation

🎨 Frontend
React (or Next.js if applicable)

chess.js

TypeScript

WebSocket API

Tailwind CSS / CSS Modules (based on your stack)


🚀 Getting Started
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/yourusername/chess-game.git
cd chess-game
2. Setup Backend
bash
Copy
Edit
cd backend
npm install
npx ts-node server.ts
Starts WebSocket server at ws://localhost:8080

Waits for two players to initiate a game

3. Setup Frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev
Opens app at http://localhost:3000

Connects to backend WebSocket

Chessboard will appear when both players are connected

🧩 Gameplay Features
♟ Real-time multiplayer chess

✅ Legal move validation via chess.js

🔁 Draw requests and agreement-based draws

🏁 Game Over via checkmate, stalemate, repetition, resignation

🔄 Move sync between clients

💀 Auto-disconnect handling

🔌 Message Protocol
Example JSON Message
json
Copy
Edit
{
  "type": "Move",
  "payload": {
    "from": "e2",
    "to": "e4"
  }
}
Types Used
Type	Purpose
Init_Game	Requests to enter matchmaking queue
Cancel_init	Cancels matchmaking
Init_Game_done	Confirms game start and player color
Move	Sends a move
Request_Draw	Requests a draw
Draw	Confirms draw accepted
Game_Over	Sends game result

🛠️ Future Improvements
🔐 Authentication with JWT

💾 Persistent move history in DB (Mongo/Postgres)

⏱ Chess clocks (Blitz/Bullet)

👀 Spectator mode


📱 Mobile-friendly UI

🧑‍💻 Author
Aayush Yadav (aka Lucky)
Backend-focused full-stack dev, building cool multiplayer stuff.
🎓 Engineering Student | 🧠 Passionate about chess & real-time systems

Feel free to fork, contribute, and raise issues!

📜 License
MIT License
