"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Game_1 = require("./Game");
const message_1 = require("../types/message");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.User = [];
    }
    addUser(user) {
        this.User.push(user);
        this.addHandler(user);
    }
    removeUser(user) {
        this.User = this.User.filter(u => u !== user);
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type == message_1.messageType.Init_Game) {
                if (this.pendingUser) {
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            if (message.type == message_1.messageType.Move) {
                console.log("control inside move message section");
                // const thisGame = this.games.find(game=> game.id == message.gameId);
                const thisGame = this.games.find(game => game.player1 == socket || game.player2 == socket);
                if (thisGame) {
                    let color = "b";
                    if (thisGame.player1 == socket) {
                        color = "w";
                    }
                    let completeMove = Object.assign(Object.assign({}, message.move), { player: color });
                    thisGame.makeMove(socket, completeMove);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
