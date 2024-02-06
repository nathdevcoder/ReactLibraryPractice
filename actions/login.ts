'use server'

import { signIn } from "@/auth";

export default async function login({email, password, role}: any) {
    await signIn('credentials', {
        redirectTo: '/',
        email ,
        password ,
        role ,
    })
} 