 
import { auth } from "@/auth";
import {
  ApolloClient,
  InMemoryCache, 
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context"; 

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer  `,
    },
  };
});

export const client = async () => {
  const session = await auth()
  //@ts-ignore
  const token = session?.accessToken || ''
  console.log(token);
  
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token,
      },
    };
  });
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
}

 
