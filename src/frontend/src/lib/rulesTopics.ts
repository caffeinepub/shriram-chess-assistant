export interface RuleTopic {
  id: string;
  keywords: string[];
  answer: string;
  clarificationPrompt?: string;
  needsClarification?: (question: string) => boolean;
  useBackend?: boolean;
  backendField?: string;
}

export const rulesTopics: RuleTopic[] = [
  {
    id: 'castling',
    keywords: ['castle', 'castling', 'o-o', '0-0', 'kingside', 'queenside'],
    answer: `**Castling** is a special move involving the king and a rook:

• The king moves two squares toward the rook
• The rook jumps over to the square the king crossed
• **Kingside castling (O-O)**: King moves to g-file, rook to f-file
• **Queenside castling (O-O-O)**: King moves to c-file, rook to d-file

**Requirements:**
✓ Neither piece has moved before
✓ Squares between them are empty
✓ King is not in check
✓ King doesn't pass through or land on an attacked square

Castling is the only move where you move two pieces at once!`,
    useBackend: true,
    backendField: 'castle',
  },
  {
    id: 'en-passant',
    keywords: ['en passant', 'enpassant', 'e.p.', 'pawn capture', 'special pawn'],
    answer: `**En Passant** is a special pawn capture:

When an opponent's pawn moves **two squares forward** from its starting position and lands **beside** your pawn, you can capture it "in passing" on your next move only.

**How it works:**
1. Your pawn must be on the 5th rank (for White) or 4th rank (for Black)
2. Opponent's pawn moves two squares and lands beside yours
3. You capture diagonally to the square the pawn "passed through"
4. The captured pawn is removed from its current square

**Important:** You must capture immediately on the next move, or you lose the opportunity!

Example: White pawn on e5, Black plays d7-d5. White can play exd6 e.p., capturing the pawn and moving to d6.`,
    useBackend: true,
    backendField: 'enPassant',
  },
  {
    id: 'check',
    keywords: ['check', 'in check', 'king attacked', 'king threatened'],
    answer: `**Check** means your king is under direct attack:

When in check, you **must** immediately:
1. **Move the king** to a safe square, OR
2. **Block** the attack with another piece, OR
3. **Capture** the attacking piece

You cannot make any move that leaves your king in check. If you have no legal moves to escape check, it's **checkmate** and you lose!

**Note:** You cannot castle out of check, through check, or into check.`,
    useBackend: true,
    backendField: 'check',
  },
  {
    id: 'checkmate',
    keywords: ['checkmate', 'mate', 'win', 'game over', 'victory'],
    answer: `**Checkmate** ends the game immediately:

Checkmate occurs when:
✓ The king is in check
✓ There is no legal move to escape the check
✓ The king cannot move to a safe square
✓ No piece can block the attack
✓ The attacking piece cannot be captured

The player who delivers checkmate wins the game!

Common checkmate patterns include:
• Back rank mate (rook or queen on the back rank)
• Scholar's mate (queen and bishop attack f7/f2)
• Smothered mate (knight delivers mate, king blocked by own pieces)`,
    useBackend: true,
    backendField: 'checkmate',
  },
  {
    id: 'stalemate',
    keywords: ['stalemate', 'draw', 'no legal moves', 'stuck'],
    answer: `**Stalemate** is a draw (tie game):

Stalemate occurs when:
✓ It's your turn to move
✓ Your king is **NOT** in check
✓ You have **no legal moves** available

This is different from checkmate! In stalemate, the king is safe but trapped.

**Example:** If your king is surrounded by your own pieces or the board edge, and moving it would put it in check, and you have no other pieces that can move, it's stalemate.

The game ends immediately in a draw - neither player wins.`,
    useBackend: true,
    backendField: 'stalemate',
  },
  {
    id: 'promotion',
    keywords: ['promotion', 'promote', 'pawn promotion', 'queening', 'eighth rank'],
    answer: `**Pawn Promotion** happens when a pawn reaches the opposite end of the board:

When your pawn reaches the 8th rank (for White) or 1st rank (for Black), it **must** be promoted to:
• Queen (most common - most powerful piece)
• Rook
• Bishop
• Knight

**Important rules:**
✓ You must promote immediately - you cannot keep it as a pawn
✓ You can promote to any piece, even if you still have the original piece
✓ You can have multiple queens (or other pieces) through promotion
✓ The promotion is part of the same move

Most players choose a queen because it's the most powerful piece, but sometimes a knight is better to deliver checkmate or avoid stalemate!`,
    useBackend: true,
    backendField: 'pawnPromotion',
  },
  {
    id: 'fifty-move-rule',
    keywords: ['fifty move', '50 move', 'fifty-move', '50-move', 'draw claim'],
    answer: `**Fifty-Move Rule** allows claiming a draw:

A player can claim a draw if:
✓ The last **50 consecutive moves** by each player have been made
✓ No pawn has been moved
✓ No piece has been captured

**How it works:**
• The count resets to zero after any pawn move or capture
• Either player can claim the draw when the condition is met
• The game doesn't automatically end - you must claim it
• At 75 moves with no pawn move or capture, the arbiter can declare a draw

This rule prevents games from continuing indefinitely when neither player can make progress.`,
    useBackend: true,
    backendField: 'fiftyMoveRule',
  },
  {
    id: 'threefold-repetition',
    keywords: ['threefold', 'three-fold', 'repetition', 'repeated position', 'same position'],
    answer: `**Threefold Repetition** allows claiming a draw:

A player can claim a draw if the **same position** occurs three times with:
✓ Same player to move
✓ Same pieces in same locations
✓ Same castling rights available
✓ Same en passant possibilities

**Important notes:**
• The positions don't need to occur consecutively
• You must claim the draw - it's not automatic
• The position must be identical in all aspects
• This often happens when both players repeat moves (e.g., perpetual check)

Example: If both players keep repeating the same sequence of moves, either can claim a draw after the third repetition.`,
  },
  {
    id: 'insufficient-material',
    keywords: ['insufficient material', 'not enough pieces', 'cannot checkmate', 'automatic draw'],
    answer: `**Insufficient Material** causes an automatic draw:

The game is automatically drawn when neither player has enough pieces to possibly deliver checkmate:

**Insufficient material combinations:**
• King vs. King
• King + Bishop vs. King
• King + Knight vs. King
• King + Bishop vs. King + Bishop (same color bishops)

**Sufficient material (can still mate):**
• King + Queen vs. King
• King + Rook vs. King
• King + Two Bishops vs. King
• King + Bishop + Knight vs. King
• Any position with pawns (pawns can promote)

This draw is automatic - no claim needed!`,
  },
  {
    id: 'touch-move',
    keywords: ['touch move', 'touch-move', 'touched piece', 'must move'],
    answer: `**Touch-Move Rule** (in over-the-board play):

If you deliberately touch a piece, you must move it if legal:

**The rule:**
• "Touch piece, move piece" - if you touch your piece with intent to move, you must move it
• If the touched piece has no legal move, you may move another piece
• If you touch an opponent's piece, you must capture it if legal
• To adjust a piece without moving it, say "I adjust" or "j'adoube" first

**Important:**
✓ Only applies to deliberate touches
✓ Doesn't apply in online chess (you must click to move)
✓ In tournaments, violating this rule can result in penalties
✓ Always think before touching!

This rule encourages careful play and prevents players from testing moves.`,
    useBackend: true,
    backendField: 'touchMove',
  },
  {
    id: 'time-controls',
    keywords: ['time control', 'clock', 'rapid', 'blitz', 'bullet', 'time format', 'increment'],
    answer: `**Time Controls** define how much time each player has:

**Standard formats:**
• **Classical/Standard**: 90+ minutes per player (e.g., 90 min + 30 sec increment)
• **Rapid**: 10-60 minutes per player (e.g., 15+10, 25+10)
• **Blitz**: 3-10 minutes per player (e.g., 5+0, 3+2)
• **Bullet**: Under 3 minutes per player (e.g., 1+0, 2+1)

**Increment/Delay:**
• **Increment**: Time added after each move (e.g., +10 seconds)
• **Delay**: Clock doesn't start for X seconds after your move

**Losing on time:**
If your clock runs out, you lose - UNLESS your opponent has insufficient material to checkmate (then it's a draw).

Different time controls require different strategies - faster games need quick decisions!`,
    useBackend: true,
    backendField: 'timeControls',
  },
  {
    id: 'piece-movement-pawn',
    keywords: ['pawn move', 'pawn', 'how does pawn move', 'pawn rules'],
    answer: `**Pawn Movement:**

• Moves **forward one square** (never backward)
• On its **first move**, can move forward **two squares**
• **Captures diagonally** one square forward (not straight ahead)
• Cannot jump over pieces
• Promotes when reaching the opposite end

**Special moves:**
• En passant capture (special pawn capture)
• Promotion to Queen, Rook, Bishop, or Knight

Pawns are unique - they're the only pieces that move differently than they capture!`,
  },
  {
    id: 'piece-movement-knight',
    keywords: ['knight move', 'knight', 'horse', 'how does knight move', 'l-shape'],
    answer: `**Knight Movement:**

The knight moves in an **L-shape**:
• Two squares in one direction (horizontal or vertical)
• Then one square perpendicular to that

**Special properties:**
✓ Only piece that can **jump over** other pieces
✓ Always lands on a square of the opposite color
✓ Can reach up to 8 different squares from the center
✓ Very powerful in closed positions

Think of it as: 2 squares + 1 square at a right angle. The knight is tricky but powerful!`,
  },
  {
    id: 'piece-movement-bishop',
    keywords: ['bishop move', 'bishop', 'how does bishop move', 'diagonal'],
    answer: `**Bishop Movement:**

• Moves **diagonally** any number of squares
• Cannot jump over pieces
• Each bishop stays on its starting color (light or dark) forever
• You start with two bishops - one on light squares, one on dark squares

**Strategy tip:** Bishops are powerful on open diagonals and work well together (the "bishop pair"). They're worth about 3 pawns each.`,
  },
  {
    id: 'piece-movement-rook',
    keywords: ['rook move', 'rook', 'castle piece', 'how does rook move', 'tower'],
    answer: `**Rook Movement:**

• Moves **horizontally or vertically** any number of squares
• Cannot jump over pieces (except during castling)
• Very powerful on open files (columns with no pawns)
• Participates in castling with the king

**Strategy tip:** Rooks are worth about 5 pawns each. They're most effective on open files and the 7th rank (opponent's second row).`,
  },
  {
    id: 'piece-movement-queen',
    keywords: ['queen move', 'queen', 'how does queen move', 'most powerful'],
    answer: `**Queen Movement:**

• Combines the power of **rook and bishop**
• Moves horizontally, vertically, OR diagonally any number of squares
• Cannot jump over pieces
• The most powerful piece on the board

**Strategy tip:** The queen is worth about 9 pawns. Don't bring it out too early (it can be attacked), but use it actively in the middlegame and endgame!`,
  },
  {
    id: 'piece-movement-king',
    keywords: ['king move', 'king', 'how does king move'],
    answer: `**King Movement:**

• Moves **one square** in any direction (horizontal, vertical, or diagonal)
• Cannot move into check (a square attacked by opponent)
• Can capture opponent pieces (if safe to do so)
• Participates in castling (special move with rook)

**Important:** The king is the most important piece - if it's checkmated, you lose! Protect your king and attack your opponent's king.`,
  },
  {
    id: 'draw-agreement',
    keywords: ['draw by agreement', 'agree to draw', 'offer draw', 'mutual draw'],
    answer: `**Draw by Agreement:**

Players can agree to a draw at any time:

**How it works:**
1. One player offers a draw (usually after making a move)
2. The opponent can accept or decline
3. If accepted, the game ends immediately in a draw

**When to offer:**
• Position is equal with no winning chances
• Both players are low on time
• Repetition is likely to occur
• The position is simplified and balanced

**Etiquette:** Don't offer draws too frequently - it can be annoying. In tournaments, there may be rules about when draws can be offered (e.g., not before move 30).`,
  },
  {
    id: 'tournament-format',
    keywords: ['tournament', 'tournament format', 'round robin', 'swiss', 'knockout'],
    answer: `**Tournament Formats:**

**Swiss System** (most common):
• Players paired based on score each round
• Everyone plays the same number of rounds
• You don't play the same opponent twice
• Winner is player with highest score

**Round Robin:**
• Every player plays every other player
• Fair but time-consuming
• Common in small elite tournaments

**Knockout/Elimination:**
• Single or double elimination
• Lose and you're out (or get one second chance)
• Fast but less fair

**Time controls vary:** Classical, rapid, or blitz depending on the tournament.`,
    useBackend: true,
    backendField: 'tournamentFormat',
  },
  {
    id: 'basic-movement',
    keywords: ['how to play', 'basic rules', 'how pieces move', 'chess basics', 'beginner'],
    answer: `**Basic Chess Rules:**

**Objective:** Checkmate your opponent's king

**How to play:**
• White moves first, then players alternate
• Each player makes one move per turn
• You must move when it's your turn (except in stalemate)
• You cannot put your own king in check

**The pieces:**
• King: Moves one square in any direction
• Queen: Moves any distance horizontally, vertically, or diagonally
• Rook: Moves any distance horizontally or vertically
• Bishop: Moves any distance diagonally
• Knight: Moves in an L-shape (2+1 squares)
• Pawn: Moves forward one square, captures diagonally

**Winning:**
• Checkmate the opponent's king
• Opponent resigns
• Opponent runs out of time (with sufficient material)

Ask me about specific pieces or rules for more details!`,
    useBackend: true,
    backendField: 'basicMovement',
  },
];
