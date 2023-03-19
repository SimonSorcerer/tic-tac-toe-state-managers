export type Piece = 'circle' | 'cross';

export type ExtendedPiece = Piece | '';

export interface State {
    cells: ExtendedPiece[];
    onTurn: Piece;
    getWinner: () => Piece | undefined;
    setCell: (index: number) => void;
}
