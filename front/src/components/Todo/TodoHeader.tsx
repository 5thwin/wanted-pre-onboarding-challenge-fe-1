import { removeLocalStorage } from '../../utils/localStorage'
import { useNavigate } from 'react-router-dom';

export default function TodoHeader(){
  const navigate = useNavigate();
  return <div>
    <p className='w-full text-center font-extrabold text-sky-400 text-3xl py-4 select-none'>Todo List</p>
    <div className='w-full flex justify-end'>
      <button className='button mr-2'
        onClick={()=>{
          removeLocalStorage('token');
          navigate('/')
        }}>로그아웃</button>
    </div>
  </div>
}
