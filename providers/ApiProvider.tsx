
'use client'
import axios from 'axios'
import {QueryClient, QueryClientProvider} from 'react-query'


const queryclient = new QueryClient()

export default function ApiProvider({children}: {children: React.ReactNode}) {
    axios.interceptors.request.use(congig=> {
        congig.headers.Authorization = 'bearer Sometoken'
        return congig
    })
    return (
        <QueryClientProvider client={queryclient}>
            {children}
        </QueryClientProvider>
    )
}