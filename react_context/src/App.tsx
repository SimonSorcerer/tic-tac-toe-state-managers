import { Board } from './components/Board';
import { useStore } from './state/store';

const App: React.FC = () => {
    const { state } = useStore();
    const winner = state.winner;
    const onTurn = state.onTurn;

    const message = winner ? `${winner} wins!` : `it is now ${onTurn}'s turn`;

    return (
        <div className='app'>
            <Board />
            <p>{message}</p>
        </div>
    );
};

export default App;
