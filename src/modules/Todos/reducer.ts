import moment from 'moment';

import { ETodoAction } from './enums';
import { ITodo } from './models';
import { isTodoDone } from './utils';

import { getNewRecordId } from '../../utils';

export const initialState: ITodo[] = [];

export const todosReducer = (state: ITodo[] = initialState, action: any): ITodo[] => {
    const currentDate = moment();
    const currentTime = currentDate.format('x');

    switch (action.type) {
        case ETodoAction.ADD_TODO:
            return [
                ...state,
                {
                    ...action.payload,
                    id: getNewRecordId(state),
                    createdAt: currentDate.format(),
                    accomplishTime: [],
                    isInProgress: false
                }
            ];
        case ETodoAction.TOGGLE_DONE:
            return state.map(todo => {
                return todo.id === action.payload.id ? todo : {
                    ...todo,
                    doneTime: isTodoDone(todo) ? currentTime : null
                }
            });
        case ETodoAction.REMOVE_TODO:
            return state.filter(todo => todo.id !== action.payload.id);
        case ETodoAction.START_TIMER:
            return state.map(todo => {
                return todo.id === action.payload.id ? todo : {
                    ...todo,
                    isInProgress: true,
                    accomplishTime: todo.accomplishTime ? [
                        ...todo.accomplishTime,
                        {
                            startTime: currentTime
                        }
                    ] : [{ startTime: currentTime }]
                };
            });
        case ETodoAction.PAUSE_TIMER:
            return state.map(todo => {
                return todo.id === action.payload.id ? todo : {
                    ...todo,
                    accomplishTime: [
                        ...todo.accomplishTime.slice(0, -1),
                        {
                            startTime: todo.accomplishTime[todo.accomplishTime.length - 1].startTime,
                            endTime: currentTime
                        }
                    ]
                };
            });
        case ETodoAction.STOP_TIMER:
                return state.map(todo => {
                    return todo.id === action.payload.id ? todo : {
                        ...todo,
                        doneTime: currentTime,
                        accomplishTime: [
                            ...todo.accomplishTime.slice(0, -1),
                            {
                                startTime: todo.accomplishTime[todo.accomplishTime.length - 1].startTime,
                                endTime: todo.accomplishTime[todo.accomplishTime.length - 1].endTime || currentTime
                            }
                        ]
                    };
                });
        default: return state;
    }
}
