import React, { createContext, useContext, useEffect, useState } from 'react'
import { AppContext, apiUrl } from '../App';
import axios from 'axios';
import ChatPanel from './ChatPanel';

export const DashboardContext = createContext();

const Dashboard = () => {
    const { username } = useContext(AppContext);
    const [currentUser, setCurrentUser] = useState();
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState([]);

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
    <DashboardContext.Provider value={{ currentUser, chats, users }} >
        <div>
            <ChatPanel />
        </div>
    </DashboardContext.Provider>
  )
}

export default Dashboard