import {
    Box,
    List,
} from '@material-ui/core';
import * as React from 'react';

import { useTodos } from '../../../hooks';
import { MainLayout } from '../../../ui/components/MainLayout';
import { t } from '../../../utils';
import { TodoListItem } from '../../../ui/components/TodoListItem';

export const TodoList: React.FC = () => {
    const { list: todos } = useTodos();
    const [expandedTodo, setExpandedTodo] = React.useState<number>(0);
    const isAtLeastOneTodoInProgress = todos.some(todo => todo.isInProgress);

    const handleTodoExpand = (id: number): void => {
        setExpandedTodo(expandedTodo === id ? 0 : id);
    }

    return (
        <MainLayout
            activeTab={'TODOS'}
            screenTitle={t('screens:todos')}
        >
            <Box component="div" paddingY={1}>
                <List>
                    {todos.map((todo) => (
                        <TodoListItem
                            isExpanded={todo.id === expandedTodo}
                            onExpand={() => handleTodoExpand(todo.id)}
                            todo={todo}
                            isAtLeastOneTodoInProgress={isAtLeastOneTodoInProgress}
                            key={todo.id} />
                    ))}
                </List>
            </Box>
        </MainLayout>
    )
}