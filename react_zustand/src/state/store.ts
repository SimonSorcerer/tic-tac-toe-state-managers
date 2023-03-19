import { create } from 'zustand';
import { Piece, State } from '../model';
import { initialCells, initialTurn, winningCombinations } from './defaults';

const getWinner = (state: State): Piece | undefined => {
    const cells = state.cells;

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

export const useStore = create<State>((set, get) => ({
    cells: initialCells,
    onTurn: initialTurn,
    setCell: (index: number) =>
        set((state) => {
            const newCells = [...state.cells];
            const onTurn = state.onTurn;
            const taken = !!newCells[index];

            if (!taken) {
                newCells[index] = onTurn;

                return {
                    ...state,
                    cells: newCells,
                    onTurn: onTurn === 'circle' ? 'cross' : 'circle',
                };
            }
            return state;
        }),
    getWinner: () => getWinner(get()),
}));
