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
            <AppBar position="fixed">
                {previousScreenPath && (
                    <IconButton onClick={() => history.push(previousScreenPath)}>
                        <ArrowBack/>
                    </IconButton>
                )}
				<Toolbar>
					<Typography variant="h6">{screenTitle}</Typography>
				</Toolbar>
			</AppBar>
            <Container style={{ paddingBottom: '60px', paddingTop: '60px' }}>
                {children}
            </Container>
            <AppBar position="fixed" style={{ top: 'auto', bottom: '0' }}>
                <BottomNavigation value={activeTab} showLabels onChange={(_, value: string) => navigateTo(value)}>
                    <BottomNavigationAction value={'TODOS'} label={t('screens:todos')} icon={<ListAlt/>} />
                    <BottomNavigationAction value={'ADD_TODO'} label={t('screens:settings')} icon={<Settings/>} />
                </BottomNavigation>
            </AppBar>
            
        </>
    )
}
