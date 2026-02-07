import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Board = Array<Array<Piece | null>>;
export interface Position {
    x: bigint;
    y: bigint;
}
export interface RulesExplanation {
    stalemate: string;
    touchMove: string;
    enPassant: string;
    pawnPromotion: string;
    check: string;
    turnTaking: string;
    tournamentFormat: string;
    checkmate: string;
    fiftyMoveRule: string;
    castle: string;
    basicMovement: string;
    timeControls: string;
}
export interface Piece {
    kind: PieceKind;
    color: PieceColor;
    hasMoved: boolean;
}
export type GameMode = {
    __kind__: "Bullet";
    Bullet: null;
} | {
    __kind__: "Online";
    Online: null;
} | {
    __kind__: "Blitz";
    Blitz: null;
} | {
    __kind__: "Correspondence";
    Correspondence: null;
} | {
    __kind__: "Blindfold";
    Blindfold: null;
} | {
    __kind__: "TimeControl";
    TimeControl: {
        incrementSeconds: bigint;
        baseSeconds: bigint;
    };
} | {
    __kind__: "Rapid";
    Rapid: null;
} | {
    __kind__: "Standard";
    Standard: null;
} | {
    __kind__: "FischerRandom";
    FischerRandom: null;
};
export type NotationType = {
    __kind__: "ShortAlgebraic";
    ShortAlgebraic: null;
} | {
    __kind__: "AlgebraicCoordinate";
    AlgebraicCoordinate: null;
} | {
    __kind__: "Descriptive";
    Descriptive: string;
} | {
    __kind__: "LongAlgebraic";
    LongAlgebraic: null;
} | {
    __kind__: "Unknown";
    Unknown: string;
} | {
    __kind__: "International";
    International: null;
};
export enum PieceColor {
    Black = "Black",
    White = "White"
}
export enum PieceKind {
    Bishop = "Bishop",
    King = "King",
    Pawn = "Pawn",
    Rook = "Rook",
    Knight = "Knight",
    Queen = "Queen"
}
export interface backendInterface {
    determineChessNotationType(notation: string): Promise<NotationType>;
    explainChessRules(_mode: GameMode): Promise<RulesExplanation>;
    explainEnPassant(_move: string): Promise<string>;
    getLegalMoves(_pos: Position): Promise<Array<Position>>;
    getStartingPosition(): Promise<Board>;
    isPathClear(_pieceKind: PieceKind, from: Position, to: Position): Promise<boolean>;
}
