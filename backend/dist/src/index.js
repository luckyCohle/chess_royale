"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const gameManager_1 = require("./gameManager");
let userCount = 0;
const wss = new ws_1.WebSocketServer({ port: 8080 });
console.log("ws server listing to port 8080");
const manager = new gameManager_1.GameManager();
wss.on("connection", function connection(ws) {
    console.log("new user connected");
    console.log("no of users: " + ++userCount);
    manager.addUser(ws);
    ws.on("close", () => {
        manager.removeUser(ws);
    });
});
