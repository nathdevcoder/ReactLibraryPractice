"use client";
import { gql, useQuery } from "@apollo/client"; 
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
  
  if (loading) return <p>loading</p>;
  if (error) {
    console.log(error);
    
    return <p>error</p>;
  }
  if (!data) return <p>no data</p>;
  

  return data.books.map((book:any)=>(
    <div key={book.title}>
        <p>{book.title}</p>
        <p>{book.author}</p>
        <hr />
    </div>
))
}
