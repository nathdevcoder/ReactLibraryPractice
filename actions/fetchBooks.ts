"use server";

import client from "@/client";
import { gql } from "@apollo/client";

export default async function getBooks() {
  const newClient = await client();
  const result = await newClient.query({
    query: gql`
      query Books {
        books {
          title 
        }
      }
    `,
  });
  return result.data
}
