'use client'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context"; 
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default function GraphQLProvider({
  children,
  session
}: {
  children: React.ReactNode;
  session: Session | null
}) {
  return (
    <SessionProvider session={session}><ApolloProvider client={client}> {children} 
    </ApolloProvider></SessionProvider>
  )
}
