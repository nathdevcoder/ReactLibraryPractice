import { auth } from "@/auth"
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URL,
})

const authLink = setContext(async (_, { headers }) => {
  // eslint-disable-next-line no-unused-vars
  const session = await auth()
  //@ts-ignore
  const token = 'token' // get Token
  console.log(token)
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  }
})
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

export default client
