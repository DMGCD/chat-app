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
            setIsLogged(true);
        }
    }

  return (
    <div>
        <input ref={usernameRef} type='text' placeholder='Username' autoFocus />
        <button onClick={login}>Login</button>
    </div>
  )
}

export default Login