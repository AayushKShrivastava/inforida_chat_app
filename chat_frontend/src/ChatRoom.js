import React, { useEffect, useRef, useState } from 'react'
import './ChatRoom.css'
import {db, auth} from './firebase'
import ChatMessage from './ChatMessage'
import {useAuthState} from 'react-firebase-hooks/auth'
import { nanoid } from 'nanoid'
import firebase from "firebase/compat/app";
import { useNavigate } from 'react-router-dom'

function ChatRoom() {

    const dummy = useRef()
    const [messages, setMessages] = useState([])
    const [formValue, setFormValue] = useState('')
    const [user] = useAuthState(auth)
    const navigate = useNavigate() 
    
    const executeScroll = () => dummy.current.scrollIntoView() 
    useEffect(() => {
        db
            .collection('messages')
            .orderBy('createdAt')
            .onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))))
            )
        executeScroll()
    }, [])
    console.log(messages)
     

    const signOut = () => {
        if(user){
            auth.signOut()
            navigate('/')
        }
    }

    const sendMessage = async (event) => {
        event.preventDefault()
        if(formValue) {
            db
                .collection('messages')
                .doc(nanoid())
                .set({
                    text: formValue,
                    uid: auth.currentUser.uid,
                    user: auth.currentUser.email,
                    createdAt : firebase.firestore.FieldValue.serverTimestamp()
                })

            setFormValue('')
            
            executeScroll()
        }
        
    }
    
  return (
    <div className='chatroom'>
        <div className='chatroom_header'>
            <h4>{user.email}</h4>
            <button onClick={signOut}>Sign Out</button>
        </div>
        <section className='messages'>
            {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            <span ref={dummy}></span>
        </section>

        <form className='form' onSubmit={sendMessage}>
            <input className='form_input' value={formValue} onChange={e => setFormValue(e.target.value)}/>
            <button type='submit'>Send</button>
        </form>
    </div>
  )
}

export default ChatRoom