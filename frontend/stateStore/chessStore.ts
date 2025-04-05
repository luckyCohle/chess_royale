import { create } from "zustand";
import { Chess, PieceSymbol } from "chess.js";
import { moveType } from "@/utility/moveType";
import { gameOverDetailsType } from "@/utility/gameOverDetail";
import { useSocket } from "@/hooks/useSocket";

export interface GameState {
    chess: Chess;
    board: ReturnType<Chess["board"]>;
    perspective: "b" | "w";
    gameStarted: boolean;
    moves: moveType[];
    isGameOver: boolean;
    gameOverDetail: gameOverDetailsType;
    winner: "b" | "w";
    drawRequested: boolean;
    isFindingOpponent: boolean;
    capturedByBlack:PieceSymbol[];
    capturedByWhite:PieceSymbol[];

    // Actions
    setChess: (chess: Chess) => void;
    setBoard: () => void;
    setPerspective: (perspective: "b" | "w") => void;
    setGameStarted: (started: boolean) => void;
    setMoves: (moves: moveType[]) => void;
    addMove: (move: moveType) => void;
    setIsGameOver: (status: boolean) => void;
    setGameOverDetail: (details: gameOverDetailsType) => void;
    setWinner: (winner: "b" | "w") => void;
    setDrawRequested: (requested: boolean) => void;
    setIsFindingOpponent: (finding: boolean) => void;
    addToCapturedByBlack:(piece:PieceSymbol)=>void;
    addToCapturedByWhite:(piece:PieceSymbol)=>void;
}

export const useGameStore = create<GameState>((set) => ({
    chess: new Chess(),
    board: new Chess().board(),
    perspective: "w",
    gameStarted: false,
    moves: [],
    isGameOver: false,
    gameOverDetail: { type: "draw", reason: "agreement" },
    winner: "b",
    drawRequested: false,
    isFindingOpponent: false,
    capturedByBlack:[],
    capturedByWhite:[],

    // Actions
    setChess: (chess) => set({ chess, board: chess.board() }),
    setBoard: () => set((state) => ({ board: state.chess.board() })),
    setPerspective: (perspective) => set({ perspective }),
    setGameStarted: (started) => set({ gameStarted: started }),
    setMoves: (moves) => set({ moves }),
    addMove: (move) => set((state) => ({ moves: [...state.moves, move] })),
    setIsGameOver: (status) => set({ isGameOver: status }),
    setGameOverDetail: (details) => set({ gameOverDetail: details }),
    setWinner: (winner) => set({ winner }),
    setDrawRequested: (requested) => set({ drawRequested: requested }),
    setIsFindingOpponent: (finding) => set({ isFindingOpponent: finding }),
    addToCapturedByBlack:(piece)=>set((state)=>({capturedByBlack:[...state.capturedByBlack,piece]})),
    addToCapturedByWhite:(piece)=>set((state)=>({capturedByWhite:[...state.capturedByWhite,piece]})),
}));
