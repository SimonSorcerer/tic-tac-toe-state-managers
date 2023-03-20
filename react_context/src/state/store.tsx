import { createContext, ReactNode, useContext, useReducer } from 'react';
import type { Action, Dispatch, State } from '../model';
import { initialCells, initialTurn } from './defaults';
import { storeReducer } from './reducer';

let initialState: State = {
    cells: initialCells,
    onTurn: initialTurn,
    winner: undefined,
};

export const StoreContext = createContext<
    { state: State; dispatch: Dispatch } | undefined
>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(storeReducer, initialState);
    const value = { state, dispatch };

    return (
        <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    );
};

export const useStore = () => {
    const context = useContext(StoreContext);

    if (!context) {
        throw new Error(
            'useStore can be only used in components wrapped by StoreProvider'
        );
    }

    return context;
};

export const actions = {
    setCell: (payload: number): Action => ({ type: 'setCell', payload }),
};
