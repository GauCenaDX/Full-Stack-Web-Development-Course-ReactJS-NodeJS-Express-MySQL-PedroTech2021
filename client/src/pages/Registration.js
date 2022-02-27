import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Registration() {
  //- Create the initial value for Formik
  const initialValues = {
    username: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required()
  });

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/auth', data).then(() => {
      console.log(data);
    });
  };

  return (
    <div>
      <Formik 
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='form-container'>
          <label>Username: </label>
          <ErrorMessage name='username' component='span' />
          <Field
            autoComplete='off'
            id='input-create-post'
            name='username'
            placeholder='Author Name(s)...'
          />

          <label>Password: </label>
          <ErrorMessage name='password' component='span' />
          <Field
            autoComplete='off'
            type='password'
            id='input-create-post'
            name='password'
            placeholder='Your Password...'
          />

          <button type='submit'>Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;