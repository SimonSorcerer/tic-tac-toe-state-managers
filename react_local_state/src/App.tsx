import { useState } from 'react';
import { Board } from './components/Board';
import { Piece } from './model';

const App: React.FC = () => {
    const [go, setGo] = useState<Piece>('circle');
    const [winningMessage, setWinningMessage] = useState<string>();

    const handleClick = (winner: Piece | undefined) => {
        if (winner) {
            setWinningMessage(`${winner} wins!`);
        } else {
            setGo((current) => (current === 'circle' ? 'cross' : 'circle'));
        }
    };

    const message = winningMessage || `it is now ${go}'s turn`;

    return (
        <div className='app'>
            <Board go={go} onClick={handleClick} />
            <p>{message}</p>
        </div>
    );
};

export default App;
