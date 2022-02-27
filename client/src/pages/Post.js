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
      {commentBody: newComment , PostId: id}
    ).then((response) => {
      const commentToAdd = { commentBody: newComment };
      setListOfComments([...listOfComments, commentToAdd]);
      setNewComment('');
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
            return <div key={key} className='comment'>{comment.commentBody}</div>
          })}
        </div>
      </div>
    </div>
  )
}

export default Post;