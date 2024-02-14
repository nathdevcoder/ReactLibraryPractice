type RoleType = 'ADMIN' | 'MEMBER' | 'STAFF' | 'USER'

type UserType = {
    id: string
    name: string
    email: string
    role: RoleType
    roles: RoleType[]
    dateCreated: Date | string
    avatar: string
    description: string
    accessToken: string
    refreshToken: string
    csrfToken: string
} 

type validCredentialsType = {email:string, password: string, role: RoleType}