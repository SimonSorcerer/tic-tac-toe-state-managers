import { useAtom, useAtomValue } from 'jotai';
import { Piece } from '../model';
import { state } from '../state/state.manager';
import { Cell } from './Cell';

export interface BoardProps {
    go: Piece;
    onClick: () => void;
}

export const Board: React.FC<BoardProps> = () => {
    const { cellsAtom, winnerAtom } = state;
    const [cells, setCell] = useAtom(cellsAtom);
    const winner = useAtomValue(winnerAtom);

    const handleClick = (index: number) => {
        if (!winner) {
            setCell(index);
        }
    };

    return (
        <div className='board'>
            {cells.map((cell, index) => (
                <Cell
                    key={`cell_${index}`}
                    cell={cell}
                    onClick={() => handleClick(index)}
                />
            ))}
        </div>
    );
};
