import { useAtomValue } from 'jotai';
import { Board } from './components/Board';
import { state } from './state/state.manager';

const App: React.FC = () => {
    const message = useAtomValue(state.messageAtom);

    return (
        <div className='app'>
            <Board />
            <p>{message}</p>
        </div>
    );
};

export default App;
