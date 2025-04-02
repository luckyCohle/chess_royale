"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawConditions = exports.winningConditions = exports.messageType = void 0;
var messageType;
(function (messageType) {
    messageType["Init_Game"] = "init_game";
    messageType["Move"] = "move";
    messageType["Game_Over"] = "game_over";
    messageType["Init_Game_done"] = "init_success";
    messageType["Send_Moves"] = "send_moves_list";
    messageType["Draw"] = "draw";
    messageType["Request_Draw"] = "request_draw";
})(messageType || (exports.messageType = messageType = {}));
var winningConditions;
(function (winningConditions) {
    winningConditions["Mate"] = "checkMate";
    winningConditions["resign"] = "resignation";
    winningConditions["Timeout"] = "timeout";
})(winningConditions || (exports.winningConditions = winningConditions = {}));
var drawConditions;
(function (drawConditions) {
    drawConditions["Agreement"] = "draw_agreement";
    drawConditions["StaleMate"] = "stalemate";
    drawConditions["Insufficient_Material"] = "insufficient material";
    drawConditions["Repetition"] = "repetition";
    drawConditions["fifty_Moves"] = "fifty_move_draw";
})(drawConditions || (exports.drawConditions = drawConditions = {}));
