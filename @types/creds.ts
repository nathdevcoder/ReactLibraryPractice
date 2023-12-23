type credentialTypes = {
    userName: string
    password: string
    id: string
    role: 'admin' | 'user' | 'member' | 'staff'
}

type credentialsType = {[k: string]: credentialTypes}