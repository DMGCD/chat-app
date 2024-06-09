import React, { useContext, useEffect, useRef } from 'react'
import { DashboardContext } from './Dashboard'
import { AppContext } from '../App';

const ChatPanel = () => {
    const { socket } = useContext(AppContext);
    const { chats, users, setActiveGroupChat, setActivePrivateChat, currentUser, setChats, fetchAllChats, fetchAllUsers } = useContext(DashboardContext);
    const roomNameRef = useRef();

    const handleGroupChat = (chat) => {
        setActivePrivateChat(null);
        setActiveGroupChat(null);
        setActiveGroupChat(chat);
    }

    const handlePrivateChat = (user) => {
        setActiveGroupChat(null);
        setActivePrivateChat(null);
        setActivePrivateChat(user);
    }

    const createRoom = () => {
        const roomName = roomNameRef.current.value;
        if (roomName !== ""){
            socket.emit("joinRoom", roomName);
            setTimeout(() => {
                fetchAllChats();
            }, 1000);
        }
    }

    useEffect(()=>{
        socket.on("newRooms",({chatId, roomName})=>{
            fetchAllChats();
        })
    },[socket]);

  return (
    <div>
        <h2>Users</h2>
        {users?.map(user=>(user._id!==currentUser._id)?<div onClick={()=>handlePrivateChat(user)} key={user._id}>{user.username}</div>:null)}
        <h2>Groups</h2>
        {chats?.map(chat=>(chat.isGroupChat?<div onClick={()=>{handleGroupChat(chat)}} key={chat._id}>{chat.chatName}</div>:null))}
        <div>
            <input type='text' ref={roomNameRef} />
            <button onClick={createRoom}>Create Room</button>
        </div>
    </div>
  )
}

export default ChatPanel