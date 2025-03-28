import { WebSocket } from "ws"
import { Game } from "./Game";
import { messageType } from "../types/message";
import { moveType } from "../types/move";

export class GameManager {
    private games:Game[];
    private pendingUser:WebSocket |null;
    private User!: WebSocket[];

    constructor() {
        this.games =[]
        this.pendingUser=null
        this.User=[];
    }
    addUser(user:WebSocket){
        this.User.push(user);
        this.addHandler(user);
    }
    removeUser(user:WebSocket){
        this.User = this.User.filter(u => u !== user);
    }

    private addHandler(socket:WebSocket){
        socket.on("message",(data)=>{
            const message = JSON.parse(data.toString());
            if (message.type == messageType.Init_Game) {
                if (this.pendingUser) {
                    const game = new Game(this.pendingUser,socket)
                    this.games.push(game)
                    this.pendingUser=null;
                }else{
                    this.pendingUser=socket;
                }
            }
            
            if (message.type == messageType.Move) {
                console.log("control inside move message section");
                // const thisGame = this.games.find(game=> game.id == message.gameId);
                const thisGame = this.games.find(game=> game.player1== socket || game.player2==socket)
                if (thisGame) {
                    let color = "b";
                    if (thisGame.player1== socket) {
                        color = "w";
                    }
                    let completeMove:moveType = {
                        ...message.move,
                        player:color
                    }
                    thisGame.makeMove(socket,completeMove);
                }

            }
        })
    }
}