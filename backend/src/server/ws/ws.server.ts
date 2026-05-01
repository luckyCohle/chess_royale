import { WebSocketServer } from "ws"
import { GameManager } from "../../modules/game/gameManager"
const startWsServer = async () => {
    const wss = new WebSocketServer({ port: 8080 });
    console.log("ws server listing to port 8080");
    const manager = new GameManager();
    wss.on("connection", function connection(ws) {
        console.log("new user connected");
        console.log("no of users: " + manager.getUserCount())
        manager.addUser(ws)
        ws.on("close", () => {
            manager.removeUser(ws);
        })
    })
    return wss;
}
export default startWsServer;