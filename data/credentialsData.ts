import { createId } from "@/utils/Keeper"


const credentials: credentialsType = {
 nadaweda: {
    userName: 'nathaniel', 
    password: '1234',
    id: 'nadaweda' ,
    role: 'ADMIN',
    roles: ['ADMIN', 'USER', 'STAFF', 'MEMBER'], 
    plan: null,
    staffStatus: null
 },
 safaweq: {
    userName: 'ADMIN', 
    password: '1234',
    id: 'safaweq' ,
    role: 'ADMIN',
    roles: ['ADMIN'], 
    plan: null,
    staffStatus: null
 },
 asddwad: {
    userName: 'account', 
    password: '1234',
    id: 'asddwad' ,
    role: 'USER',
    roles: ['USER'], 
    plan: null,
    staffStatus: 'aplied'
 }
}

export function SignUp(name: string, password: string): defaultResponseType<credentialTypes | null>{
    try {
        const creds = Object.values(credentials).find(cred=> cred.userName === name)
        if(creds) throw new Error('account already registered')
        const newID = createId()
        const cred:credentialTypes = {
            userName: name, 
            password: password,
            id: newID ,
            role: 'USER',
            roles: [ 'USER' ], 
            plan: null,
            staffStatus: null 
        }
        credentials[newID] = cred
        return {data: cred, success: true, message: 'successfuly created account'}
    } catch (error:any) {
        return {data: null, success: false, message: error.message}
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

export function UpgradeRole(name: string, plan: planType): credentialTypes | null {
    const cred = credentials[name] 
    if(cred ) { 
        cred.plan = plan
        cred.role = 'MEMBER'
        cred.roles.push('MEMBER')
        return cred
    }
    return null
}

export function ApplyRole(name: string): false | staffStatusType {
    try {
        const cred = credentials[name] 
        if(!cred) throw new Error('no account found')
        cred.staffStatus = 'aplied'  
        return cred.staffStatus
    } catch (error:any) {
        return false
    } 
}

type applicationResponseType = { userName: string; id: string;  staffStatus: staffStatusType; }

export function AssigneRole(name: string, staff: staffStatusType): defaultResponseType<applicationResponseType | null> {
    try {
        const cred = credentials[name] 
        if(!cred) throw new Error('no account found')
        if(staff === 'registered') cred.roles.push('STAFF') 
        if(staff === 'removed') cred.roles = cred.roles.filter(rl=>rl !== 'STAFF')
        cred.staffStatus = staff 
        return {success: true, message: 'Application sent', data: {id: cred.id, staffStatus: cred.staffStatus, userName: cred.userName}}
    } catch (error:any) {
        return {success: false, message: error.message, data: null}
    } 
}

export function getApplications(): defaultResponseType<applicationResponseType[]> {
   try {
        const data = Object.values(credentials).filter(cred => cred.staffStatus).map(ft=>({userName:ft.userName, id: ft.id, staffStatus: ft.staffStatus}))  
        return {data, success: true, message: ''}
   } catch (error) {
        return {data: [], success: false, message: 'something went wrong'}
   }
}