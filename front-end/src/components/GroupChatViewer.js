import React, { useContext, useEffect, useRef, useState } from 'react'
import OwnMessage from './OwnMessage';
import OthersMessage from './OthersMessage';
import axios from 'axios';
import { AppContext, apiUrl } from '../App';
import { DashboardContext } from './Dashboard';

const GroupChatViewer = ({chatInfo}) => {

    const { socket } = useContext(AppContext);
    const { currentUser } = useContext(DashboardContext);
    const [messages, setMessages] = useState([]);
    const messageRef = useRef();


    const sendMessage = () => {
        const messageToSend = messageRef.current.value;
        if (messageToSend !== ""){
            socket.emit("groupMessage", {roomName: chatInfo.chatName, content: messageToSend})
            setMessages(prevMsg=>[...prevMsg,{_id:prevMsg.length, sender:currentUser._id, content:messageToSend}])
        }
    }

    const fetchMessages = async(chatId) => {
        await axios.get(`${apiUrl}/message/${chatId}`)
        .then(res=>setMessages(res.data))
        .catch(err=>console.error(err));
    }

    useEffect(()=>{
        socket.emit("joinRoom", chatInfo.chatName);
    },[])

    useEffect(()=>{
        fetchMessages(chatInfo._id);
    },[chatInfo]);

    useEffect(()=>{
        socket.on("receiveGroupMessage", ({sender, content})=>{
            console.log('hello');
            setMessages(prevMsg=>[...prevMsg,{_id:prevMsg.length, sender, content}]);
        });
    },[socket]);

  return (
    <div className='w-full h-full flex flex-col justify-between items-start pb-20'>
        <div className='w-full'>
            <h2 className='capitalize text-xl font-bold bg-yellow-900 w-full px-5 py-5 text-center text-white'>{chatInfo.chatName}</h2>
            <div  className='px-10 overflow-y-auto h-[600px]'>{messages.map(message=>message.sender===currentUser._id?<OwnMessage content={message.content} key={message._id}/>:<OthersMessage key={message._id} content={message.content} senderId={message.sender} />)}</div>
        </div>
        <div className='w-full flex gap-5 px-5'>
            <input  className='border-2 border-black w-11/12 text-lg px-10 py-2' type='text' ref={messageRef} placeholder='Message' />
            <button className='py-2 text-lg bg-black w-1/12 text-white border-2 border-black' onClick={sendMessage}>Send</button>
        </div>
    </div>
  )
}

export default GroupChatViewer