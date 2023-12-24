

const credentials: credentialsType = {
 nadaweda: {
    userName: 'nathaniel', 
    password: 'wqeqwe',
    id: 'nadaweda' ,
    role: 'admin',
    roles: ['admin', 'user', 'staff', 'member'] 
 }
}

export function LogIn(name: string, password: string, role: roleType): credentialTypes | null {
    const creds = Object.values(credentials).find(cred=> cred.userName === name)
    if(!creds ) throw new Error('no account found')
    if(creds.password !== password) throw new Error('password is incorrect')
    if(!creds.roles.includes(role)) throw new Error('User does not have the required role')
    return creds
}

export function UpdateRole(name: string, role: roleType): boolean {
    const cred = credentials[name] 
    if(cred && cred.roles.includes(role)) { 
        cred.role = role
        return true
    }
    return false
}