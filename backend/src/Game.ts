import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { moveType } from "../types/move";
import { v4 } from "uuid";
import { messageType } from "../types/message";

export class Game {
    public id: string;
    public player1: WebSocket;
    public player2: WebSocket;
    private board: Chess;
    private moves: moveType[];
    private startTime: Date;
    private moveCount:number =0;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.id = v4()
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moves = [];
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: messageType.Init_Game_done,
            payload: {
                color: "white"
            }
        }))
        this.player2.send(JSON.stringify({
            type: messageType.Init_Game_done,
            payload: {
                color: "black"
            }
        }))
    }

    makeMove(socket: WebSocket, move: moveType) {
        //checking if right user is making move
        if (this.moves.length % 2 === 0 && socket !== this.player1){
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
        } catch (error) {
            console.log("\ninvalid move")
            console.log("\n||||||||||||\n Error: "+error+"\n|||||||||||||\n")
        }

        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: messageType.Game_Over,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }))
            return;
        }
        console.log("game is still on!");
        if (this.moves.length % 2 === 0) {
            // console.log("sending move to player1")
            this.player2.send(JSON.stringify({
                type: messageType.Move,
                payload: move
            }))
        } else{
            // console.log("sending move to player2")
            this.player1.send(JSON.stringify({
                type: messageType.Move,
                payload: move
            }))

        }
        this.moves.push(move);
        this.moveCount++;
        // console.log(this.moves)
    }
}