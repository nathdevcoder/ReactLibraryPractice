import axios, { AxiosResponse } from 'axios';
import  { useState } from 'react'

export default function useFetcher() {
    const [status, setStatus] = useState<{ loading: boolean; error: string }>({
        loading: false,
        error: "",
      });
    async function fetcher<T>({ Caller, Successor }:{
        Caller: () => Promise<AxiosResponse<T>>
        Successor: (data: T) => void
      }) {
        try {
          setStatus({ loading: true, error: "" });
          const { data, status } = await Caller()
          if (status === 200) {
            if (data) {
              Successor(data)
              setStatus({ loading: false, error: "" });
            } else {
              setStatus({ loading: false, error: "noData Found" });
            }
          } else throw Error("something went wrong");
        } catch (error: any) { 
            console.log(error);
            
          setStatus({ loading: false, error: "Something went wrong" });
        }
      }

      async function Get<T>(url: string, onSuccess: (data: T) => void, params?: any) {
        await fetcher<T>({
          Caller: () => axios.get(url, {params: params}),
          Successor: onSuccess
        }) 
      }
      async function Post<T, P>(url: string, onSuccess: (data:T) => void, payload?: P) {
        await fetcher<T>({
          Caller: () => axios.post(url, payload),
          Successor:  onSuccess
        }) 
      }
    
  return {fetcher, status, Get, Post, }
}
