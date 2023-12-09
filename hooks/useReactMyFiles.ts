import { useEffect, useState } from "react";
import useFetcher from "./useFetcher";

type paramType = {
  endpoint: string;
  rootID: string;
};

const initial: directoryType = {
  opened: null,
  files: [],
  folders: [],
  root: '',
  id: "",
  name: "loading",
  index: -1,
};

export default function useReactMyFiles({ endpoint, rootID }: paramType) {
  const { Query, Mutate, status } = useFetcher();
  const [rootDir, setRootDir] = useState(initial);
  const [holding, setHolding] = useState<{id: string, type: 'copy' | 'cut' | 'stale'}>({id: '', type: 'stale'})

  useEffect(() => {
    if (endpoint)
      Query<directoryType>(endpoint, (data) => initializeDir(data), { root: rootID });
  }, []);
 
  function MapDirectory(dirs: directoryType) {
    const items: { dirItems: (fileType | folderType)[]; dir: directoryType }[] = [];
    const bread: string [] = []
    mapper(dirs);
    function mapper(data: directoryType | null) {
      if (!data) return;
      const item: (fileType | folderType)[] = [];
      data.files.forEach((file) => (item[file.index] = file));
      data.folders.forEach((folder) => (item[folder.index] = folder));
      items.push({ dirItems: item, dir: data });
      bread.push(data.name)
      mapper(data.opened);
    }
    return {directories:items, breadcrumbs: bread};
  }

  function initializeDir(dir?: directoryType) {
    if (dir) setRootDir(dir);
  }

  function setDir(root: string, set: (dir:directoryType)=>void) {
    setRootDir((state) => {
      const toSet = _setDir(state, root, set);
      if (!state || !toSet) return state;
      else return toSet;
    });
  }
  function _setDir(
    stateDir: directoryType | null,
    id: string,
    set: (dir:directoryType) => void
    ): directoryType | null {
      if (stateDir === null) return stateDir;
      if (stateDir.id == id) set(stateDir) 
      else _setDir(stateDir.opened, id, set)
      return stateDir
  }

  const { directories, breadcrumbs} = MapDirectory(rootDir);

  const addFolder = async (root: string, index: number) => {
    await Mutate< { data: folderType | null; message: string; success: boolean } > ( 
      "POST", endpoint, (data) => { 
        if(!data.success) return
        const folder = data.data
        if (folder) setDir(root, (dir) => { 
          dir.folders.push(folder)
        })  
      },{ root, index, name: "new Folder", type: "public" }
    );
  };

  const openFolder = async (folderID: string, rootID: string) => {
    await Query<directoryType | null>(
      endpoint, (data) => { 
        if(data) setDir(rootID, (dir)=> {
          dir.opened = data
        })
      }, { root: folderID }
    );
  };

  const renameFolder =  async (rootID: string, name: string) => {
    await Mutate<responceType<directoryType>>(
      "PATCH", endpoint, (data) => {
        if(data.success) setDir(rootID, (dir) => {
          dir.name = name
        })
      }, { root:  rootID, name, type: 'Rename' }
    );
  }

  const deleteFolder = async (rootID: string, id: string) => {
    await Mutate<responceType<string>>(
      "DELETE", endpoint+'?id='+id, (data) => {
        if(data.success) setDir(rootID, (dir) => {
          dir.folders = dir.folders.filter(ft=>ft.id !== id)
          if(dir.opened?.id === id) {
            dir.opened = null
          }
        })
      }
    )
  }

  function getFolderProps(dir: directoryType, item: fileType | folderType) {
    return {
      onOpen() {
        const opened = dir.opened && dir.opened.id == item.id
        if(!opened) openFolder(item.id, dir.id) 
      },
      onRename(name: string) {
        renameFolder(item.id, name)
      },
      onDelete() {
        deleteFolder(dir.id, item.id)
      },
      onHold(type: 'copy' | 'cut') {
        const opened = dir.opened && dir.opened.id == item.id
        if(opened) setDir(dir.id, (dir) => {
          dir.opened = null
        })
        setHolding({id: item.id, type})
      },
      onPaste() {
        setHolding({id:'', type: 'stale'})
      },
      selected: dir.opened?.id === item.id,
      disable: item.id === holding.id
    }
  }
  function getFileProps(dir: directoryType, item: fileType | folderType) {
    return {
      onOpen() {
        console.log('clist');
      },
      onRename(name: string) {
        console.log(name);
      },
      onDelete( ) {
        console.log('name');
      },
      onHold(type: 'copy' | 'cut') {
        console.log(type);
      },
      onPaste() {
        console.log('name'); 
      },
      selected: false,
      disable: false
    }
  }

  return { directories, breadcrumbs, openFolder, addFolder, status, renameFolder, getFolderProps, getFileProps };
}
