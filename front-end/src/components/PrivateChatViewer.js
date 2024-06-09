import React, { useContext, useEffect, useRef, useState } from 'react'
import { DashboardContext } from './Dashboard';
import OwnMessage from './OwnMessage';
import OthersMessage from './OthersMessage';

const PrivateChatViewer = ({userInfo}) => {
    const { currentUser } = useContext(DashboardContext);
    const [messages, setMessages] = useState([]);

    const messageRef = useRef();

    const sendMessage = () => {
        const messageToSend = messageRef.current.value;
        if (messageToSend !== ""){
            // handle socket. emit
            // add the current message to the messages state with userid
        }
    }

    // add usestate when mounting the component to fetch all the messages from the database

    useEffect(()=>{
        console.log("private chat mounted")
    },[]);
  return (
    <div>
        {/* Message Header */}
        <h2>{userInfo.username}</h2>
        <div>{messages.map(message=>message.sender===currentUser._id?<OwnMessage content={message.content} />:<OthersMessage username={message.sender} content={message.content} />)}</div>
        <div>
            <input type='text' ref={messageRef} />
            <button onClick={sendMessage}>Send</button>
        </div>
    </div>
  )
}

export default PrivateChatViewer