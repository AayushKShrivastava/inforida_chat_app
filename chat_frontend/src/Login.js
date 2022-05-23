import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { auth } from './firebase'

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = e => {
        e.preventDefault()
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                navigate('/chatroom')
            })
            .catch(error => alert(alert.message))
    }

  return (
    <div className='login'>
        <div className='login_container'>
            <h1>Sign-in to chat</h1>
            <form>
                <h5>E-mail</h5>
                <input onChange={e => setEmail(e.target.value)} type='email' value={email}/>
                <h5>Password</h5>
                <input onChange={e => setPassword(e.target.value)} type='password' value={password}/>
                <button 
                    type='submit' 
                    className='login_signInButton'
                    onClick={signIn}
                >Sign In</button>
            </form>
        </div>
    </div>
  )
}

export default Login