export type TodoType = {
	title: string;
	content: string;
	id: string;
	createdAt: string;
	updatedAt: string;
}
export type NewTodoType = {
	title: string;
	content: string;
}

export type UpdateTodoType = {
	id: string;
	title: string;
	content: string;
}
