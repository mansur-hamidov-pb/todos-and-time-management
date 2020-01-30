export interface ITodo {
    id: number;
    createdAt: string;
    name: string;
    accomplishTime: ITodoAccomplishTime[];
    isInProgress: boolean;
    isPaused: boolean;
    doneTime?: string | null;
    weekDay: number;
}

export interface ITodoAccomplishTime {
    startTime: string;
    endTime?: string;
}
