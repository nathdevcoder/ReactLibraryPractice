type roleType = 'ADMIN' | 'USER' | 'MEMBER' | 'STAFF'
type staffStatusType = 'aplied' | 'registered' | 'removed' | 'declined' | null
type planType = 'GOLD' | 'SILVER' | 'STANDARD' | null
type credentialTypes = {
    userName: string
    password: string
    id: string
    role: roleType
    roles: roleType[] 
    plan: planType
    staffStatus: staffStatusType
}

type credentialsType = {[k: string]: credentialTypes}

type applicationsType = {
    staffStatus: staffStatusType
    userName: string
    id: string
}[]