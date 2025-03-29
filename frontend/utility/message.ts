import { ValueOf } from "next/dist/shared/lib/constants"

export enum messageTypes {
    Init_Game = "init_game",
    Move = "move",
    Game_Over = "game_over",
    Init_Game_done = "init_success"
}
export type messageType = messageTypes.Init_Game| messageTypes.Move |messageTypes.Game_Over;