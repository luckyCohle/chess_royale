"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const uuid_1 = require("uuid");
const message_1 = require("../types/message");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.id = (0, uuid_1.v4)();
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.moves = [];
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: message_1.messageType.Init_Game_done,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: message_1.messageType.Init_Game_done,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        //checking if right user is making move
        if (this.moves.length % 2 === 0 && socket !== this.player1) {
            console.log("early return 1");
            return;
        }
        if (this.moves.length % 2 === 1 && socket !== this.player2) {
            console.log("early return2");
            return;
        }
        // console.log("move is valid");
        try {
            this.board.move(move);
        }
        catch (error) {
            console.log("\ninvalid move");
            console.log("\n||||||||||||\n Error: " + error + "\n|||||||||||||\n");
        }
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: message_1.messageType.Game_Over,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            return;
        }
        // console.log("game is still on!");
        if (this.moves.length % 2 === 0) {
            // console.log("sending move to player1")
            this.player2.send(JSON.stringify({
                type: message_1.messageType.Move,
                payload: move
            }));
        }
        else {
            // console.log("sending move to player2")
            this.player1.send(JSON.stringify({
                type: message_1.messageType.Move,
                payload: move
            }));
        }
        this.moves.push(move);
        this.moveCount++;
        // console.log(this.moves)
    }
}
exports.Game = Game;
