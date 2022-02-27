import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

//- Notes:
//- For <Field> element: The 'name' is very important, it should match the 
//- name of column/attribute of the table in your database.
//-
//- For ErrorMessage, the component attribute is the type of element we want
//-   the Error Message to be returned as.

function CreatePost() {
  let navigate = useNavigate();

  //- Create the initial value for Formik
  const initialValues = {
    title: '',
    postText: '',
    usetname: '',
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required()
  });

  //- Create a function that will run when submit the form.
  //- When submitting the form, Formik will return the data as an object.
  const onSubmit = (data) => {
    // console.log(data);
    axios.post('http://localhost:3001/posts', data).then((response) => {
      navigate('/');
    });
  };

  return (
    <div className='create-post-page'>
      <Formik 
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='form-container'>
          <label>Title: </label>
          <ErrorMessage name='title' component='span' />
          <Field
            autoComplete='off'
            id='input-create-post'
            name='title'
            placeholder='Article Title...'
          />
          <label>Post: </label>
          <ErrorMessage name='postText' component='span' />
          <Field
            autoComplete='off'
            id='input-create-post'
            name='postText'
            placeholder='Artical Contents...'
          />
          <label>Username: </label>
          <ErrorMessage name='username' component='span' />
          <Field
            autoComplete='off'
            id='input-create-post'
            name='username'
            placeholder='Author Name(s)...'
          />
          <button type='submit'>Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;