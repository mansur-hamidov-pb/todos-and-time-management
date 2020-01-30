import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { routes } from './consts';

import { AddTodo } from '../modules/Todos/components/AddTodo';

export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route
                    {...routes.TODOS}
                    render={() => <AddTodo/>}
                    exact
                />
                <Route
                    {...routes.ADD_TODO}
                    render={() => <AddTodo/>}
                    exact
                />
            </Switch>
        </Router>
    )
}