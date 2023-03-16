import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Board } from './components/Board';
import { Piece } from './model';
import { state } from './state/state.manager';

const App: React.FC = () => {
    const { messageAtom, onTurnAtom, winnerAtom } = state;
    const [onTurn, setOnTurn] = useAtom(onTurnAtom);

    const winner = useAtomValue(winnerAtom);
    const message = useAtomValue(messageAtom);

    const handleClick = () => {
        if (!winner) {
            setOnTurn(onTurn === 'circle' ? 'cross' : 'circle');
        }
    };

    return (
        <div className='app'>
            <Board go={onTurn} onClick={handleClick} />
            <p>{message}</p>
        </div>
    );
};

export default App;
