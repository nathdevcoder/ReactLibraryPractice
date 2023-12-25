"use client";
import React from "react";
import { useFormik } from "formik";
import { Schema, object, ref, string } from "yup";
import {
  Button, 
  Stack,
  TextField,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { useSnackbar } from 'notistack';

const validateTest: Schema<{ email: string; password: string; confirmPassword:string }> =
  object().shape({
    email: string().required(),
    password: string().required(), 
    confirmPassword: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  });

export default function SignupForm({ onClose, auth }: { onClose?: () => void, auth: boolean }) {
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isSubmitting, 
  } = useFormik({
    initialValues: {
      email: "",
      password: "", 
      confirmPassword: ""
    },
    validationSchema: validateTest,
    onSubmit: async (values) => {
      try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                name: values.email,
                password: values.password
            })
        })
        if (!res.ok) throw Error('oops  someting went wrong');
        const response = await res.json() as defaultResponseType<credentialTypes |null>
        if(!response.success)  throw Error(response.message);
        enqueueSnackbar(response.message,{variant: 'success'})  
        if(!auth) {
            const result = await signIn('credentials', {
                redirect: false,
                name: values.email,
                password: values.password,
                role: 'user',
            })
            if (!result?.ok) throw Error(result?.error || 'oops  someting went wrong');
            enqueueSnackbar('your are logged in',{variant: 'success'}) 
        } 
        if (onClose) onClose(); 
      } catch (error: any) { 
        enqueueSnackbar( error.message ,{variant: 'error'})
      }
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <Stack direction={"column"} spacing={2}>
        <TextField
          id="signupun"
          label="User Name"
          variant="standard"
          name="email"
          type="text"
          value={values.email}
          onChange={handleChange}
          helperText={errors.email}
        />
        <TextField
          id="signupps"
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          helperText={errors.password}
        />
        <TextField
          id="signupcps"
          label="Confirm Password"
          variant="outlined"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          helperText={errors.confirmPassword}
        />
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
