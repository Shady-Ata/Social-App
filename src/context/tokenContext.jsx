import {createContext, useEffect, useState} from 'react'
import { getuserData } from '../Api/auth/logedUser.api';

// statemanagement 
export let tokenContext = createContext();

export default function TokenContextProvider(props){

    const [token,setToken] = useState(null);
    const [userData,setUserData] = useState(null)

    async function getUserDataFn(){
      const res =await  getuserData();
      setUserData(res?.user)
    }

    useEffect(()=>{
         if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserDataFn()
         }
    },[])

    return <tokenContext.Provider value={{token,setToken,userData}}>
         {props.children}
    </tokenContext.Provider>

}

// break 8:15