import { actions, useStore } from '../state/store';
import { Cell } from './Cell';

export const Board: React.FC = () => {
    const { state, dispatch } = useStore();

    const handleClick = (index: number) => {
        if (!state.winner) {
            dispatch(actions.setCell(index));
        }
    };

    return (
        <div className='board'>
            {state.cells.map((cell, index) => (
                <Cell
                    key={`cell_${index}`}
                    cell={cell}
                    onClick={() => handleClick(index)}
                />
            ))}
        </div>
    );
};
