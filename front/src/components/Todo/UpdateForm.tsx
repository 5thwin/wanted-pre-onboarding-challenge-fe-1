import { TodoType } from '../../types/TodoType';
import { useRef, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '../../api/todo-api';

interface UpdateFormProps {
	todo: TodoType;
	toggleState: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function UpdateForm({ todo, toggleState }: UpdateFormProps) {
	const queryClient = useQueryClient();
	const titleRef = useRef<HTMLInputElement>(null);
	const contentRef = useRef<HTMLTextAreaElement>(null);
	/*Todo 수정하기*/
	const updateMutation = useMutation(updateTodo, {
		onSuccess: () => {
			queryClient.invalidateQueries(['todo']);
			toggleState(false);
		},
	});
	const handleUpdate = useCallback((e: React.MouseEvent) => {
		e.preventDefault();
		if (!titleRef.current?.value) {
			alert('제목을 입력해주세요');
			return;
		}
		if (!contentRef.current?.value) {
			alert('내용을 입력해주세요');
			return;
		}
		updateMutation.mutate({
			id: todo.id,
			title: titleRef.current.value,
			content: contentRef.current.value
		})
	}, [todo, updateMutation]);
	return <li className='bg-white mx-6 my-1 rounded-lg text-zinc-800'>
		<form className='bg-white my-1 rounded-lg flex flex-col px-3 py-2'>
			<input defaultValue={todo.title} className='border-2 p-1 rounded-lg' ref={titleRef} />
			<textarea defaultValue={todo.content} className='border-2 p-1 rounded-lg resize-none mt-1' ref={contentRef} />
			<div className='flex justify-end mt-1'>
				<button className='px-4 py-1 rounded-lg border-sky-400 text-sky-400 border mr-1 font-medium'
					onClick={handleUpdate}>
					수정</button>
				<button type='button' className='px-4 py-1 rounded-lg border-gray-400 text-gray-400 border font-medium'
					onClick={() => {
						toggleState(false);
					}}>취소</button>
			</div>
		</form>
	</li>
}
