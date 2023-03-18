import { updateCell } from '../state/game.slice';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Cell } from './Cell';

export const Board: React.FC = () => {
    const dispatch = useAppDispatch();
    const cells = useAppSelector((state) => state.cells);
    const winner = useAppSelector((state) => state.winner);

    const handleClick = (index: number) => {
        if (!winner) {
            dispatch(updateCell(index));
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
