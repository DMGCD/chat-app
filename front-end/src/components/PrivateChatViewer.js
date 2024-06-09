import React, { useContext, useEffect, useRef, useState } from 'react'
import { DashboardContext } from './Dashboard';
import OwnMessage from './OwnMessage';
import OthersMessage from './OthersMessage';
import axios from 'axios';
import { AppContext, apiUrl } from '../App';

const PrivateChatViewer = ({userInfo}) => {

    const { socket } = useContext(AppContext);

    const { currentUser } = useContext(DashboardContext);
    const [messages, setMessages] = useState([]);

    const messageRef = useRef();

    const sendMessage = () => {
        const messageToSend = messageRef.current.value;
        if (messageToSend !== ""){
            socket.emit("privateMsg", {receiverUsername: userInfo.username, content: messageToSend})
            setMessages(prevMsg=>[...prevMsg,{_id:prevMsg.length, sender:currentUser._id, content:messageToSend}])
        }
    }

    console.log(userInfo);

    const fetchChatDetails = async() => {
        await axios.get(`${apiUrl}/chat/private-chat?username1=${currentUser.username}&username2=${userInfo.username}`)
        .then(res=>{
            if (res.data!== null)
                fetchMessages(res.data._id);
            else
                fetchMessages(null);
        })
        .catch(err=>console.error(err));
    }

    const fetchMessages = async(chatId) => {
        if (chatId===null)
            setMessages([]);
        else {
            await axios.get(`${apiUrl}/message/${chatId}`)
            .then(res=>setMessages(res.data))
            .catch(err=>console.error(err));
        }
    }

    // add usestate when mounting the component to fetch all the messages from the database

    useEffect(()=>{
        socket.on("receivePrivateMsg", ({sender, content})=>{
            setMessages(prevMsg=>[...prevMsg,{_id:prevMsg.length, sender, content}]);
        });
    },[socket]);

    useEffect(()=>{
        fetchChatDetails();
    },[userInfo])

    useEffect(()=>{
        console.log("private chat mounted")
    },[]);
  return (
    <div className='w-full h-full flex flex-col justify-between items-start pb-20'>
        <div className='w-full'>
            <h2 className='capitalize text-xl font-bold bg-yellow-900 w-full px-5 py-5 text-center text-white'>{userInfo.username}</h2>
            <div className='px-10 overflow-y-auto h-[600px]'>{messages.map((message)=>message.sender===currentUser._id?<OwnMessage key={message._id} content={message.content} />:<OthersMessage key={message._id} senderId={''} content={message.content} />)}</div>
        </div>
        <div className='w-full flex gap-5 px-10'>
            <input className='border-2 border-black w-11/12 text-lg px-10 py-3' type='text' ref={messageRef} placeholder='Message' />
            <button className='py-2 text-lg bg-black w-1/12 text-white border-2 border-black' onClick={sendMessage}>Send</button>
        </div>
    </div>
  )
}

export default PrivateChatViewer