import { atom } from 'jotai';
import { ExtendedPiece, Piece } from '../model';
import { initialCells, initialTurn, winningCombinations } from './defaults';

const cellsDataAtom = atom<ExtendedPiece[]>(initialCells);
const onTurnAtom = atom<Piece>(initialTurn);

const messageAtom = atom((get) => {
    const winner = get(winnerAtom);
    const onTurn = get(onTurnAtom);

    return winner ? `${winner} wins!` : `it is now ${onTurn}'s turn`;
});

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
