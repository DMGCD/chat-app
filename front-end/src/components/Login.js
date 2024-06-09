import React, { useContext, useRef } from 'react'
import { AppContext } from '../App';

const Login = () => {

    const { socket, setIsLogged, setUsername } = useContext(AppContext);

    const usernameRef = useRef();

    const login = () => {
        const username = usernameRef.current.value;
        if (username !== ""){
            socket.emit("registerUser", { username });
            setUsername(username);
            setTimeout(() => {
                setIsLogged(true);
            }, 500);
        }
    }

  return (
    <div className='w-full h-screen flex items-center justify-center flex-col gap-4'>
        <input ref={usernameRef} type='text' placeholder='Username' autoFocus className=' w-72 border-2 border-black px-8 py-2 text-center text-xl' />
        <button className='bg-black text-white font-bold w-72 border-2 border-black text-xl py-2 uppercase duration-200 transition-all hover:text-black hover:bg-white' onClick={login}>Login</button>
    </div>
  )
}

export default Login