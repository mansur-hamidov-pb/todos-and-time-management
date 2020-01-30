import React from 'react';
import logo from './logo.svg';
import 'typeface-roboto';
import './App.css';
import { TodoProvider } from './modules/Todos/components/TodoProvider';
import { AddTodo } from './modules/Todos/components/AddTodo';
import { Container, AppBar, Toolbar, Typography } from '@material-ui/core';

const App: React.FC = () => {
	return (
		<TodoProvider>
			<AppBar position="static">
			<Toolbar>
				<Typography variant="h6">
				News
				</Typography>
			</Toolbar>
			</AppBar>
			<Container>
				<AddTodo />
			</Container>
		</TodoProvider>

	);
}

export default App;
