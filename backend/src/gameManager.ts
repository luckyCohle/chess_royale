import { WebSocket } from "ws"
import { Game } from "./Game";
import { drawConditions, messageType, winningConditions } from "../types/message";
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
            const thisGame = this.games.find(game=> game.player1== socket || game.player2==socket)
            const message = JSON.parse(data.toString());
            console.log(message)
            if (message.type == messageType.Init_Game) {
                if (this.pendingUser) {
                    console.log("match completed creating game")
                    const game = new Game(this.pendingUser,socket)
                    this.games.push(game)
                    this.pendingUser=null;
                }else{
                    console.log("adding user to queue for game making")
                    this.pendingUser=socket;
                }
                return;
            }
            if (message.type == messageType.Cancel_init) {
                console.log("cancel request recieved ")
                this.pendingUser=null;
            }
            if (message.type == messageType.Request_Draw) {
                console.log("draw request recieved");
                
                    thisGame?.RequestDraw(drawConditions.Agreement,socket);
                
            }
            if (message.type == messageType.Game_Over) {
                console.log("message: "+message);
                if (message.payload.condition == winningConditions.resign) {
                    console.log("inside nested if, the users array length:\n");
                    console.log(this.User.length);
                    this.User.map(user=>user.send(JSON.stringify(message)));
                }
            }
            if (message.type == messageType.Move) {
                console.log("control inside move message section");
                console.log(message.payload);
                const thisGame = this.games.find(game=> game.player1== socket || game.player2==socket)
                if (thisGame) {
                    let color = "b";
                    if (thisGame.player1== socket) {
                        color = "w";
                    }
                    let completeMove:moveType = {
                        ...message.payload,
                        player:color
                    }
                    thisGame.makeMove(socket,completeMove);
                }

            }
        })
    }
}