'use client'

import React from 'react';
import { Formik, Form  } from 'formik';
import { object, Schema, string } from 'yup'
import { TextField } from '@mui/material';
import Link from 'next/link';

const validateTest: Schema<{email: string, password: string}> = object().shape({
    email: string().required(),
    password: string().required(),
}) 
const Basic = () => (
  <div>
    <Link href={'/forms/version2'}>Verion two</Link>
    <h1>Any place in your app!</h1>
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validateTest}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting, errors, setFieldValue }) => (
        <Form>  
            <TextField id="email-basic" label="Outlined" variant="outlined" type="email" helperText={errors.email} onChange={(val)=>setFieldValue('email', val.target.value)}  /> 
            <TextField id="ps" label="Outlined" variant="outlined" type="password"  helperText={errors.password} onChange={(val)=>setFieldValue('password', val.target.value)}  />  
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Basic;