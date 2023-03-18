import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { ExtendedPiece } from '../model';
import { initialState, winningCombinations } from './defaults';

const getWinner = (cells: ExtendedPiece[]) => {
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

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        updateCell: (state, action: PayloadAction<number>) => {
            const newCells = [...state.cells];
            const onTurn = state.onTurn;
            const taken = !!newCells[action.payload];

            if (!taken) {
                newCells[action.payload] = onTurn;

                return {
                    ...state,
                    cells: newCells,
                    onTurn: onTurn === 'circle' ? 'cross' : 'circle',
                    winner: getWinner(newCells),
                };
            }

            return state;
        },
    },
});

export const gameReducer = gameSlice.reducer;

export const { updateCell } = gameSlice.actions;
