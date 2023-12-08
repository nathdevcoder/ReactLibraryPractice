import { putFolder, setDir } from "@/utils/setter";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function useFileSystemState() {
  const [directories, setDirectories] = useState<directoryType|null>();
  const [status, setStatus] = useState<{ loading: boolean; error: string }>({
    loading: false,
    error: "",
  });

  useEffect(() => {
    fetchDir("akfnr");
  }, []);

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
      setStatus({ loading: false, error: "Something went wrong" });
    }
  }

  async function fetchDir(id: string, root?: string) {
    await fetcher<directoryType | null>({
      Caller: () => axios.get( "api/directory?root=" + id),
      Successor: (data) => {
        if(!root || !data)setDirectories(data); 
        else setDirectories(state => {
          if(!state || !root) return data
          else return setDir(state, root, data) 
        })
      }
    }) 
  }
  async function addDir(root: string, index: number) {
    await fetcher<{data:folderType | null, message: string, success: boolean}>({
      Caller: () => axios.post("api/directory", {  root, index, name: 'new Folder', type: 'public' } ),
      Successor: ({data}) => {
        setDirectories(state => {  
          if(!state || !data) return state 
          else return putFolder(state, root, data)
        })
      }
    }) 
  }
  return { status, directories, fetchDir, addDir };
}
