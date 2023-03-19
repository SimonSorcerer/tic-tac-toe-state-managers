import { useStore } from '../state/store';
import { shallow } from 'zustand/shallow';
import { Cell } from './Cell';

export const Board: React.FC = () => {
    const [cells, getWinner, setCell] = useStore(
        (state) => [state.cells, state.getWinner, state.setCell],
        shallow
    );

    const handleClick = (index: number) => {
        if (!getWinner()) {
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
