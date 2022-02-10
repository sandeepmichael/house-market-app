import {useState, useEffect, useRef} from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useAuthStatus = () => {
    const [loggedin, setLoggedIn] = useState(false)
    const [checkingstatus, setCheckingStatus] = useState(true)
    const isMounted = useRef(true)

  useEffect(() => {
      if(isMounted){
        const auth = getAuth()
        onAuthStateChanged(auth, user => {
            if(user){
                setLoggedIn(true)
            }
            setCheckingStatus(false)
        })
  
      }
      return () => {
          isMounted.current = false
      }
  
  }, [isMounted])


  return {loggedin, checkingstatus}
}


