import React, { createContext, useContext, useEffect, useState } from 'react'
import { AppContext, apiUrl } from '../App';
import axios from 'axios';
import ChatPanel from './ChatPanel';
import GroupChatViewer from './GroupChatViewer';
import PrivateChatViewer from './PrivateChatViewer';

export const DashboardContext = createContext();

const Dashboard = () => {
    const { username } = useContext(AppContext);
    const [currentUser, setCurrentUser] = useState();
    const [chats, setChats] = useState();
    const [users, setUsers] = useState();

    const [activeGroupChat, setActiveGroupChat] = useState();
    const [activePrivateChat, setActivePrivateChat] = useState();

    const fetchCurrentUser = async() => {
        await axios.get(`${apiUrl}/user/${username}`)
        .then(res=>{
            console.log(res.data);
            setCurrentUser(res.data);
        })
        .catch(err=>console.error(err));
    }

    const fetchAllUsers = async() => {
        await axios.get(`${apiUrl}/user`)
        .then(res=>{
            console.log(res.data);
            setUsers(res.data)
        })
        .catch(err=>console.error(err));
    }

    const fetchAllChats = async() => {
        await axios.get(`${apiUrl}/chat/`)
        .then(res=>{
            console.log(res.data);
            setChats(res.data);
        })
        .catch(err=>console.error(err));
    }

    useEffect(()=>{
        fetchCurrentUser();
        fetchAllUsers();
        fetchAllChats();
    },[]);

  return (
    <DashboardContext.Provider value={{ currentUser, chats, users, setActiveGroupChat, setActivePrivateChat }} >
        <div>
            <ChatPanel />
            {activeGroupChat?<GroupChatViewer chatInfo={activeGroupChat} />:null}
            {activePrivateChat?<PrivateChatViewer userInfo={activePrivateChat} />:null}
        </div>
    </DashboardContext.Provider>
  )
}

export default Dashboard