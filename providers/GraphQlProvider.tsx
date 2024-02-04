'use client'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cookies } from 'next/headers'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URL,
});
const cookieStore = cookies()
const authLink = setContext((_, { headers }) => {
  const token = cookieStore.get("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default function GraphQLProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
