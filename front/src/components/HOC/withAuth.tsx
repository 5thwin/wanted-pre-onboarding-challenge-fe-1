import { ComponentType, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../../utils/localStorage';
import { LoginRequest } from '../Login/LoginRequest';

export default function withAuth(Component : ComponentType, isRequiredAuth : boolean){
  return function AuthCheck(props: {}){
    const navigate = useNavigate()
    useEffect(()=>{
      const token = getLocalStorage('token');
      // Auth Branch
      if (!token){
        //not logined and login required
        if(isRequiredAuth){
          alert("로그인이 필요한 서비스입니다. 로그인으로 이동합니다.");
          navigate("/auth/login")
        }
      }
    },[])
    return <Component {...props}/>;
  }
}
