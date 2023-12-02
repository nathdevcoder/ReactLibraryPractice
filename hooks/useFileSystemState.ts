import { setDir } from "@/utils/setter";
import axios from "axios";
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

  async function fetchDir(id: string, root?: string) {
    try {
      setStatus({ loading: true, error: "" });
      const { data, status } = await axios.get<directoryType | null>(
        "api/directory?root=" + id
      );
      if (status === 200) {
        if (data) {
          if(!root)setDirectories(data); 
          else setDirectories(state => {
            if(!state || !root) return data
            else return setDir(state, root, data) 
          })
          setStatus({ loading: false, error: "" });
        } else {
          setStatus({ loading: false, error: "noData Found" });
        }
      } else throw Error("something went wrong");
    } catch (error: any) {
      setStatus({ loading: false, error: "Something went wrong" });
    }
  }
  return { status, directories, fetchDir };
}
