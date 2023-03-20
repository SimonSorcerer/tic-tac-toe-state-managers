export type Piece = 'circle' | 'cross';

export type ExtendedPiece = Piece | '';

export interface State {
    cells: ExtendedPiece[];
    onTurn: Piece;
    winner: Piece | undefined;
}
