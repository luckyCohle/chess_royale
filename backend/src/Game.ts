import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { moveType } from "../types/move";
import { v4 } from "uuid";
import { drawConditions, drawConditionType, messageType, winningConditions, winningConditionType } from "../types/message";

export class Game {
    public id: string;
    public player1: WebSocket;
    public player2: WebSocket;
    private board: Chess;
    private moves: moveType[];
    private startTime: Date;
    private moveCount:number =0;
    private DrawRequests:Set<WebSocket> = new Set<WebSocket>();

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

        console.log("move is valid");
        try {
            this.board.move(move);
        } catch (error) {
            console.log("\ninvalid move")
            console.log("\n||||||||||||\n Error: "+error+"\n|||||||||||||\n")
        }

        if (this.board.isGameOver()) {
            if (this.board.isCheckmate()) {
                const message = JSON.stringify({
                    type: messageType.Game_Over,
                    payload: {
                        winner: this.board.turn() === "w" ? "b" : "w",
                        condition:winningConditions.Mate
                    }
                })
                this.player1.send(message);
                this.player2.send(message);
            }
            
            return;
        }
        if (this.board.isDraw()) {
            if (this.board.isStalemate()) {
                this.draw(drawConditions.StaleMate)
            }else if (this.board.isInsufficientMaterial()) {
                this.draw(drawConditions.Insufficient_Material)
            }else if (this.board.isDrawByFiftyMoves()) {
                this.draw(drawConditions.fifty_Moves)
            }else if (this.board.isThreefoldRepetition()) {
                this.draw(drawConditions.Repetition)
            }
            return;
        }
        console.log("game is still on!");
        if (this.moves.length % 2 === 0) {
            console.log("sending move to player1")
            this.player2.send(JSON.stringify({
                type: messageType.Move,
                payload: move
            }))
        } else{
            console.log("sending move to player2")
            this.player1.send(JSON.stringify({
                type: messageType.Move,
                payload: move
            }))

        }
        this.moves.push(move);
        this.moveCount++;
        // console.log(this.moves)
    }
    gameOver(socket:WebSocket,condition:winningConditionType,winnningColor:"w"|"b"){
        if (condition == winningConditions.resign) {
            const message = JSON.stringify({
                type:messageType.Game_Over,
                payload:{
                    condition:winningConditions.resign,
                    winner:winnningColor
                }
            })
            this.player1.send(message);
            this.player2.send(message);
        }
    }
    RequestDraw(condition:drawConditionType,socket:WebSocket) {
        this.DrawRequests.add(socket);
        if(this.DrawRequests.size == 2){
           this.draw(condition)
           return;
        }
        console.log("forwarding request to the other player")
        if (socket == this.player1) {
            this.player2.send(JSON.stringify({
                type:messageType.Request_Draw
            }))

        }else{
            this.player1.send(JSON.stringify({
                type:messageType.Request_Draw
            }))
        }

        
    }
    draw(condition:drawConditionType){
        const message = JSON.stringify({
            type:messageType.Draw,
            payload:{
                condition:condition
            }
        })
        this.player1.send(message);
        this.player2.send(message);
    }
    getMove(socket: WebSocket) {
        socket.send(JSON.stringify({
            type: messageType.Send_Moves,
            payload: {
                moves: this.moves
            }
        }))
        }
}