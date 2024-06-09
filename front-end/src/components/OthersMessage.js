import React from 'react'

const OthersMessage = ({senderId, content}) => {
  return (
    <div>
        <p>{senderId}</p>
        <p>{content}</p>
    </div>
  )
}

export default OthersMessage