

const credentials: credentialsType = {
 nadaweda: {
    userName: 'nathaniel', 
    password: 'wqeqwe',
    id: 'nadaweda' ,
    role: 'admin'
 }
}

export function LogIn(name: string, password: string): credentialTypes | null {
    const creds = Object.values(credentials).find(cred=> cred.userName === name)
    if(!creds || creds.password !== password) return null 
    return creds
}