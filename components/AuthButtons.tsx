'use client'
import getBooks from "@/actions/fetchBooks";
import login from "@/actions/login";
import logout from "@/actions/logout"; 
import { useState } from "react";

export default function AuthButtons() {
    const [books, setBooks] = useState<any[]>([])
    async function getBookHandler() {
        const data = await getBooks()
        setBooks(data.books)
    }
  return (
    <div>
        <button onClick={() =>logout()}>logout</button>
        <button onClick={() =>login({email: 'n@n.com', password: '1234', role:'USER'})}>login</button>
        <button onClick={getBookHandler}>getBooks</button>
        {books.map(book=>(
            <div key={book.title}>
                <p>{book.title}</p>
                <p>{book.author}</p>
                <hr />
            </div>
        ))}
    </div>
  )
}
