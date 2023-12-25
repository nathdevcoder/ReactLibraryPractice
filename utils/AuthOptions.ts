import { ApplyRole, LogIn, UpdateRole, UpgradeRole } from "@/data/credentialsData";
import { AuthOptions } from "next-auth"; 
import CredentialsProvider from "next-auth/providers/credentials"
 const authOptions: AuthOptions = {
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
    secret: process.env.NEXTAUTH_SECRET || "secertasdw",
    callbacks:  {
        async signIn({credentials, user}) {  
            if(!credentials || !credentials.role  || !user.id) return false 
            return UpdateRole(user.id, credentials.role as any) 
        },
        async jwt({token, user, trigger, session}) {  
            if(trigger === 'update') { 
                switch (session.type) {
                    case 'change':
                        if(!token.id || !session.role) return token
                        const success = UpdateRole(token.id as string, session.role)  
                        if(success) return {  ...token, role: session.role, } 
                        return token
                    case 'upgrade' :
                        if(!token.id || !session.plan) return token 
                        const upgradedCred = UpgradeRole(token.id as string, session.plan)
                        if(!upgradedCred) return token
                        return {  ...token, role: upgradedCred.role, roles: upgradedCred.roles, plan: upgradedCred.plan } 
                    case 'asign':
                        if(!token.id) return token
                        const status = ApplyRole(token.id as string)
                        if(status) return { ...token, staffStatus: status}
                        return token
                    default:
                        return token
                }  
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

export default authOptions