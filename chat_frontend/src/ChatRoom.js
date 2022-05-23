import React, { useEffect, useState } from 'react'
import './ChatRoom.css'
import {db, auth} from './firebase'
import ChatMessage from './ChatMessage'
import {useAuthState} from 'react-firebase-hooks/auth'
import { nanoid } from 'nanoid'
import firebase from "firebase/compat/app";
import { useNavigate } from 'react-router-dom'

function ChatRoom() {

    const [messages, setMessages] = useState([])
    const [formValue, setFormValue] = useState('')
    const [user] = useAuthState(auth)
    const navigate = useNavigate()

    useEffect(() => {
        if(user){
            db
                .collection('messages')
                .orderBy('createdAt')
                .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))))
                )
        }

    }, [messages, user])

    const signOut = () => {
        if(user){
            auth.signOut()
            navigate('/')

        }
    }

    const sendMessage = async (event) => {
        event.preventDefault()
        db
            .collection('messages')
            .doc(nanoid())
            .set({
                text: formValue,
                uid: auth.currentUser.uid,
                createdAt : firebase.firestore.FieldValue.serverTimestamp()
            })

        setFormValue('')
    }

    
  return (
    <div className='chatroom'>
        <div>
            <h1>{user.email}</h1>
            <button onClick={signOut}>Sign Out</button>
        </div>
        
        {
            messages.map(msg => <ChatMessage key={msg.id} message={msg} />)
        }

        <form onSubmit={sendMessage}>
            <input value={formValue} onChange={e => setFormValue(e.target.value)}/>
            <button type='submit'>Send</button>
        </form>
    </div>
  )
}

export default ChatRoom