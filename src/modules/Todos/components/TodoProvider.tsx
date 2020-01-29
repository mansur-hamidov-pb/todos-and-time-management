import * as React from 'react';

import { ITodo, ITodoAction } from '../models';
import { todosReducer, initialState } from '../reducer';
import { ETodoAction } from '../enums';

interface IContext {
    todos: ITodo[];
    dispatch: ({type, payload}: {type: ETodoAction, payload?: any}) => void;
}

export const TodoContext = React.createContext<IContext>({} as IContext);

export const TodoProvider: React.FC = ({ children }) => {
    const [todos, dispatchTodoAction] = React.useReducer(todosReducer, initialState);

    return (
        <TodoContext.Provider value={{todos, dispatch: dispatchTodoAction}}>
            {children}
        </TodoContext.Provider>
    )
}