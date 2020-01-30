import * as React from 'react';

import { ITodo } from '../models';
import { todosReducer, initialState } from '../reducer';

interface IContext {
    list: ITodo[];
    dispatch: (action: any) => void;
}

export const TodoContext = React.createContext<IContext>({} as IContext);

export const TodoProvider: React.FC = ({ children }) => {
    const initialTodos = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[];
    const [list, dispatchTodoAction] = React.useReducer(todosReducer, initialTodos || initialState);

    return (
        <TodoContext.Provider value={{list, dispatch: dispatchTodoAction}}>
            {children}
        </TodoContext.Provider>
    )
}