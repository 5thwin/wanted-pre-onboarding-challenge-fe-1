import { TodoType } from '../../types/TodoType'
import { useCallback, useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '../../api/todo-api';
import UpdateForm from './UpdateForm';
interface TodoItemProps {
	todo: TodoType;
}

export default function TodoItem({ todo }: TodoItemProps) {
	const queryClient = useQueryClient();
	const [showContent, setShowContent] = useState<boolean>(false);
	const [showUpdate, setShowUpdate] = useState<boolean>(false);
	/*Todo 삭제하기*/
	const deleteMutation = useMutation(deleteTodo, {
		onSuccess: () => {
			queryClient.invalidateQueries(['todo']);
		},
	});
	const handleDelete = useCallback((e: React.MouseEvent) => {
		deleteMutation.mutate(todo.id);
	}, [])
	if (showUpdate) return <UpdateForm todo={todo} toggleState={setShowUpdate} />
	return <li className='bg-white mx-6 my-1 rounded-lg text-zinc-700'>
		<div className='flex items-center px-4 py-2 justify-between'>
			<p className='font-bold hover:text-sky-400 cursor-pointer hover:scale-110 transition-all' onClick={() => { setShowContent(!showContent) }}>{todo.title}</p>
			<div className=' text-zinc-500'>
				<button className='hover:text-sky-400 mr-1' onClick={() => { setShowUpdate(true) }} >
					<FaEdit size={24} />
				</button>
				<button className='hover:text-sky-400 mr-1' onClick={handleDelete} >
					<BsFillTrashFill size={24} />
				</button>
			</div>
		</div>
		{showContent && <div className='px-4 py-2 text-neutral-600'> <p>{todo.content}</p></div>}
	</li>
}
