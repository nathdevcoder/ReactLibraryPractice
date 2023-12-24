"use client";
import React from "react";
import { useFormik } from "formik";
import { Schema, object, string } from "yup";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { useSnackbar } from 'notistack';

const validateTest: Schema<{ email: string; password: string; role: string }> =
  object().shape({
    email: string().required(),
    password: string().required(),
    role: string()
      .required("Role is required")
      .oneOf(["admin", "user", "member", "staff"], "Invalid role"),
  });

export default function LoginForm({ onClose }: { onClose?: () => void }) {
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
      role: "",
    },
    validationSchema: validateTest,
    onSubmit: async (values) => {
      try {
        const res = await signIn("credentials", {
          redirect: false,
          name: values.email,
          password: values.password,
          role: values.role,
        });
        console.log(res);

        if (!res?.ok) throw Error(res?.error || 'oops  someting went wrong');
        if (onClose) onClose();
      } catch (error: any) { 
        enqueueSnackbar( error.message ,{variant: 'error', anchorOrigin: {vertical: 'top', horizontal: 'right'}})
      }
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <Stack direction={"column"} spacing={2}>
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
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={values.role}
            label="Role"
            name="role"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="member">Member</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
          </Select>
          {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
        </FormControl>
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
