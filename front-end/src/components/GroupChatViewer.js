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
        fetchMessages(chatInfo._id);
    },[chatInfo]);

    useEffect(()=>{
        socket.on("receiveGroupMessage", ({sender, content})=>{
            setMessages(prevMsg=>[...prevMsg,{_id:prevMsg.length, sender, content}]);
        });
    },[socket]);

  return (
    <div>
        <h2>{chatInfo.chatName}</h2>
        <div>{messages.map(message=>message.sender===currentUser._id?<OwnMessage content={message.content} key={message._id}/>:<OthersMessage key={message._id} content={message.content} senderId={message.sender} />)}</div>
        <div>
            <input type='text' ref={messageRef} />
            <button onClick={sendMessage}>Send</button>
        </div>
    </div>
  )
}

export default GroupChatViewer