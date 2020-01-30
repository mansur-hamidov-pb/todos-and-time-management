import { useContext, useEffect } from 'react';

import * as todos from './modules/Todos/actions';
import { TodoContext } from './modules/Todos/components/TodoProvider';
import { ITodo } from './modules/Todos/models';

export function useTodos () {
    const { list, dispatch } = useContext(TodoContext);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(list));
    }, [list]);

    return {
        list,
        addTodo: (payload: Partial<ITodo>) => dispatch(todos.addTodo(payload)),
        removeTodo: (id: ITodo['id']) => dispatch(todos.removeTodo(id)),
        startTimer: (id: ITodo['id']) => dispatch(todos.startTimer(id)),
        pauseTimer: (id: ITodo['id']) => dispatch(todos.pauseTimer(id)),
        stopTimer: (id: ITodo['id']) => dispatch(todos.stopTimer(id)),
        toggleDone: (id: ITodo['id']) => dispatch(todos.toggleDone(id))
    }
}
