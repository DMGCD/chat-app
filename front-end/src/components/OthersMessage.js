import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../App';

const OthersMessage = ({senderId, content}) => {

    const [receiver, setReceiver] = useState();

    const fetchReceiver = async() => {
        await axios.get(`${apiUrl}/user/id/${senderId}`)
        .then(res=>setReceiver(res.data))
        .catch(err=>console.error(err));
    }

    useEffect(()=>{
        if(senderId!=="")
            fetchReceiver();
    },[]);

  return (
    <div>
        <p>{receiver?.username}</p>
        <p>{content}</p>
    </div>
  )
}

export default OthersMessage