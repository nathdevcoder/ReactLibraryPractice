'use client'
import { useSession } from "next-auth/react"

 

 

export default function Home() {
   const {data} = useSession() 
  return (
    <main>
      <h1>hello world</h1> 
    </main>
  )
}
