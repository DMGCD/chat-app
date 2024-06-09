import React, { useEffect } from 'react'

const GroupChatViewer = ({chatInfo}) => {
    useEffect(()=>{
        console.log("group chat mounted")
    },[]);
  return (
    <div>GroupChatViewer</div>
  )
}

export default GroupChatViewer