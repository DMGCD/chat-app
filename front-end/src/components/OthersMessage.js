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
    <div className='flex justify-start'>
      <div className='bg-gray-200 my-4 px-10 py-3 text-lg w-96 rounded-2xl'>
          <p className='text-gray-400 text-sm'>{receiver?.username}</p>
          <p>{content}</p>
      </div>
    </div>
  )
}

export default OthersMessage