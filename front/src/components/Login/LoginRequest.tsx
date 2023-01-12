import { Link } from 'react-router-dom';

export function LoginRequest(){
  return <div>
    <div className='max-w-xl mx-auto flex flex-col items-center'>
    <p className=' text-center font-bold text-xl mt-10'>로그인이 필요한 페이지입니다.</p>
    <Link to={'/auth/login'} className='bg-sky-100 rounded-md p-2 mt-4'>로그인</Link>
    </div>
  </div>
}
