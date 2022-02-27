import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post('http://localhost:3001/auth/login', data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem('accessToken', response.data);
        navigate('/');
      }
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