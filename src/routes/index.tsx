import * as React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { routes } from './consts';

import { AddTodo } from '../modules/Todos/components/AddTodo';
import { TodoList } from '../modules/Todos/components/TodoList';

export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route
                    {...routes.TODOS}
                    render={() => <TodoList/>}
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