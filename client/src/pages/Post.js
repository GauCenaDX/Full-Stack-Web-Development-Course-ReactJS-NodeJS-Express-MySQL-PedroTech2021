import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [listOfComments, setListOfComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Fetch request to 
  useEffect(() => {
    //-- display individual post
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setListOfComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios.post(
      'http://localhost:3001/comments',
      {
        commentBody: newComment,
        PostId: id
      },
      { //-- adding header to the post request
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      }
    ).then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
        alert('You\'re not logged in');
      } else {
        const commentToAdd = {
          commentBody: newComment,
          username: response.data.username
        };
        setListOfComments([...listOfComments, commentToAdd]);
        setNewComment('');
      }
    });
  };

  return (
    <div className='postPage'>
      <div className='leftSide'>
        <div className='post' id='individual'>
          <div className='title'>{postObject.title}</div>
          <div className='body'>{postObject.postText}</div>
          <div className='footer'>{postObject.username}</div>
        </div>
      </div>
      <div className='rightSide'>
        <div className='addCommentContainer'>
          <input 
            type='text'
            placeholder='Comment here...'
            value={newComment}
            autoComplete='off'
            onChange={(event) => {setNewComment(event.target.value)}}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className='listOfComments'>
          {listOfComments.map((comment, key) => {
            return (
              <div key={key} className='comment'>
                {comment.commentBody}
                <label> -- Username: {comment.username} -- </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Post;