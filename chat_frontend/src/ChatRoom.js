import React, { useEffect, useRef, useState } from 'react'
import './ChatRoom.css'
import {db, auth} from './firebase'
import ChatMessage from './ChatMessage'
import {useAuthState} from 'react-firebase-hooks/auth'
import { nanoid } from 'nanoid'
import firebase from "firebase/compat/app";
import { useNavigate } from 'react-router-dom'

function ChatRoom() {

    // This is used to keep the recently sent message visible on the screen;
    const dummy = useRef() 
    //All messages sent or received are stored in this array 
    const [messages, setMessages] = useState([])  
    // This will maintain the state of the message being typped by the current user 
    const [formValue, setFormValue] = useState('') 
    // user contains the information about the current logged in user 
    const [user] = useAuthState(auth)  
    const navigate = useNavigate() 
    
    //This function ensures that the recently sent message is on the screen
    const executeScroll = () => dummy.current.scrollIntoView()
    
    // previously messages will be fetched from the database snd stored in the message state array.
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
    }, [])
     
    // It excutes when the Sign out button is clicked
    const signOut = () => {
        if(user){
            auth.signOut()
            navigate('/')
        }
    }

    //Here the typed message is sent to the firestore when the sent button is clicked
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
        {/* Header */}
        <div className='chatroom_header'>
            <h4>{user.email}</h4>
            <button onClick={signOut}>Sign Out</button>
        </div>

        {/* All Messages are displayed here */}
        <section className='messages'>
            {/* Each ChatMessage is */}
            {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            <span ref={dummy}></span>
        </section>

        {/* This section talkes user input and send the message to firestore */}
        <form className='form' onSubmit={sendMessage}>
            <input className='form_input' value={formValue} onChange={e => setFormValue(e.target.value)}/>
            <button type='submit'>Send</button>
        </form>
    </div>
  )
}

export default ChatRoom