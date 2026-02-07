export interface ChessStep {
  position: (string | null)[][];
  description: string;
  move?: string;
  lastMove?: { from: [number, number]; to: [number, number] } | null;
}

export interface ChessExample {
  id: string;
  title: string;
  description: string;
  steps: ChessStep[];
}

const emptyBoard = (): (string | null)[][] =>
  Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

export const examples: ChessExample[] = [
  {
    id: 'castling',
    title: 'Castling (Kingside)',
    description:
      'Castling is a special move involving the king and rook. The king moves two squares toward the rook, and the rook jumps over to the other side of the king.',
    steps: [
      {
        position: [
          ['black-rook', null, null, null, 'black-king', null, null, 'black-rook'],
          ['black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn'],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          ['white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', 'white-pawn'],
          ['white-rook', null, null, null, 'white-king', null, null, 'white-rook'],
        ],
        description: 'Starting position. White can castle kingside (short castle) because the squares between king and rook are empty.',
        lastMove: null,
      },
      {
        position: [
          ['black-rook', null, null, null, 'black-king', null, null, 'black-rook'],
          ['black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn'],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          ['white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', 'white-pawn'],
          ['white-rook', null, null, null, null, 'white-rook', 'white-king', null],
        ],
        description: 'After castling kingside (O-O): The king moved from e1 to g1, and the rook moved from h1 to f1.',
        move: 'O-O (Castling kingside)',
        lastMove: { from: [7, 4], to: [7, 6] },
      },
    ],
  },
  {
    id: 'en-passant',
    title: 'En Passant Capture',
    description:
      'En passant is a special pawn capture that can occur when an opponent\'s pawn moves two squares forward from its starting position, landing beside your pawn.',
    steps: [
      {
        position: [
          [null, null, null, null, null, null, null, null],
          [null, null, null, 'black-pawn', null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, 'white-pawn', null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
        ],
        description: 'White pawn on e5. Black pawn on d7 is about to move.',
        lastMove: null,
      },
      {
        position: [
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, 'black-pawn', 'white-pawn', null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
        ],
        description: 'Black pawn moved two squares from d7 to d5, landing beside the white pawn. White can now capture en passant.',
        move: 'd7-d5',
        lastMove: { from: [1, 3], to: [3, 3] },
      },
      {
        position: [
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, 'white-pawn', null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
        ],
        description: 'White captured en passant! The white pawn moved diagonally to d6, capturing the black pawn that was on d5.',
        move: 'exd6 e.p.',
        lastMove: { from: [3, 4], to: [2, 3] },
      },
    ],
  },
  {
    id: 'scholars-mate',
    title: "Scholar's Mate (Basic Checkmate)",
    description:
      'A quick checkmate pattern that targets the f7 square (or f2 for Black), one of the weakest points in the opening position.',
    steps: [
      {
        position: [
          ['black-rook', 'black-knight', 'black-bishop', 'black-queen', 'black-king', 'black-bishop', 'black-knight', 'black-rook'],
          ['black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn'],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          ['white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', 'white-pawn'],
          ['white-rook', 'white-knight', 'white-bishop', 'white-queen', 'white-king', 'white-bishop', 'white-knight', 'white-rook'],
        ],
        description: 'Starting position of the game.',
        lastMove: null,
      },
      {
        position: [
          ['black-rook', 'black-knight', 'black-bishop', 'black-queen', 'black-king', 'black-bishop', 'black-knight', 'black-rook'],
          ['black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn'],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, 'white-pawn', null, null, null],
          [null, null, null, null, null, null, null, null],
          ['white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', null, 'white-pawn', 'white-pawn', 'white-pawn'],
          ['white-rook', 'white-knight', 'white-bishop', 'white-queen', 'white-king', 'white-bishop', 'white-knight', 'white-rook'],
        ],
        description: 'White plays e4, opening lines for the bishop and queen.',
        move: '1. e4',
        lastMove: { from: [6, 4], to: [4, 4] },
      },
      {
        position: [
          ['black-rook', 'black-knight', 'black-bishop', 'black-queen', 'black-king', 'black-bishop', 'black-knight', 'black-rook'],
          ['black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', null, 'black-pawn', 'black-pawn', 'black-pawn'],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, 'black-pawn', null, null, null],
          [null, null, null, null, 'white-pawn', null, null, null],
          [null, null, null, null, null, null, null, null],
          ['white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', null, 'white-pawn', 'white-pawn', 'white-pawn'],
          ['white-rook', 'white-knight', 'white-bishop', 'white-queen', 'white-king', 'white-bishop', 'white-knight', 'white-rook'],
        ],
        description: 'Black responds with e5.',
        move: '1... e5',
        lastMove: { from: [1, 4], to: [3, 4] },
      },
      {
        position: [
          ['black-rook', 'black-knight', 'black-bishop', 'black-queen', 'black-king', 'black-bishop', 'black-knight', 'black-rook'],
          ['black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', null, 'black-pawn', 'black-pawn', 'black-pawn'],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, 'black-pawn', null, null, null],
          [null, null, 'white-bishop', null, 'white-pawn', null, null, null],
          [null, null, null, null, null, null, null, null],
          ['white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', null, 'white-pawn', 'white-pawn', 'white-pawn'],
          ['white-rook', 'white-knight', 'white-bishop', 'white-queen', 'white-king', null, 'white-knight', 'white-rook'],
        ],
        description: 'White develops the bishop to c4, targeting f7.',
        move: '2. Bc4',
        lastMove: { from: [7, 5], to: [4, 2] },
      },
      {
        position: [
          ['black-rook', null, 'black-bishop', 'black-queen', 'black-king', 'black-bishop', 'black-knight', 'black-rook'],
          ['black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', null, 'black-pawn', 'black-pawn', 'black-pawn'],
          [null, null, 'black-knight', null, null, null, null, null],
          [null, null, null, null, 'black-pawn', null, null, null],
          [null, null, 'white-bishop', null, 'white-pawn', null, null, null],
          [null, null, null, null, null, null, null, null],
          ['white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', null, 'white-pawn', 'white-pawn', 'white-pawn'],
          ['white-rook', 'white-knight', 'white-bishop', 'white-queen', 'white-king', null, 'white-knight', 'white-rook'],
        ],
        description: 'Black develops the knight to c6.',
        move: '2... Nc6',
        lastMove: { from: [0, 1], to: [2, 2] },
      },
      {
        position: [
          ['black-rook', null, 'black-bishop', 'black-queen', 'black-king', 'black-bishop', 'black-knight', 'black-rook'],
          ['black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', null, 'black-pawn', 'black-pawn', 'black-pawn'],
          [null, null, 'black-knight', null, null, null, null, null],
          [null, null, null, null, 'black-pawn', null, null, 'white-queen'],
          [null, null, 'white-bishop', null, 'white-pawn', null, null, null],
          [null, null, null, null, null, null, null, null],
          ['white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', null, 'white-pawn', 'white-pawn', 'white-pawn'],
          ['white-rook', 'white-knight', 'white-bishop', null, 'white-king', null, 'white-knight', 'white-rook'],
        ],
        description: 'White brings out the queen to h5, attacking f7 and threatening checkmate.',
        move: '3. Qh5',
        lastMove: { from: [7, 3], to: [3, 7] },
      },
      {
        position: [
          ['black-rook', null, 'black-bishop', 'black-queen', 'black-king', 'black-bishop', null, 'black-rook'],
          ['black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', null, 'black-pawn', 'black-pawn', 'black-pawn'],
          [null, null, 'black-knight', null, null, 'black-knight', null, null],
          [null, null, null, null, 'black-pawn', null, null, 'white-queen'],
          [null, null, 'white-bishop', null, 'white-pawn', null, null, null],
          [null, null, null, null, null, null, null, null],
          ['white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', null, 'white-pawn', 'white-pawn', 'white-pawn'],
          ['white-rook', 'white-knight', 'white-bishop', null, 'white-king', null, 'white-knight', 'white-rook'],
        ],
        description: 'Black plays Nf6, developing a piece but missing the threat.',
        move: '3... Nf6',
        lastMove: { from: [0, 6], to: [2, 5] },
      },
      {
        position: [
          ['black-rook', null, 'black-bishop', 'black-queen', 'black-king', 'black-bishop', null, 'black-rook'],
          ['black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', null, 'white-queen', 'black-pawn', 'black-pawn'],
          [null, null, 'black-knight', null, null, 'black-knight', null, null],
          [null, null, null, null, 'black-pawn', null, null, null],
          [null, null, 'white-bishop', null, 'white-pawn', null, null, null],
          [null, null, null, null, null, null, null, null],
          ['white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', null, 'white-pawn', 'white-pawn', 'white-pawn'],
          ['white-rook', 'white-knight', 'white-bishop', null, 'white-king', null, 'white-knight', 'white-rook'],
        ],
        description: 'Checkmate! White plays Qxf7#. The black king is in check and has no escape squares.',
        move: '4. Qxf7#',
        lastMove: { from: [3, 7], to: [1, 5] },
      },
    ],
  },
];
