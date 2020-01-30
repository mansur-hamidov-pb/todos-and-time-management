import {
    Box, Button, TextField, List, Grid, Container
} from '@material-ui/core';
import moment from 'moment';

import * as React from 'react';
import { useTodos } from '../../../hooks';
import { ListItemWithSwitch } from '../../../ui/components/ListItemWithSwitch';

export const AddTodo: React.FC = () => {
    const [todoName, setTodoName] = React.useState('');
    const [todoDays, setTodoDays] = React.useState<number[]>([]);
    const { addTodo } = useTodos();

    const isFormValid = () => {
        return Boolean(todoName && todoDays.length);
    }
    
    const handleDaySet = (value: number) => () => {
        setTodoDays(
            todoDays.includes(value) ? todoDays.filter(day => day !== value) : [...todoDays, value].sort()
        )
    }

    const handleTodoNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoName(e.target.value)
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid) return;
        todoDays.forEach((weekDay) => addTodo({
            name: todoName,
            weekDay
        }));
        setTodoName('');
        setTodoDays([]);
    }

    return (
        <Box component="div" paddingY={1}>
            <form onSubmit={handleFormSubmit}>
                <TextField
                    label={"Todo name"}
                    variant="outlined"
                    value={todoName}
                    onChange={handleTodoNameChange}
                    fullWidth
                    size="small"
                />
                <Grid container>
                    <Grid item xs={12}>
                        <List>
                            {[1, 2, 3, 4, 5, 6, 7].map((item) => {
                                return (
                                    <ListItemWithSwitch
                                        key={item}
                                        title={moment().isoWeekday(item).calendar()}
                                        onChange={handleDaySet(item)}
                                        checked={todoDays.includes(item)}
                                    />
                                )
                            })}
                        </List>
                        <Button fullWidth variant="contained" color="primary" type="submit" disabled={!isFormValid()}>
                            add todo
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}