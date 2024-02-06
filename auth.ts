import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// import authenticate from "./actions/login"

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    Credentials({
        name: 'credentials',
        credentials: {
            email: {label: 'username', placeholder: 'enter username'},
            password: {label: 'password', placeholder: 'enter password'},
            role: {label: 'role', placeholder: 'role'}
        },
        async authorize({email, password, role}) { 
            if(!email && !role && !password) return null
            console.log(email, role, password);
            
            // const data = await authenticate({email, password, role})
            return {}
        }
    })
  ],
  session: {
    strategy: 'jwt'
  }
})