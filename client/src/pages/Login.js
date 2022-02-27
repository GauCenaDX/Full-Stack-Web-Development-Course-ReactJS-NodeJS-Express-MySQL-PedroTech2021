import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    const data = { username: username, password: password };
    axios.post('http://localhost:3001/auth/login', data).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div className='loginContainer'>
      <input 
        type='text'
        placeholder='Username'
        onChange={(event) => {
          setUserName(event.target.value);
        }} 
      />
      <input
        type='password'
        placeholder='Password'
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;