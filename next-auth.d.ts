import "next-auth"
 
declare module "next-auth" {
 
  interface User extends UserType {}
 
  interface Account {
    accessToken: string
    csrfToken: string
  }
 
  interface Session {
    accessToken: string
    csrfToken: string
    user: {
      role: RoleType
      name: string
    }
  }
}

declare module "next-auth/jwt" { 
  interface JWT { 
    accessToken?: string
  }
}