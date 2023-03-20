import { proxy } from 'valtio';
import { ExtendedPiece, Piece, State } from '../model';
import { initialCells, initialTurn, winningCombinations } from './defaults';

const getWinner = (cells: ExtendedPiece[]): Piece | undefined => {
    const circleWins = winningCombinations.some((combo) =>
        combo.every((key) => cells[key] === 'circle')
    );

    if (circleWins) {
        return 'circle';
    } else {
        const crossWins = winningCombinations.some((combo) =>
            combo.every((key) => cells[key] === 'cross')
        );

        if (crossWins) {
            return 'cross';
        }
    }
};

export const store = proxy<State>({
    cells: initialCells,
    onTurn: initialTurn,
    winner: undefined,
});

export const setCell = (index: number) => {
    const onTurn = store.onTurn;
    const taken = !!store.cells[index];

    if (!taken) {
        store.cells[index] = onTurn;
        store.onTurn = store.onTurn === 'circle' ? 'cross' : 'circle';
        store.winner = getWinner(store.cells);
    }
};
