import React, { useContext } from 'react'
import { DashboardContext } from './Dashboard'

const ChatPanel = () => {
    const { chats, users } = useContext(DashboardContext);

  return (
    <div>
        <h2>Groups</h2>
        {chats?.map(chat=>(chat.isGroupChat?<div key={chat._id}>{chat.chatName}</div>:null))}
        <h2>Users</h2>
        {users?.map(user=><div key={user._id}>{user.username}</div>)}
    </div>
  )
}

export default ChatPanel