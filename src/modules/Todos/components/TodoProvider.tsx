import * as React from 'react';

import { ITodo } from '../models';

import { todosReducer, initialState } from '../reducer';

interface IContext {
    todos: ITodo[];
    dispatch: (action: any) => void;
}

export const TodoContext = React.createContext<IContext>({} as IContext);

export const TodoProvider: React.FC = ({ children }) => {
    const initialTodos = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[];
    const [todos, dispatchTodoAction] = React.useReducer(todosReducer, initialTodos || initialState);

    React.useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    return (
        <TodoContext.Provider value={{todos, dispatch: dispatchTodoAction}}>
            {children}
        </TodoContext.Provider>
    )
}