import { ITodo } from './models';
import { ETodoAction } from './enums';

type TodoId = ITodo['id'];

export const addTodo = (payload: Partial<ITodo>) => ({
    type: ETodoAction.ADD_TODO, payload
});

export const startTimer = (id: TodoId) => ({
    type: ETodoAction.START_TIMER, payload: { id }
}); 

export const pauseTimer = (id: TodoId) => ({
    type: ETodoAction.PAUSE_TIMER, payload: { id }
});

export const stopTimer = (id: TodoId) => ({
    type: ETodoAction.STOP_TIMER, payload: { id }
});

export const removeTodo = (id: TodoId) => ({
    type: ETodoAction.REMOVE_TODO, payload: { id }
});

export const toggleDone = (id: TodoId) => ({
    type: ETodoAction.TOGGLE_DONE, payload: { id }
});
