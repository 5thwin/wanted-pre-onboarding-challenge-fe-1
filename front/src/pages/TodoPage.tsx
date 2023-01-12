import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { TodoType } from '../types/TodoType';
import { AiOutlinePlus } from 'react-icons/ai';
import React, { useState, useRef, useCallback } from 'react';
import TodoItem from '../components/Todo/TodoItem';
import { createTodo, getTodos } from '../api/todo-api';
import TodoHeader from '../components/Todo/TodoHeader';
import withAuth from '../components/HOC/withAuth';
function TodoPage() {
	const [createMode, setCreateMode] = useState<boolean>(false);
	const titleRef = useRef<HTMLInputElement>(null);
	const contentRef = useRef<HTMLTextAreaElement>(null);
	const queryClient = useQueryClient();
	//Todo 읽어오기
	const {
		isLoading,
		data: todos,
		isError,
	} = useQuery<TodoType[], AxiosError>(
		['todo'],
		getTodos,
		{
			refetchOnWindowFocus: false,
			retry: 0,
			staleTime: 60 * 1000 * 60,
		},
	);
	/*Todo 생성하기*/
	const createMutation = useMutation(createTodo, {
		onSuccess: () => {
			queryClient.invalidateQueries(['todo']);
			setCreateMode(false);
		},
	});
	const handleCreate = useCallback((e: React.MouseEvent) => {
		e.preventDefault();
		if (!titleRef.current?.value) {
			alert('제목을 입력해주세요');
			return;
		}
		if (!contentRef.current?.value) {
			alert('내용을 입력해주세요');
			return;
		}
		createMutation.mutate({
			title: titleRef.current.value,
			content: contentRef.current.value
		})
	}, [createMutation]);
	if (isLoading) return <div>데이터를 불러오는 중입니다.</div>
	if (isError) return <div>데이터를 불러오는데 실패하였습니다.</div>
	return <div className='w-screen h-screen bg-gray-300 pt-10'>
		<div className='max-w-xl mx-auto rounded-lg bg-sky-100 py-4'>
			<TodoHeader/>
			{/* 서버에서 받아온 Todo 목록을 출력하는 부분 */}
			<ul className='flex flex-col  rounded-b-lg h-[60vh] overflow-y-auto mt-2 py-4'>
				{todos.map(todo => {
					return <TodoItem todo={todo} key={todo.id} />
				})}

			</ul>
			{!createMode && <div className='bg-white h-16 mx-6 my-1 rounded-lg'>
				<p className='text-3xl text-gray-400 w-full h-full flex justify-center items-center transition-colors hover:text-sky-400 cursor-pointer'
					onClick={() => { setCreateMode(true) }}>
					<AiOutlinePlus />
				</p>
			</div>}
			{
				createMode && <form className='bg-white mx-6 my-1 rounded-lg flex flex-col px-3 py-2'>
					<input placeholder='title' className='border-2 p-1 rounded-lg' ref={titleRef} />
					<textarea placeholder='content' className='border-2 p-1 rounded-lg resize-none mt-1' ref={contentRef} />
					<div className='flex justify-end mt-1'>
						<button className='px-4 py-1 rounded-lg border-sky-400 text-sky-400 border mr-1 font-medium'
							onClick={handleCreate}>
							추가</button>
						<button type='button' className='px-4 py-1 rounded-lg border-gray-400 text-gray-400 border font-medium'
							onClick={() => {
								setCreateMode(false);
							}}>취소</button>
					</div>
				</form>
			}
		</div >
	</div>
}
export default withAuth(TodoPage, true);
