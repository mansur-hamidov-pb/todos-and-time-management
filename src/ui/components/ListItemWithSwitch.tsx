import {
    Divider,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Switch,
} from '@material-ui/core'
import * as React from 'react';

interface IProps {
    checked: boolean;
    onChange: () => void,
    title: string;
}

export const ListItemWithSwitch: React.FC<IProps> = ({
    checked,
    onChange,
    title,
}) => (
    <>
        <ListItem>
            <ListItemText primary={title}/>
            <ListItemSecondaryAction>
                <Switch onChange={onChange} checked={checked}/>
            </ListItemSecondaryAction>
        </ListItem>
        <Divider/>
    </>
)