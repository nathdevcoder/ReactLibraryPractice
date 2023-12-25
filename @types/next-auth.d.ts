import NextAuth from "next-auth"

declare module "next-auth" { 
  interface Session {
    user: { 
      role: roleType,
      userName: string,
      roles: roleType[]
      plan: planType
      staffStatus: staffStatusType
    }
  }
}