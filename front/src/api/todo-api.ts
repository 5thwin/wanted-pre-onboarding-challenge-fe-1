import { NewTodoType, UpdateTodoType } from '../types/TodoType';
import { api } from '../utils/customAxios';

export const getTodos = async () => {
	try {
		const res = await api.get('/todos');
		return res.data.data;
	} catch (error) {
		console.error(error);
	}
};
export const createTodo = async (newTodo: NewTodoType) => {
	try {
		const res = await api.post('/todos', newTodo);
		return res.data;
	} catch (error) {
		console.error(error);
	}
};
export const deleteTodo = async (id: string) => {
	try {
		const res = await api.delete(`/todos/${id}`);
		return res.data;
	} catch (error) {
		console.error(error);
	}
};
export const updateTodo = async (updateTodo: UpdateTodoType) => {
	try {
		const res = await api.put(`/todos/${updateTodo.id}`, updateTodo);
		return res.data;
	} catch (error) {
		console.error(error);
	}
};
