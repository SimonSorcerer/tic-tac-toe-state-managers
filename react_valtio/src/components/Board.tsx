import { useSnapshot } from 'valtio';
import { setCell, store } from '../state/store';
import { Cell } from './Cell';

export const Board: React.FC = () => {
    const snapshot = useSnapshot(store);

    const handleClick = (index: number) => {
        if (!snapshot.winner) {
            setCell(index);
        }
    };

    return (
        <div className='board'>
            {snapshot.cells.map((cell, index) => (
                <Cell
                    key={`cell_${index}`}
                    cell={cell}
                    onClick={() => handleClick(index)}
                />
            ))}
        </div>
    );
};
