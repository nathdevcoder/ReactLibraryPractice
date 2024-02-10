"use client";
import { gql, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import React from "react";

const GET_BOOKS = gql`
  query Books {
    books {
      title
      author
    }
  }
`;

export default function ClientComponent() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const session = useSession()
  console.log(session);
  
  if (loading) return <p>loading</p>;
  if (error) return <p>error</p>;
  if (!data) return <p>no data</p>;
  console.log(data);

  return <div>ClientComponent</div>;
}
