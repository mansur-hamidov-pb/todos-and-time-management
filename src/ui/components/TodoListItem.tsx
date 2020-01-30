import { green, yellow } from '@material-ui/core/colors';
import {
    Divider,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
} from '@material-ui/core';
import {
    CheckCircle,
    Delete,
    HighlightOff,
    PlayCircleFilled,
    Warning,
    PauseCircleFilled,
    Stop,
} from '@material-ui/icons'

import * as React from 'react';
import { ITodo } from '../../modules/Todos/models';
import { useTodos } from '../../hooks';
import { isTodoDone, calculateTodoDoneTime } from '../../modules/Todos/utils';
import moment from 'moment';

interface IProps {
    todo: ITodo;
}

export const TodoListItem: React.FC<IProps> = ({
    todo,
}) => {
    const {
        startTimer,
        pauseTimer,
        stopTimer,
        toggleDone,
        removeTodo
    } = useTodos();
    const {
        accomplishTime,
        name,
        weekDay
    } = todo;

    const renderTodoActions = () => {
        if (isTodoDone(todo)) {
            return (
                <>
                    <IconButton>
                        <CheckCircle style={{ color: green[500] }} />
                    </IconButton>
                    <IconButton onClick={() => removeTodo(todo.id)}>
                        <Delete color="error" />
                    </IconButton>
                </>
            )
        } else {
            return (
                <>
                    <IconButton onClick={() => removeTodo(todo.id)}>
                        <Delete color="error" />
                    </IconButton>
                    <IconButton onClick={() => toggleDone(todo.id)}>
                        {Number(weekDay) >= Number(moment().format('E')) ? (
                            <Warning style={{ color: yellow[500]}}/>
                        ) : (
                            <HighlightOff color="error"/>
                        )}
                    </IconButton>
                    {(!todo.isInProgress || todo.isPaused) && (
                        <IconButton onClick={() => startTimer(todo.id)}>
                            <PlayCircleFilled color="primary"/>
                        </IconButton>
                    )}
                    {(todo.isInProgress && !todo.isPaused) && (
                        <IconButton onClick={() => pauseTimer(todo.id)}>
                            <PauseCircleFilled />
                        </IconButton>
                    )}
                    {todo.isInProgress && (
                        <IconButton onClick={() => stopTimer(todo.id)}>
                            <Stop/>
                        </IconButton>
                    )}
                </>
            )
        }
    }

    return (
        <>
            <ListItem>
                <ListItemText primary={name} secondary={calculateTodoDoneTime(accomplishTime)}/>
                <ListItemSecondaryAction>
                    {renderTodoActions()}
                </ListItemSecondaryAction>
            </ListItem>
            <Divider/>
        </>
    )
    
}