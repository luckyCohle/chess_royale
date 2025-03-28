import {WebSocketServer} from "ws"
import { GameManager } from "./gameManager";
let userCount =0;
const wss = new WebSocketServer({port:8080});
console.log("ws server listing to port 8080");
const manager = new GameManager();
wss.on("connection",function connection(ws){
    console.log("new user connected");
    console.log("no of users: "+ ++userCount)
    manager.addUser(ws)
    ws.on("close",()=>{
        manager.removeUser(ws);
    })
})