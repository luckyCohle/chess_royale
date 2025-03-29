import { Square, PieceSymbol, Color } from "chess.js";

export type boardType= ({
    square: Square;
    type: PieceSymbol;
    color: Color;
} | null)[][]