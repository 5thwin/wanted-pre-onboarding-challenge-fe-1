import { useEffect, useState } from 'react';
import { getLocalStorage } from '../utils/localStorage';
export default function useCheckToken(){
  const [hasToken, setHasToken] = useState<boolean>(true);
  useEffect(()=>{
    const token = getLocalStorage('token');
    if(!token)
      setHasToken(false);
  },[hasToken])
  return {hasToken};
}
