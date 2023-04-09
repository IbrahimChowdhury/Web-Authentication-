import React, { useState } from 'react'
import axios from 'axios';
function Register() {

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    let handleSubmit=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:4000/login",{username,password})
        .then((user)=>{
            console.log(user)
        })
    }

  return (
    <div>
        <h1>register page</h1>
        <form  onSubmit={handleSubmit}>
            <div>
                <input type="text" placeholder='username' name='username' value={username} onChange={(e)=>{
                    setusername(e.target.value)
                }} />
            </div>
            <div>
                <input type="password" placeholder='password' name='password' value={password} onChange={(e)=>{
                    setpassword(e.target.value)
                }} />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Register