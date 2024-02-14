import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import authenticate from "./actions/authenticate"
import validateLogin from "./utils/validator"
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {label: 'username', placeholder: 'enter username', type: 'text'},
        password: {label: 'password', placeholder: 'enter password', type: 'password'},
        role: {label: 'role', placeholder: 'role', type: 'text'}
      },
      async authorize(data) { 
        if(validateLogin(data)) {
          const user = await authenticate(data) 
          return user
        } 
        return null 
      }
    })
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {  
      if(user){ 
        // eslint-disable-next-line no-unused-vars
        const {accessToken, refreshToken, csrfToken,...rest} = user
        //handleToken
        // console.log(accessToken, refreshToken, csrfToken)
        token.user = rest 
      } 
      // if(account) token.accessToken = account.accessToken
      return token
    },
    async session({ session}) {   
      return {
        ...session, 
      }
    }

  },
  session: {
    strategy: 'jwt'
  }
})