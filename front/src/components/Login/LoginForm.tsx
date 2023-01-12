import { useRef } from 'react'
import { api } from '../../utils/customAxios';
import { useNavigate } from 'react-router-dom';
import { setLocalStorage, getLocalStorage } from '../../utils/localStorage';
import { AxiosError } from 'axios';
import { ErrorMessageType } from '../../types/ErrorType';

export default function LoginForm() {
	const navigate = useNavigate()
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const login = async () => {
		if (getLocalStorage('token')) {
			alert('이미 로그인 상태입니다.')
			navigate("/");
		}
		try {
			const res = await api.post('/users/login', { email: emailRef.current?.value, password: passwordRef.current?.value })
			if (res.status === 200) {
				setLocalStorage("token", res.data.token)
				alert(res.data.message);
				navigate("/");
			}
		} catch (error) {
			const err = error as AxiosError;
			const errMessage = err.response?.data as ErrorMessageType;
			if (err.response?.status=== 400) {
				alert(errMessage.details);
				return;
			}
		}


	}
	return <form action="" className='flex flex-col w-full items-center mt-10'>
		<input placeholder='email' ref={emailRef} className="input w-2/3 mt-2"></input>
		<input placeholder='password' type='password' ref={passwordRef} className="input w-2/3 mt-2"></input>
		<button className="button mt-3" onClick={(e) => { e.preventDefault(); login(); }}>Log In</button>
	</form>
}
