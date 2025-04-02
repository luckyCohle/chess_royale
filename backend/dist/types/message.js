"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageType = void 0;
var messageType;
(function (messageType) {
    messageType["Init_Game"] = "init_game";
    messageType["Move"] = "move";
    messageType["Game_Over"] = "game_over";
    messageType["Init_Game_done"] = "init_success";
    messageType["Send_Moves"] = "send_moves_list";
})(messageType || (exports.messageType = messageType = {}));
