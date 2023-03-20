import type { Action, ExtendedPiece, Piece, State } from '../model';
import { winningCombinations } from './defaults';

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

const setCell = (state: State, index: number): State => {
    const onTurn = state.onTurn;
    const taken = !!state.cells[index];

    if (!taken) {
        // here I would need to do deepClone or find out how to get away with mutating substate
        const update = { ...state, cells: [...state.cells] };

        update.cells[index] = onTurn;
        update.onTurn = onTurn === 'circle' ? 'cross' : 'circle';
        update.winner = getWinner(update.cells);
        return update;
    }

    return state;
};

export const storeReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setCell': {
            return setCell(state, action.payload);
        }
        default: {
            return { ...state };
        }
    }
};
