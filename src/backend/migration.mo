module {
  type GameState = {
    board : [[?Piece]];
    turn : PieceColor;
    enPassantTarget : ?{ x : Nat; y : Nat };
    castlingRights : PieceColor;
    moveCount : Nat;
    halfMoveClock : Nat;
  };

  type PieceKind = { #Pawn; #Rook; #Knight; #Bishop; #Queen; #King };
  type Piece = { kind : PieceKind; color : PieceColor; hasMoved : Bool };
  type PieceColor = { #White; #Black };

  type OldActor = {
    gameState : GameState;
  };

  type NewActor = {
    gameState : GameState;
  };

  public func run(old : OldActor) : NewActor {
    old;
  };
};
