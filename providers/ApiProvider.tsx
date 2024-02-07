"use client";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Session } from "next-auth";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URL,
});

export default function ApiProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  //@ts-ignore
  const token = session?.accessToken || "";
  console.log(token);
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token,
      },
    };
  });
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
