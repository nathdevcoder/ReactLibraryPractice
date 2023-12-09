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

      async function Query<T>(url: string, onSuccess: (data: T) => void, params?: any) {
        await fetcher<T>({
          Caller: () => axios.get(url, {params: params}),
          Successor: onSuccess
        }) 
      }
      async function Mutate<T>(
        type: "POST" | "PUT" | "PATCH" | "DELETE" = 'POST', 
        url: string, 
        onSuccess: (data:T) => void, 
        payload?: any
        ) {
        await fetcher<T>({
          Caller: () => {
            if(type === 'DELETE') return axios.delete(url, payload)
            if(type === 'PATCH') return axios.patch(url, payload)
            if(type === 'PUT') return axios.put(url, payload)
            return axios.post(url, payload)
          },
          Successor:  onSuccess
        }) 
      }
    
  return {fetcher, status, Mutate, Query }
}
