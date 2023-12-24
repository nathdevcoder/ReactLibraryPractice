import { LogIn, UpdateRole } from "@/data/credentialsData";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next"; 
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                name: {label: 'username', placeholder: 'enter username'},
                password: {label: 'password', placeholder: 'enter password'},
                role: {label: 'role', placeholder: 'role'}
            },
            async authorize(credentials) { 
                if(!credentials || !credentials.name || !credentials.password || !credentials.role) return null 
                return LogIn(credentials.name, credentials.password, credentials.role as roleType)
            }
        })
    ],
    secret: 'secteadsaqw',
    callbacks:  {
        async signIn({credentials, user}) {  
            if(!credentials || !credentials.role  || !user.id) return false 
            return UpdateRole(user.id, credentials.role as any) 
        },
        async jwt({token, user, trigger, session}) {  
            if(trigger === 'update' && session?.role && token?.id) {  
                const success = UpdateRole(token.id as string, session.role)  
                if(success)  {
                    return {
                        ...token, 
                        role: session.role,
                    }
                }
                return token
            }
            if(user) { 
                return {
                    ...token,
                    ...user
                }
            }  
            return token
        },
        async session({session,token}) {  
            return {
                ...session,
                user: {
                    ...session.user,
                    ...token
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