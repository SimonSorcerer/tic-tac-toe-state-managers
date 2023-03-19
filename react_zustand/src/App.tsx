import { Board } from './components/Board';
import { useStore } from './state/store';
import { shallow } from 'zustand/shallow';

const App: React.FC = () => {
    const [getWinner, onTurn] = useStore(
        (state) => [state.getWinner, state.onTurn],
        shallow
    );

    const winner = getWinner();
    const message = winner ? `${winner} wins!` : `it is now ${onTurn}'s turn`;

    return (
        <div className='app'>
            <Board />
            <p>{message}</p>
        </div>
    );
};

export default App;
