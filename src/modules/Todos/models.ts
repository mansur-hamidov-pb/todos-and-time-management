import { ETodoAction } from './enums';

export interface ITodo {
    id: number;
    createdAt: string;
    name: string;
    accomplishTime: ITodoAccomplishTime[];
    isInProgress: boolean;
    doneTime?: string | null;
    weekDay: number;
}

export interface ITodoAccomplishTime {
    startTime: string;
    endTime?: string;
}

export interface ITodoAction {
    type: ETodoAction;
    payload?: any;
}