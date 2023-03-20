import { Board } from './components/Board';
import { store } from './state/store';
import { useSnapshot } from 'valtio';

const App: React.FC = () => {
    const snapshot = useSnapshot(store);
    const winner = snapshot.winner;
    const onTurn = snapshot.onTurn;

    const message = winner ? `${winner} wins!` : `it is now ${onTurn}'s turn`;

    return (
        <div className='app'>
            <Board />
            <p>{message}</p>
        </div>
    );
};

export default App;
