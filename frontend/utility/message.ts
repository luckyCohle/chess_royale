import { ValueOf } from "next/dist/shared/lib/constants"

export enum messageTypes {
    Init_Game = "init_game",
    Move = "move",
    Game_Over = "game_over",
    Init_Game_done = "init_success",
    Send_Moves  ="send_moves_list",
    Draw="draw",
    Request_Draw="request_draw",
}
export type messageType = messageTypes.Init_Game| messageTypes.Move |messageTypes.Game_Over|messageTypes.Init_Game_done|messageTypes.Send_Moves
export enum winningConditions{
    Mate = "checkMate",
    resign = "resignation",
    Timeout = "timeout",
}
export enum drawConditions{
    Agreement="draw_agreement",
    Insufficient_Material="insufficient material",
    Repetition="repetition",
    fifty_Moves ="fifty_move_draw"
}