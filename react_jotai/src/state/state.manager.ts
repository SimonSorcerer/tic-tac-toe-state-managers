import { atom } from 'jotai';
import { ExtendedPiece, Piece } from '../model';
import { initialCells, initialTurn, winningCombinations } from './defaults';

// primitive atoms
const cellsDataAtom = atom<ExtendedPiece[]>(initialCells);
const onTurnAtom = atom<Piece>(initialTurn);

// read-only atom
const messageAtom = atom((get) => {
    const winner = get(winnerAtom);
    const onTurn = get(onTurnAtom);

    return winner ? `${winner} wins!` : `it is now ${onTurn}'s turn`;
});

// read-only atom
const winnerAtom = atom<Piece | undefined>((get) => {
    const cells = get(cellsDataAtom);

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
});

// read-write atom
const cellsAtom = atom(
    (get) => get(cellsDataAtom),
    (get, set, update: number) => {
        const newCellsData = [...get(cellsDataAtom)];
        const onTurn = get(onTurnAtom);
        const taken = !!newCellsData[update];

        if (!taken) {
            newCellsData[update] = onTurn;
            set(cellsDataAtom, newCellsData);
            set(onTurnAtom, onTurn === 'circle' ? 'cross' : 'circle');
        }
    }
);

export const state = {
    cellsAtom,
    onTurnAtom,
    winnerAtom,
    messageAtom,
};
