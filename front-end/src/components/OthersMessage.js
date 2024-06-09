import React from 'react'

const OthersMessage = ({username, content}) => {
  return (
    <div>
        <p>{username}</p>
        <p>{content}</p>
    </div>
  )
}

export default OthersMessage