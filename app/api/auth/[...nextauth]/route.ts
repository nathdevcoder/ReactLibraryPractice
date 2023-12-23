import { LogIn } from "@/data/credentialsData";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next"; 
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                name: {label: 'username', placeholder: 'enter username'},
                password: {label: 'password', placeholder: 'enter password'}
            },
            async authorize(credentials) {
                if(!credentials || !credentials.name || !credentials.password) return null 
                return LogIn(credentials.name, credentials.password)
            }
        })
    ],
    secret: 'secteadsaqw',
    callbacks:  {
        async jwt({token, user}) { 
            if(user) {
                return {
                    ...token,
                    id: user.id,
                    address: 'adress',
                    name: user.name,
                }
            } 
            return token
        },
        async session({session,token}) {  
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    address: token.address
                }
            } 
        },
    },
    session: {
        strategy: "jwt"
    }
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }