 
import { auth } from "@/auth";
import AuthButtons from "@/components/AuthButtons";
import ClientComponent from "@/components/ClientComponent";
import JSONViewer from "@/components/JSONViewer"; 
import ApiProvider from "@/providers/ApiProvider";
import { cookies } from "next/headers";

 


export default async function Home() {
  const cookieStore = cookies() 
  const session = await auth()
  const cookie = cookieStore.get('csrfToken')
  
  return (
    <main> 
        <h1>hello world</h1>  
        <AuthButtons />
        <JSONViewer json={JSON.stringify({session, cookie})}/> 
        <ApiProvider session={session}>
          <ClientComponent/>
        </ApiProvider>
    </main>
  )
}
