import { green } from '@material-ui/core/colors';
import {
    Divider,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    ListItemAvatar,
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    Box,
} from '@material-ui/core';
import {
    AlarmOff,
    AlarmOn,
    Cancel,
    CheckCircle,
    Delete,
    ExpandMore,
    PlayCircleFilled,
    PauseCircleFilled,
    Stop,
} from '@material-ui/icons'

import * as React from 'react';
import { ITodo } from '../../modules/Todos/models';
import { useTodos } from '../../hooks';
import { isTodoDone, calculateTodoDoneTime, isTodoInOverdue, shouldToDoBeDoneToday } from '../../modules/Todos/utils';

interface IProps {
    todo: ITodo;
    isExpanded: boolean;
    onExpand?: () => void;
    isAtLeastOneTodoInProgress: boolean;
}

export const TodoListItem: React.FC<IProps> = ({
    todo,
    isAtLeastOneTodoInProgress,
    onExpand,
    isExpanded
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
            isTodoInOverdue(todo) ? (
                <IconButton onClick={() => toggleDone(todo.id)}>
                    <Cancel color='error' />
                </IconButton>
            ) : isTodoDone(todo) ? (
                <IconButton onClick={() => toggleDone(todo.id)}>
                    <CheckCircle style={{ color: green[500] }} />
                </IconButton>
            ) : shouldToDoBeDoneToday(todo) ? (
                <IconButton onClick={() => toggleDone(todo.id)}>
                    <AlarmOn color="primary" />
                </IconButton>
            ) : (
                <IconButton>
                    <AlarmOff color="action"/>
                </IconButton>
            )
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
        <ExpansionPanel onClick={undefined} expanded={isExpanded}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMore onClick={onExpand}/>}
                style={{ paddingLeft: '10px' }}
                
            >
                {renderTodoStatus()}
                <Box onClick={onExpand}>
                   
                    <Typography variant="subtitle1" display="block" component="div">{name}</Typography>
                    <Typography variant="subtitle2" color="textSecondary" component="div">{calculateTodoDoneTime(accomplishTime)}</Typography>
                    {/* <ListItemSecondaryAction>
                        {renderTodoActions()}
                    </ListItemSecondaryAction> */}
                </Box>
                
            </ExpansionPanelSummary>
        </ExpansionPanel>
    )
    
}