import React from 'react'
import { auth } from './firebase'
import './ChatMessage.css'

function ChatMessage(props) {

    const {text, uid, user} = props.message.data
    
    //Check whether the message has been sent by the current user or not
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

    
  return (
    <div className={`chat_message ${messageClass}`}>
        {/* Display the sender email along eith the message */}
        {uid !== auth.currentUser.uid && <div className='user'>{user}</div>}
        <p className='text'>{text}</p>
    </div>
  )
}

export default ChatMessage