import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
//-- Depricated in V6
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//- For useHistory from react-router-dom: In V6, useHistory is replaced by
//-   useNavigate. So:
//-     let history = useHistory();
//-     history.push('/path');
//-   has become:
//-     let navigate = useNavigate();
//-     navigate('/path');

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/posts').then((response) => {
      // console.log(response.data);
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className='post' onClick={() => {navigate(`/post/${value.id}`)}}>
            <div className='title'>{value.title}</div>
            <div className='body'>{value.postText}</div>
            <div className='footer'>{value.username}</div>
          </div>
        );
      })};
    </div>
  );
}

export default Home;