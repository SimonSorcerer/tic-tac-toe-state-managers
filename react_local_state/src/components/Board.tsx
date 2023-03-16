import { useRef } from 'react';
import { Piece } from '../model';
import { Cell } from './Cell';

export interface BoardProps {
    go: Piece;
    onClick: (winner: Piece | undefined) => void;
}

export const Board: React.FC<BoardProps> = ({ go, onClick }) => {
    const cells = useRef(new Array<Piece | ''>(9).fill(''));

    const checkWinner = (): Piece | undefined => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        const circleWins = winningCombinations.some((combo) =>
            combo.every((key) => cells.current[key] === 'circle')
        );

        if (circleWins) {
            return 'circle';
        } else {
            const crossWins = winningCombinations.some((combo) =>
                combo.every((key) => cells.current[key] === 'cross')
            );

            if (crossWins) {
                return 'cross';
            }
        }
    };

    const handleCellClick = (id: number) => {
        const taken = !!cells.current[id];

        if (!taken) {
            cells.current[id] = go;
            onClick(checkWinner());
        }
    };

    return (
        <div className='board'>
            {cells.current.map((cell, index) => (
                <Cell
                    key={`cell_${index}`}
                    id={index}
                    cell={cell}
                    onCellClick={handleCellClick}
                />
            ))}
        </div>
    );
};
