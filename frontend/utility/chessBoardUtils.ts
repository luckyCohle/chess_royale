import { Color, PieceSymbol, Square } from "chess.js";


export const getImage=(piece: PieceSymbol, color: Color)=> {
        let returnValue = ""
        if (color == "w") {
            returnValue = piece + ".png";
        } else {
            returnValue = "b" + piece + ".png"
        }
        return returnValue;
    }


    

    export const getSquareCode=(rowIndex: number, colIndex: number,perspective:"b"|"w"): string => {
        if (perspective === "w") {
            // White perspective: a1 at bottom-left
            const rowNo = 8 - rowIndex;
            const colChar = String.fromCharCode(97 + colIndex);
            return colChar + rowNo.toString();
        } else {
            // Black perspective: a8 at bottom-left (from black's view)
            const rowNo = rowIndex + 1;
            const colChar = String.fromCharCode(97 + (7 - colIndex));
            return colChar + rowNo.toString();
        }
    }
