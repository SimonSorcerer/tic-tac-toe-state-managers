import { useAtom, useAtomValue } from 'jotai';
import { Board } from './components/Board';
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
            <Board onClick={handleClick} />
            <p>{message}</p>
        </div>
    );
};

export default App;
