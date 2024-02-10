import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import authenticate from "./actions/authenticate"
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
            email: {label: 'username', placeholder: 'enter username',type: 'text'},
            password: {label: 'password', placeholder: 'enter password', type: 'text'},
            role: {label: 'role', placeholder: 'role', type: 'text'}
        },
        async authorize({email, password, role}) { 
            if(!email && !role && !password) return null
 
            //@ts-ignore
            const user = await authenticate({email, password, role})
            if(user) {
              return user
            }
            return null
           
        }
    })
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) { 
    
      if(user) { 
        //@ts-ignore
        token.accessToken = user.accessToken
      }
      if(account) {
        console.log(account); 
      }
      return token
    },
    async session({token, session}) {  
        return {
          ...session,
          hello: 'hello',
          accessToken: token.accessToken,
          inSesionSession:session,
          inSesionToken:token
        }
    }

  },
  session: {
    strategy: 'jwt'
  }
})