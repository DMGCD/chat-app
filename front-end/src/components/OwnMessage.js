import React from 'react'

const OwnMessage = ({content}) => {
  return (
    <div className='w-full flex justify-end'>
      <div className='bg-green-800 text-white my-4 px-10 py-3 text-lg w-96 rounded-2xl '>
          <p>{content}</p>
      </div>
    </div>
  )
}

export default OwnMessage