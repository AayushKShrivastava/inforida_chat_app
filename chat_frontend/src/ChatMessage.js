import React from 'react'
import { auth } from './firebase'
import './ChatMessage.css'

function ChatMessage(props) {

    const {text, uid, user} = props.message.data
    
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

    
  return (
    <div className={`chat_message ${messageClass}`}>
        {uid !== auth.currentUser.uid && <div className='user'>{user}</div>}
        <p className='text'>{text}</p>
    </div>
  )
}

export default ChatMessage