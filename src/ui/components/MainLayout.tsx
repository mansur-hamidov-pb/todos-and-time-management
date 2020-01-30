import { 
    AppBar,
    BottomNavigation,
    BottomNavigationAction,
    Container,
    IconButton,
    Toolbar,
    Typography,
} from '@material-ui/core';
import {
    ArrowBack,
    ListAlt,
    Settings
} from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { routes } from '../../routes/consts';
import { t } from '../../utils';

interface IProps {
    activeTab: string;
    previousScreenPath?: string;
    screenTitle: string;
}

export const MainLayout: React.FC<IProps> = ({
    activeTab,
    children,
    previousScreenPath,
    screenTitle,
}) => {
    const history = useHistory()

    const navigateTo = (value: string) => {
        // @ts-ignore
        history.push(routes[value].path);
    }

    return (
        <>
            <AppBar position="static">
                {previousScreenPath && (
                    <IconButton onClick={() => history.push(previousScreenPath)}>
                        <ArrowBack/>
                    </IconButton>
                )}
				<Toolbar>
					<Typography variant="h6">{screenTitle}</Typography>
				</Toolbar>
			</AppBar>
            <Container>
                {children}
            </Container>
            <BottomNavigation value={activeTab} showLabels onChange={(_, value: string) => navigateTo(value)}>
                <BottomNavigationAction value={'TODOS'} label={t('screens:todos')} icon={<ListAlt/>} />
                <BottomNavigationAction value={'ADD_TODO'} label={t('screens:settings')} icon={<Settings/>} />
            </BottomNavigation>
        </>
    )
}
