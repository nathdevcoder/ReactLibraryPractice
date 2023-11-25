"use client";

import React from "react";
import { useFormik } from "formik";
import { object, Schema, string } from "yup";
import { TextField } from "@mui/material";
import Link from "next/link";

const validateTest: Schema<{
  email: string;
  lastName: string;
  firstName: string;
  form_method?: string  
}> = object().shape({
  email: string().required(),
  firstName: string().required(),
  lastName: string().required(),
  form_method: string().optional()
});
const SignupForm = () => {
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      form_method: 'POST'
    },
    validationSchema: validateTest,
    onSubmit: (values) => {
      console.log(values); 
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <Link href={"/form"}>V1</Link>
      <form onSubmit={handleSubmit}>
        <input name="form_method" value='PUT' type="hidden"/> 
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          helperText={errors.email}
        />
        <TextField
          id="filled-basic"
          label="First name"
          variant="filled"
          name="firstName"
          type="text"
          value={values.firstName}
          onChange={handleChange}
          helperText={errors.firstName}
        />
        <TextField
          id="standard-basic"
          label="Last name"
          variant="standard"
          name="lastName"
          type="text"
          value={values.lastName}
          onChange={handleChange}
          helperText={errors.lastName}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignupForm
