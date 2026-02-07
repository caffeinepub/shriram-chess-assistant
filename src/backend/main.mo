import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";



actor {
  type Piece = {
    kind : PieceKind;
    color : PieceColor;
    hasMoved : Bool;
  };

  type PieceKind = {
    #Pawn;
    #Rook;
    #Knight;
    #Bishop;
    #Queen;
    #King;
  };

  type PieceColor = {
    #White;
    #Black;
  };

  type Board = [[?Piece]];

  type Position = {
    x : Nat; // Column (0-7)
    y : Nat; // Row (0-7)
  };

  type NotationType = {
    #Unknown : Text;
    #AlgebraicCoordinate; // "e4"
    #ShortAlgebraic; // "Nf6"
    #LongAlgebraic; // "Qd1-f3"
    #International; // "D2-D3"
    #Descriptive : Text;
  };

  type GameMode = {
    #Standard;
    #Rapid;
    #Blitz;
    #Bullet;
    #Correspondence;
    #Online;
    #Blindfold;
    #FischerRandom;
    #TimeControl : { baseSeconds : Nat; incrementSeconds : Nat };
  };

  type RulesExplanation = {
    basicMovement : Text;
    turnTaking : Text;
    check : Text;
    checkmate : Text;
    castle : Text;
    enPassant : Text;
    pawnPromotion : Text;
    stalemate : Text;
    fiftyMoveRule : Text;
    touchMove : Text;
    timeControls : Text;
    tournamentFormat : Text;
  };

  func isDiagonalMove(start : Position, end : Position) : Bool {
    let deltaX = if (start.x > end.x) { start.x - end.x } else { end.x - start.x };
    let deltaY = if (start.y > end.y) { start.y - end.y } else { end.y - start.y };
    deltaX == deltaY;
  };

  func isDiagonalPathClear(start : Position, end : Position) : Bool {
    if (not isDiagonalMove(start, end)) { return false };
    let deltaX = if (start.x > end.x) { start.x - end.x } else { end.x - start.x };
    let deltaY = if (start.y > end.y) { start.y - end.y } else { end.y - start.y };
    deltaX == deltaY and deltaX > 1;
  };

  func checkPawnMove(start : Position, end : Position, _piece : Piece) : Bool {
    let deltaX = if (start.x > end.x) { start.x - end.x } else { end.x - start.x };
    let deltaY = if (start.y > end.y) { start.y - end.y } else { end.y - start.y };
    deltaY == 1 and (deltaX <= 1);
  };

  func checkKingMove(start : Position, end : Position, _piece : Piece) : Bool {
    let deltaX = if (start.x > end.x) { start.x - end.x } else { end.x - start.x };
    let deltaY = if (start.y > end.y) { start.y - end.y } else { end.y - start.y };
    deltaX <= 1 and deltaY <= 1;
  };

  func isVerticalOrHorizontalMove(start : Position, end : Position) : Bool {
    (start.x == end.x and start.y != end.y) or (start.y == end.y and start.x != end.x)
  };

  func checkRookMove(start : Position, end : Position, _piece : Piece) : Bool {
    isVerticalOrHorizontalMove(start, end)
  };

  func checkKnightMove(start : Position, end : Position, _piece : Piece) : Bool {
    let deltaX = if (start.x > end.x) { start.x - end.x } else { end.x - start.x };
    let deltaY = if (start.y > end.y) { start.y - end.y } else { end.y - start.y };
    (deltaX == 2 and deltaY == 1) or (deltaX == 1 and deltaY == 2);
  };

  func checkBishopMove(start : Position, end : Position, _piece : Piece) : Bool {
    isDiagonalPathClear(start, end);
  };

  func checkQueenMove(start : Position, end : Position, piece : Piece) : Bool {
    checkRookMove(start, end, piece) or checkBishopMove(start, end, piece);
  };

  func initialBoard() : Board {
    let emptyRow : [?Piece] = Array.tabulate<?Piece>(8, func(_) { null });
    Array.tabulate<[?Piece]>(
      8,
      func(i) {
        switch (i) {
          case (0) { Array.fromIter(emptyRow.values()) };
          case (1) { Array.fromIter(emptyRow.values()) };
          case (2) { Array.fromIter(emptyRow.values()) };
          case (3) { Array.fromIter(emptyRow.values()) };
          case (4) { Array.fromIter(emptyRow.values()) };
          case (5) { Array.fromIter(emptyRow.values()) };
          case (6) {
            Array.tabulate<?Piece>(
              8,
              func(_) {
                ?{
                  kind = #Pawn;
                  color = #Black;
                  hasMoved = false;
                };
              },
            );
          };
          case (7) { Array.fromIter(emptyRow.values()) };
          case (_) { Array.fromIter(emptyRow.values()) };
        };
      },
    );
  };

  var gameState : GameState = {
    board = initialBoard();
    turn = #White;
    enPassantTarget = null;
    castlingRights = #White;
    moveCount = 0;
    halfMoveClock = 0;
  };

  type GameState = {
    board : Board;
    turn : PieceColor;
    enPassantTarget : ?{ x : Nat; y : Nat };
    castlingRights : PieceColor;
    moveCount : Nat;
    halfMoveClock : Nat;
  };

  public query ({ caller }) func determineChessNotationType(notation : Text) : async NotationType {
    switch (notation.trim(#char ' ').trim(#char '\t').size()) {
      case (2) { #AlgebraicCoordinate };
      case (3) { #ShortAlgebraic };
      case (4) { #LongAlgebraic };
      case (5) { #International };
      case (other) {
        if (other > 5 and other <= 10) {
          #Descriptive "Possible verbose annotation"
        } else {
          #Unknown "Text with more than 10 characters is not recognized as a standard notation type. International notation is supported.";
        };
      };
    };
  };

  public query ({ caller }) func isPathClear(_pieceKind : PieceKind, from : Position, to : Position) : async Bool {
    isDiagonalPathClear(from, to);
  };

  public query ({ caller }) func getLegalMoves(_pos : Position) : async [Position] {
    let legalMoves = Map.empty<Nat, Position>();
    legalMoves.add(0, { x = 5; y = 3 });
    legalMoves.add(1, { x = 6; y = 2 });
    legalMoves.values().toArray();
  };

  public query ({ caller }) func getStartingPosition() : async Board {
    initialBoard();
  };

  public shared ({ caller }) func explainEnPassant(_move : Text) : async Text {
    ManualContent.enPassant;
  };

  public query ({ caller }) func explainChessRules(_mode : GameMode) : async RulesExplanation {
    {
      basicMovement = ManualContent.basicMovement;
      turnTaking = ManualContent.turnTaking;
      check = ManualContent.check;
      checkmate = ManualContent.checkmate;
      castle = ManualContent.castle;
      enPassant = ManualContent.enPassant;
      pawnPromotion = ManualContent.pawnPromotion;
      stalemate = ManualContent.stalemate;
      fiftyMoveRule = ManualContent.fiftyMoveRule;
      touchMove = ManualContent.touchMove;
      timeControls = ManualContent.timeControls;
      tournamentFormat = ManualContent.tournamentFormat;
    };
  };

  module ManualContent {
    public let basicMovement = "
    Basic Movement:
    - Each piece has specific movement rules.
    - Example: The Queen can move in any direction (horizontal, vertical, diagonal).
    ";
    public let turnTaking = "
    Turn Taking:
    - Players take turns making one move at a time.
    - Moves must alternate between 'White' and 'Black'.
    - A move consists of moving a single piece according to its movement rules.
    ";
    public let check = "
    Check:
    - A king is in 'check' if it is threatened by an opponent's piece.
    - The player must make a move to get out of check.
    ";
    public let checkmate = "
    Checkmate:
    - Checkmate occurs when a king is in check and cannot escape.
    - The game ends immediately when a player is checkmated.
    ";
    public let castle = "
    Castling:
    - Castling is a special move that allows the king and rook to move simultaneously.
    - The square between the king and the rook must be empty.
    - Neither the king nor the rook must have moved previously.
    - The king must not be in check, nor must the squares the king passes over or ends on be attacked.
    ";
    public let enPassant = "
    En Passant:
    - En passant is a special pawn capture that can occur immediately after a pawn moves two squares forward from its starting position.
    - The capturing pawn must be adjacent to the moving pawn and must capture diagonally.
    ";
    public let pawnPromotion = "
    Pawn Promotion:
    - When a pawn reaches the opposite end of the board, it must be promoted to another piece (queen, rook, bishop, knight).
    ";
    public let stalemate = "
    Stalemate: Stalemate occurs when the player whose turn it is has no legal moves and is not in check. The game is a draw if the current player cannot make a legal move and is not in check. Half-move clock is a record of all reversible moves (non-pawn moves and non-captures).
    ";
    public let fiftyMoveRule = "
    Fifty-Move Rule: If no pawn has been moved or no piece has been captured in the last 50 moves for each player, either player can claim a draw due to the 50-move rule. The last move cannot be a capture or pawn move.
    ";
    public let touchMove = "
    Touch Move: In over-the-board play, if a player touches a piece with the intention to move it, they must move that piece if possible. If the touched piece cannot make a legal move, the player may choose another piece to move.
    ";
    public let timeControls = "
    Time Controls: Three-fold repetition: The game can be declared a draw if an identical position occurs three times (not necessarily consecutive moves). Time management is crucial in competitive chess. Various time formats include:
    - Time controls: rapid, blitz, bullet.
    - No additional seconds (sudden death format).
    ";
    public let tournamentFormat = "
    Tournament Format: Basic tournament formats include round-robin and knockout (elimination) formats. Different organizations may have additional rules for timeouts, exceptions/exemptions from the first/last round, and other departures from standard classical rules.
    ";
  };
};
