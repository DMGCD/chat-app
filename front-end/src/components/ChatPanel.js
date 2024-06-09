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
    <div className='w-1/3'>
        <h2 className='text-center bg-blue-950 text-white text-3xl py-4 '>Users</h2>
        <div className='flex flex-col overflow-y-auto h-1/3 scroll-my-64'>{users?.map(user=>(user._id!==currentUser._id)?<div className='py-3 uppercase hover:bg-black hover:text-white transition-all duration-200 px-5 text-center' onClick={()=>handlePrivateChat(user)} key={user._id}>{user.username}</div>:null)}</div>
        <h2 className='text-center bg-blue-950 text-white text-3xl py-4 '>Groups</h2>
        <div className='flex flex-col overflow-y-auto h-1/4'>{chats?.map(chat=>(chat.isGroupChat?<div className='py-3 uppercase hover:bg-black hover:text-white transition-all duration-200 px-5 text-center' onClick={()=>{handleGroupChat(chat)}} key={chat._id}>{chat.chatName}</div>:null))}</div>
        <div className='flex flex-col gap-3'>
            <input type='text' ref={roomNameRef} className='border-2 border-black py-2 px-10 text-lg text-center' placeholder='Group Name' />
            <button className='w-full py-3 text-lg border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-all duration-200' onClick={createRoom}>Create Group</button>
        </div>
    </div>
  )
}

export default ChatPanel