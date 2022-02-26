import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});

  // Fetch request to display individual post
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
  }, []);

  return (
    <div className='post-page'>
      <div className='leftside'>
        <div className='post' id='individual'>
          <div className='title'>{postObject.title}</div>
          <div className='body'>{postObject.postText}</div>
          <div className='footer'>{postObject.username}</div>
        </div>
      </div>
      <div className='rightside'>Comment Section</div>
    </div>
  )
}

export default Post;