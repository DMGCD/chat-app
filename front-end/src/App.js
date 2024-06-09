import { createContext, useEffect, useRef, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const socket = io.connect("http://localhost:8080");

export const AppContext = createContext();
export const apiUrl = "http://localhost:8080/api";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");

  // const register = () => {
  //   const username = usernameRef.current.value;
  //   if (username !== ''){
  //     socket.emit("registerUser", {username});
  //     setIsRegistered(true);
  //   }
  // }

  // const sendMessage = () => {
  //   const receiverUsername = receiverRef.current.value;
  //   const msgContent = messageRef.current.value;
  //   if (receiverUsername!=='' && msgContent!=='')
  //     socket.emit("privateMsg", {receiverUsername:receiverRef.current.value, msgContent:messageRef.current.value});
  // }

  // const sendGroupMessage = () => {
  //   const roomName = roomNameRef.current.value;
  //   const content = groupMessageRef.current.value;
  //   if(roomName!=='' && content !== '')
  //     socket.emit("groupMessage",{roomName, content});
  // }

  // const joinRoom = () => {
  //   const roomName = roomNameRef.current.value;
  //   if(roomName!=='')
  //     socket.emit('joinRoom',roomName);
  // }

  // useEffect(()=>{
  //   socket.on("receivePrivateMsg", (data)=>{
  //     console.log("private message",data);
  //   })

  //   socket.on("receiveGroupMessage", (data)=>{
  //     console.log(data);
  //   })

  //   socket.on("error",data => {
  //     console.log(data);
  //   })

  // },[socket]);

  return (
    <AppContext.Provider value={{ socket, setIsLogged, username, setUsername }}>
      {!isLogged? <Login />:<Dashboard />}
    </AppContext.Provider>
  );
}

export default App;
