import { PieceColor, PieceKind } from '@/backend';

interface ChessboardProps {
  position: (string | null)[][];
  lastMove?: { from: [number, number]; to: [number, number] } | null;
}

const pieceSymbols: Record<string, string> = {
  'white-king': '♔',
  'white-queen': '♕',
  'white-rook': '♖',
  'white-bishop': '♗',
  'white-knight': '♘',
  'white-pawn': '♙',
  'black-king': '♚',
  'black-queen': '♛',
  'black-rook': '♜',
  'black-bishop': '♝',
  'black-knight': '♞',
  'black-pawn': '♟',
};

export default function Chessboard({ position, lastMove }: ChessboardProps) {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const isHighlighted = (row: number, col: number): boolean => {
    if (!lastMove) return false;
    return (
      (lastMove.from[0] === row && lastMove.from[1] === col) ||
      (lastMove.to[0] === row && lastMove.to[1] === col)
    );
  };

  return (
    <div className="inline-block">
      <div className="grid grid-cols-8 gap-0 border-2 border-border">
        {position.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const isLight = (rowIndex + colIndex) % 2 === 0;
            const highlighted = isHighlighted(rowIndex, colIndex);

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`flex aspect-square w-full items-center justify-center text-4xl sm:text-5xl md:text-6xl ${
                  isLight
                    ? highlighted
                      ? 'bg-amber-200'
                      : 'bg-amber-50'
                    : highlighted
                      ? 'bg-amber-400'
                      : 'bg-amber-600'
                }`}
                style={{ minWidth: '50px', minHeight: '50px' }}
              >
                {piece && pieceSymbols[piece]}
              </div>
            );
          })
        )}
      </div>
      <div className="mt-2 flex justify-around text-xs font-medium text-muted-foreground">
        {files.map((file) => (
          <span key={file} className="w-[12.5%] text-center">
            {file}
          </span>
        ))}
      </div>
    </div>
  );
}
