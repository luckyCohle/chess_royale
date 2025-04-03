export enum messageType {
    Init_Game = "init_game",
    Cancel_init= "cancel_init_request",
    Move = "move",
    Game_Over = "game_over",
    Init_Game_done = "init_success",
    Send_Moves  ="send_moves_list",
    Draw="draw",
    Request_Draw="request_draw",
}
export enum winningConditions{
    Mate = "checkMate",
    resign = "resignation",
    Timeout = "timeout",
}
export enum drawConditions{
    Agreement="draw_agreement",
    StaleMate="stalemate",
    Insufficient_Material="insufficient material",
    Repetition="repetition",
    fifty_Moves ="fifty_move_draw"
}
export type drawConditionType= drawConditions;
export type winningConditionType = winningConditions