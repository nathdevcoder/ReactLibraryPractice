import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// import authenticate from "./actions/login"

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
            email: {label: 'username', placeholder: 'enter username'},
            password: {label: 'password', placeholder: 'enter password'},
            role: {label: 'role', placeholder: 'role'}
        },
        async authorize({email, password, role}) { 
            if(!email && !role && !password) return null
            console.log(email, role, password);
            
            const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

            if (user) {
              return user
            } else {
              return null
            }
        }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || "secertasdw",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({token, session}) {
        console.log({token});
        console.log({session}); 
        return session
    }

  },
  session: {
    strategy: 'jwt'
  }
})