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
            const thisGame = this.games.find(game => game.player1 == socket || game.player2 == socket);
            const message = JSON.parse(data.toString());
            if (message.type == message_1.messageType.Init_Game) {
                if (this.pendingUser) {
                    console.log("match completed creating game");
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    console.log("adding user to queue for game making");
                    this.pendingUser = socket;
                }
                return;
            }
            if (message.type = message_1.messageType.Cancel_init) {
                console.log("cancel request recieved ");
                this.pendingUser = null;
            }
            if (message.type == message_1.messageType.Request_Draw) {
                console.log("draw request recieved");
                thisGame === null || thisGame === void 0 ? void 0 : thisGame.RequestDraw(message_1.drawConditions.Agreement, socket);
            }
            if (message.type == message_1.messageType.Game_Over) {
                console.log("message: " + message);
                if (message.payload.condition == message_1.winningConditions.resign) {
                    console.log("inside nested if, the users array length:\n");
                    console.log(this.User.length);
                    this.User.map(user => user.send(JSON.stringify(message)));
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
                    let completeMove = Object.assign(Object.assign({}, message.payload), { player: color });
                    thisGame.makeMove(socket, completeMove);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
