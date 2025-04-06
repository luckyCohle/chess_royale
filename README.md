# ♟️ Chess-Royale

A full-stack, real-time multiplayer chess game built with WebSockets and React. Players can connect from anywhere, play chess in real-time, request draws, resign, and experience all official chess rules including checkmate, stalemate, and more.

![Chess Royale Demo](https://your-demo-gif-link-here.gif)

## ✨ Features

- ♟️ Real-time multiplayer chess with WebSocket communication
- ✅ Complete chess rules validation via chess.js
- 🔄 Synchronized game state across clients
- 🎮 Intuitive drag-and-drop interface
- 🤝 Draw offers and resignations
- 🏁 Proper game ending conditions (checkmate, stalemate, repetition)
- 💻 Responsive design for desktop and tablets

## 🔧 Tech Stack

### Backend
- **Node.js** with **TypeScript** for type-safe server code
- **WebSocket (ws)** for real-time bidirectional communication
- **chess.js** for chess rule validation and game state management

### Frontend
- **React** with functional components and hooks
- **TypeScript** for improved developer experience
- **React DnD** for drag-and-drop chess pieces
- **Tailwind CSS** for responsive, utility-first styling
- **WebSocket API** for real-time communication with server

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/chess-royale.git
cd chess-royale
```

2. **Setup Backend**
```bash
cd backend
npm install
npm run dev  # Starts WebSocket server on port 8080
```

3. **Setup Frontend**
```bash
cd frontend
npm install
npm run dev  # Starts development server on port 3000
```

4. **Open the application**
- Navigate to http://localhost:3000 in your browser
- Open another browser window/tab to simulate a second player
- The game begins when both players connect

## 🎮 How to Play

1. Wait for two players to connect
2. White moves first (assigned randomly)
3. Drag and drop pieces to make moves
4. Use the game control buttons to:
   - Offer a draw
   - Resign the game
   - View move history

## 🔌 WebSocket Message Protocol

Chess-Royale uses a JSON-based protocol for communication between client and server:

```json
{
  "type": "Move",
  "payload": {
    "from": "e2",
    "to": "e4"
  }
}
```

### Message Types

| Type | Direction | Purpose |
|------|-----------|---------|
| `Init_Game` | Client → Server | Request to enter matchmaking queue |
| `Cancel_Init` | Client → Server | Cancel matchmaking request |
| `Init_Game_Done` | Server → Client | Confirms game start with assigned color |
| `Move` | Bidirectional | Send or receive a chess move |
| `Request_Draw` | Bidirectional | Offer or receive a draw offer |
| `Draw` | Bidirectional | Confirm draw acceptance |
| `Game_Over` | Server → Client | Announce game result and reason |

## 📋 Project Structure

```
chess-royale/
├── backend/           # WebSocket server
│   ├── src/
│   │   ├── server.ts  # Main server entry point
│   │   ├── game.ts    # Game logic implementation
│   │   └── types.ts   # TypeScript type definitions
│   └── package.json
│
├── frontend/          # React client
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChessBoard.tsx  # Chess board component
│   │   │   ├── Piece.tsx       # Chess piece component
│   │   │   └── GameControls.tsx # Game control buttons
│   │   ├── utility/
│   │   │   ├── websocket.ts    # WebSocket connection handling
│   │   │   └── chessBoardUtils.ts # Helper functions
│   │   └── App.tsx
│   └── package.json
│
└── README.md
```

## 🛠️ Future Improvements

- 🔐 User authentication and accounts
- 💾 Game history storage in database
- ⏱️ Chess clocks (Blitz, Bullet, and Classical time controls)
- 📊 Player ratings and leaderboards
- 👀 Spectator mode for watching ongoing games
- 📱 Mobile-optimized interface
- 💬 In-game chat functionality

## 🧑‍💻 Author

**Aayush Yadav** (aka Lucky)

Backend-focused full-stack developer building multiplayer experiences. Engineering student passionate about chess and real-time systems.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
