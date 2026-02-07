export interface ChessStep {
  position: (string | null)[][];
  description: string;
  move?: string;
  lastMove?: { from: [number, number]; to: [number, number] } | null;
}

export interface ValidationError {
  stepIndex: number;
  message: string;
}

function getPieceAt(position: (string | null)[][], row: number, col: number): string | null {
  if (row < 0 || row >= 8 || col < 0 || col >= 8) return null;
  return position[row]?.[col] ?? null;
}

function getPieceType(piece: string | null): string | null {
  if (!piece) return null;
  const parts = piece.split('-');
  return parts[1] || null;
}

function getPieceColor(piece: string | null): string | null {
  if (!piece) return null;
  const parts = piece.split('-');
  return parts[0] || null;
}

function isValidPawnMove(fromRow: number, fromCol: number, toRow: number, toCol: number, color: string, captured: boolean): boolean {
  const direction = color === 'white' ? -1 : 1;
  const rowDiff = toRow - fromRow;
  const colDiff = Math.abs(toCol - fromCol);

  // Forward move
  if (colDiff === 0 && !captured) {
    if (rowDiff === direction) return true;
    // Two squares from starting position
    const startRow = color === 'white' ? 6 : 1;
    if (fromRow === startRow && rowDiff === 2 * direction) return true;
  }

  // Diagonal capture
  if (colDiff === 1 && rowDiff === direction && captured) return true;

  return false;
}

function isValidKnightMove(fromRow: number, fromCol: number, toRow: number, toCol: number): boolean {
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);
  return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
}

function isValidBishopMove(fromRow: number, fromCol: number, toRow: number, toCol: number, prevPosition: (string | null)[][]): boolean {
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);
  if (rowDiff !== colDiff) return false;

  // Check path is clear
  const rowDir = toRow > fromRow ? 1 : -1;
  const colDir = toCol > fromCol ? 1 : -1;
  let r = fromRow + rowDir;
  let c = fromCol + colDir;
  while (r !== toRow && c !== toCol) {
    if (getPieceAt(prevPosition, r, c)) return false;
    r += rowDir;
    c += colDir;
  }
  return true;
}

function isValidRookMove(fromRow: number, fromCol: number, toRow: number, toCol: number, prevPosition: (string | null)[][]): boolean {
  if (fromRow !== toRow && fromCol !== toCol) return false;

  // Check path is clear
  if (fromRow === toRow) {
    const start = Math.min(fromCol, toCol) + 1;
    const end = Math.max(fromCol, toCol);
    for (let c = start; c < end; c++) {
      if (getPieceAt(prevPosition, fromRow, c)) return false;
    }
  } else {
    const start = Math.min(fromRow, toRow) + 1;
    const end = Math.max(fromRow, toRow);
    for (let r = start; r < end; r++) {
      if (getPieceAt(prevPosition, r, fromCol)) return false;
    }
  }
  return true;
}

function isValidQueenMove(fromRow: number, fromCol: number, toRow: number, toCol: number, prevPosition: (string | null)[][]): boolean {
  return isValidBishopMove(fromRow, fromCol, toRow, toCol, prevPosition) || 
         isValidRookMove(fromRow, fromCol, toRow, toCol, prevPosition);
}

function isValidKingMove(fromRow: number, fromCol: number, toRow: number, toCol: number): boolean {
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);
  // Normal king move
  if (rowDiff <= 1 && colDiff <= 1) return true;
  // Castling (king moves 2 squares horizontally)
  if (rowDiff === 0 && colDiff === 2) return true;
  return false;
}

function validateMove(
  piece: string,
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number,
  prevPosition: (string | null)[][],
  currentPosition: (string | null)[][]
): boolean {
  const pieceType = getPieceType(piece);
  const pieceColor = getPieceColor(piece);
  if (!pieceType || !pieceColor) return false;

  const targetPiece = getPieceAt(prevPosition, toRow, toCol);
  const captured = targetPiece !== null;

  switch (pieceType) {
    case 'pawn':
      return isValidPawnMove(fromRow, fromCol, toRow, toCol, pieceColor, captured);
    case 'knight':
      return isValidKnightMove(fromRow, fromCol, toRow, toCol);
    case 'bishop':
      return isValidBishopMove(fromRow, fromCol, toRow, toCol, prevPosition);
    case 'rook':
      return isValidRookMove(fromRow, fromCol, toRow, toCol, prevPosition);
    case 'queen':
      return isValidQueenMove(fromRow, fromCol, toRow, toCol, prevPosition);
    case 'king':
      return isValidKingMove(fromRow, fromCol, toRow, toCol);
    default:
      return false;
  }
}

export function validateExample(steps: ChessStep[]): ValidationError[] {
  const errors: ValidationError[] = [];

  for (let i = 1; i < steps.length; i++) {
    const prevStep = steps[i - 1];
    const currentStep = steps[i];

    // Check if lastMove exists
    if (!currentStep.lastMove) {
      if (currentStep.move) {
        errors.push({
          stepIndex: i,
          message: `Step ${i} has a move description but no lastMove coordinates`,
        });
      }
      continue;
    }

    const { from, to } = currentStep.lastMove;
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    // Check coordinates are valid
    if (fromRow < 0 || fromRow >= 8 || fromCol < 0 || fromCol >= 8 ||
        toRow < 0 || toRow >= 8 || toCol < 0 || toCol >= 8) {
      errors.push({
        stepIndex: i,
        message: `Step ${i} has invalid coordinates: from [${fromRow},${fromCol}] to [${toRow},${toCol}]`,
      });
      continue;
    }

    // Check piece exists at from position in previous step
    const movedPiece = getPieceAt(prevStep.position, fromRow, fromCol);
    if (!movedPiece) {
      errors.push({
        stepIndex: i,
        message: `Step ${i}: No piece at starting position [${fromRow},${fromCol}] in previous step`,
      });
      continue;
    }

    // Check piece is at to position in current step
    const pieceAtDestination = getPieceAt(currentStep.position, toRow, toCol);
    if (pieceAtDestination !== movedPiece) {
      errors.push({
        stepIndex: i,
        message: `Step ${i}: Piece ${movedPiece} should be at [${toRow},${toCol}] but found ${pieceAtDestination || 'empty'}`,
      });
    }

    // Check piece is not at from position in current step (unless castling rook)
    const pieceAtOrigin = getPieceAt(currentStep.position, fromRow, fromCol);
    if (pieceAtOrigin === movedPiece) {
      // Could be castling where we're tracking king move but rook also moves
      const isKing = getPieceType(movedPiece) === 'king';
      const colDiff = Math.abs(toCol - fromCol);
      if (!(isKing && colDiff === 2)) {
        errors.push({
          stepIndex: i,
          message: `Step ${i}: Piece ${movedPiece} still at origin [${fromRow},${fromCol}] after move`,
        });
      }
    }

    // Validate move legality
    if (!validateMove(movedPiece, fromRow, fromCol, toRow, toCol, prevStep.position, currentStep.position)) {
      errors.push({
        stepIndex: i,
        message: `Step ${i}: Illegal move for ${movedPiece} from [${fromRow},${fromCol}] to [${toRow},${toCol}]`,
      });
    }
  }

  return errors;
}

export function validateAllExamples(examples: { id: string; title: string; steps: ChessStep[] }[]): Map<string, ValidationError[]> {
  const results = new Map<string, ValidationError[]>();
  
  for (const example of examples) {
    const errors = validateExample(example.steps);
    if (errors.length > 0) {
      results.set(example.id, errors);
    }
  }
  
  return results;
}
