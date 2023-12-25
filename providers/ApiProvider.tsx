
'use client'
import axios from 'axios'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'


const queryclient = new QueryClient()

export default function ApiProvider({children, session}: {children: React.ReactNode, session: Session | null}) {
    axios.interceptors.request.use(congig=> {
        congig.headers.Authorization = 'bearer Sometoken'
        return congig
    })
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryclient}>
                {children}
            </QueryClientProvider>
        </SessionProvider>
    )
}