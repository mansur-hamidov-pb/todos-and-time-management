import { green, yellow } from '@material-ui/core/colors';
import {
    Divider,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    ListItemAvatar,
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
import { isTodoDone, calculateTodoDoneTime, isTodoInOverdue } from '../../modules/Todos/utils';

interface IProps {
    todo: ITodo;
    isAtLeastOneTodoInProgress: boolean;
}

export const TodoListItem: React.FC<IProps> = ({
    todo,
    isAtLeastOneTodoInProgress
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

    const renderTodoStatus = () => {
        return (
            <ListItemAvatar>
                <IconButton>
                    {isTodoInOverdue(todo) ? (
                        <HighlightOff color='error' onClick={() => toggleDone(todo.id)} />
                    ) : isTodoDone(todo) ? (
                        <CheckCircle style={{ color: green[500] }} onClick={() => toggleDone(todo.id)} />
                    ) : ((!isAtLeastOneTodoInProgress || todo.isInProgress) && (!todo.isInProgress || todo.isPaused)) ? (
                        <PlayCircleFilled color="primary" onClick={() => startTimer(todo.id)} />
                    ) : (todo.isInProgress && !todo.isPaused) ? (
                        <PauseCircleFilled onClick={() => pauseTimer(todo.id)}/>
                    ) : (
                        <Warning style={{ color: yellow[500] }} />
                    )}
                </IconButton>
            </ListItemAvatar>
        )
    }

    const renderTodoActions = () => {
        if (isTodoDone(todo)) {
            return (
                <>
                    <IconButton>
                        <CheckCircle style={{ color: green[500] }} />
                    </IconButton>
                    <IconButton onClick={() => removeTodo(todo.id)} style={{ paddingRight: '0'}}>
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
                    {todo.isInProgress && (
                        <IconButton onClick={() => stopTimer(todo.id)} style={{ paddingRight: '0'}}>
                            <Stop/>
                        </IconButton>
                    )}
                </>
            )
        }
    }

    return (
        <>
            <ListItem disableGutters>
                {renderTodoStatus()}
                <ListItemText primary={name} secondary={calculateTodoDoneTime(accomplishTime)}/>
                <ListItemSecondaryAction>
                    {renderTodoActions()}
                </ListItemSecondaryAction>
            </ListItem>
            <Divider/>
        </>
    )
    
}