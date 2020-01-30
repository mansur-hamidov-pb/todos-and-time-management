import React from 'react';

import { TodoProvider } from './modules/Todos/components/TodoProvider';
import { AppRouter } from './routes';

import 'typeface-roboto';
import './App.css';

const App: React.FC = () => {
	return (
		<TodoProvider>
			<AppRouter/>
		</TodoProvider>
	);
}

export default App;
