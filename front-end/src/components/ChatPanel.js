import React, { useContext } from 'react'
import { DashboardContext } from './Dashboard'

const ChatPanel = () => {
    const { chats, users, setActiveGroupChat, setActivePrivateChat } = useContext(DashboardContext);

    const handleGroupChat = (chat) => {
        setActivePrivateChat(null);
        setActiveGroupChat(chat);
    }

    const handlePrivateChat = (user) => {
        setActiveGroupChat(null);
        setActivePrivateChat(user);
    }

  return (
    <div>
        <h2>Groups</h2>
        {chats?.map(chat=>(chat.isGroupChat?<div onClick={()=>{handleGroupChat(chat)}} key={chat._id}>{chat.chatName}</div>:null))}
        <h2>Users</h2>
        {users?.map(user=><div onClick={()=>handlePrivateChat(user)} key={user._id}>{user.username}</div>)}
    </div>
  )
}

export default ChatPanel