import React from 'react'
import { auth } from './firebase'

function ChatMessage(props) {

    const {text, uid} = props.message.data
    
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'
  return (
    <div className='chat_message'>
        <div className={`message ${messageClass}`}>
            <p>{text}</p>
        </div>
    </div>
  )
}

export default ChatMessage