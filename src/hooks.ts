import { useContext } from 'react';

import { TodoContext } from './modules/Todos/components/TodoProvider';

export function useTodos () {
    return useContext(TodoContext)
}
