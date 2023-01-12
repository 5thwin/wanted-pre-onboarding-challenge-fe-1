import { Route, Routes, useNavigate } from 'react-router-dom';
import JoinForm from '../components/Join/JoinForm';
import LoginForm from '../components/Login/LoginForm';

export default function LoginJoin() {
	const navigator = useNavigate();
	return <div className='w-screen'>
		<div className="container">
		<div className='flex w-full  mx-auto justify-center mt-24'>
			<p className="text-center cursor-pointer w-56 text-sky-400 font-extrabold" onClick={() => navigator('/auth/login')}>로그인</p>
			<p className="text-center cursor-pointer w-56 text-sky-400 font-extrabold" onClick={() => navigator('/auth/join')}>회원가입</p>
		</div>
		<Routes>
			<Route path='login' element={<LoginForm />} />
			<Route path='join' element={<JoinForm />} />
		</Routes>
		</div>
	</div>
}
