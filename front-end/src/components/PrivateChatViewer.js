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
        })
        .catch(err=>console.error(err));
    }

    const fetchMessages = async(chatId) => {
        await axios.get(`${apiUrl}/message/${chatId}`)
        .then(res=>setMessages(res.data))
        .catch(err=>console.error(err));
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
    <div>
        <h2>{userInfo.username}</h2>
        <div>{messages.map((message)=>message.sender===currentUser._id?<OwnMessage key={message._id} content={message.content} />:<OthersMessage key={message._id} senderId={message.sender} content={message.content} />)}</div>
        <div>
            <input type='text' ref={messageRef} />
            <button onClick={sendMessage}>Send</button>
        </div>
    </div>
  )
}

export default PrivateChatViewer