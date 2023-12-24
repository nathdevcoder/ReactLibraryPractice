type roleType = 'admin' | 'user' | 'member' | 'staff'
type credentialTypes = {
    userName: string
    password: string
    id: string
    role: roleType
    roles: roleType[] 
}

type credentialsType = {[k: string]: credentialTypes}