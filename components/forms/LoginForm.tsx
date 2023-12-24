'use client'
import React from 'react'
import { useFormik  } from 'formik';
import { Schema, object, string } from 'yup';
import { Button, Stack, TextField } from '@mui/material';
import { signIn } from 'next-auth/react';


const validateTest: Schema<{email: string, password: string}> = object().shape({
    email: string().required(),
    password: string().required(),
}) 

export default function LoginForm({onClose}: {onClose?: ()=>void}) {
    const { handleSubmit, handleChange, values, errors, isSubmitting, setErrors } = useFormik({
        initialValues: {
          email: "",
          password: "", 
        },
        validationSchema: validateTest,
        onSubmit: async (values) => {
            try {
                const res = await signIn('credentials', {
                  redirect: false,
                  name: values.email,
                  password: values.password,
                }) 
                if(!res?.ok) throw Error()
                if(onClose) onClose() 
            } catch (error) {
                setErrors({
                    email: 'password or name is incorrect',
                    password: 'password or name is incorrect',
                })  
            } 
        },
      });  
  return (       
    <form onSubmit={handleSubmit}>
        <Stack direction={'column'} spacing={2}>
            <TextField
            id="loginun"
            label="User Name"
            variant="standard"
            name="email"
            type="text"
            value={values.email}
            onChange={handleChange}
            helperText={errors.email}
            /> 
            <TextField
            id="loginps"
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            helperText={errors.password}
            />
            <Button type="submit" disabled={isSubmitting}>Submit</Button>
        </Stack> 
    </form>
  )
}
