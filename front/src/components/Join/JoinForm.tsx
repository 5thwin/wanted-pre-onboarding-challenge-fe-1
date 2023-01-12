import { useRef } from 'react';
import { api } from '../../utils/customAxios';
import { setLocalStorage } from '../../utils/localStorage';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export default function JoinForm() {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate()
	const signUp = async () => {
		try {
			const res = await api.post('/users/create', { email: emailRef.current?.value, password: passwordRef.current?.value })
			if (res.status === 200) {
				alert(res.data.message);
				setLocalStorage('token', res.data.token);
				navigate("/");
			}
		} catch (error) {
			const err = error as AxiosError;
			if (err.response?.status === 409) {
				alert("이미 가입된 이메일입니다.");
				return;
			}
			if (err.response?.status === 400) {
				alert("유효하지 않은 이메일 혹은 비밀번호입니다.");
				return;
			}
		}
	}
	return <form action="" className='flex flex-col w-full items-center mt-10'>
		<input placeholder='email' ref={emailRef} className="input w-2/3 mt-2"></input>
		<input placeholder='password' type="password" ref={passwordRef} className="input w-2/3 mt-2"></input>
		<button className="button mt-3" onClick={e => { e.preventDefault(); signUp(); }}>Join</button>
	</form>
}
