import { Board } from './components/Board';
import { useAppSelector } from './state/hooks';

const App: React.FC = () => {
    const winner = useAppSelector((state) => state.winner);
    const onTurn = useAppSelector((state) => state.onTurn);
    const message = winner ? `${winner} wins!` : `it is now ${onTurn}'s turn`;

    return (
        <div className='app'>
            <Board />
            <p>{message}</p>
        </div>
    );
};

export default App;
