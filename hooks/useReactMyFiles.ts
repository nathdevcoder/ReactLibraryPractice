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
  const [holding, setHolding] = useState<{id: string, root: string, type: 'copy' | 'cut' | 'stale'}>({id: '', root: '', type: 'stale'})

  useEffect(() => {
    if (endpoint)
      Query<directoryType>(endpoint, (data) => initializeDir(data), { root: rootID });
  }, []);
 
  function MapDirectory(dirs: directoryType) {
    const items: { dirItems: (fileType | folderType)[]; dir: directoryType, length: number }[] = [];
    const bread: string [] = []
    mapper(dirs);
    function mapper(data: directoryType | null) {
      if (!data) return;
      const item: (fileType | folderType)[] = [];
      data.files.forEach((file) => (item[file.index] = file));
      data.folders.forEach((folder) => (item[folder.index] = folder));
      items.push({ dirItems: item, dir: data, length: item.length });
      bread.push(data.name)
      mapper(data.opened);
    }
    return {directories:items, breadcrumbs: bread};
  }

  function initializeDir(dir?: directoryType) {
    if (dir) setRootDir(dir);
  }

  function setDir(root: string, sets: ((dir:directoryType)=>void) | ((dir:directoryType)=>void)[]) {
    setRootDir((state) => { 
      if(sets instanceof Array) {
        const roots = root.split(':')
        sets.forEach((set, i) => _setDir(state, roots[i], set))
      } else _setDir(state, root, sets);
      if (!state) return state;
      else return state;
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

  const reSpaceFolder = async (newRoot: string, lastRoot: string, copiedId: string, type: "cut" | "copy" | 'move', index: number) => {
    await Mutate<responceType<{id: string, name: string}| null>>(
      "PUT", endpoint, (data) => {
        const {success, data: result} = data 
        if(success && result ) { 
          setDir( `${newRoot}:${lastRoot}:${copiedId}`, [
            (dir) => { 
              if( type !== 'move') {
                dir.folders.push({
                  id: result.id, 
                  index, 
                  type: 'public', 
                  dir: 'folder', 
                  name: result.name
                })
              }
            }, 
            (dir) => {
              if(type === 'cut') dir.folders = dir.folders.filter(fd=> fd.id !== copiedId)
            }, 
            (dir) => {
              if(type === 'cut') {
                dir.id = result.id
                dir.root = newRoot
                console.log(dir); 
              }
            }
          ])
          setHolding({id:'',root: '', type: 'stale'})
        }
      }, { newRoot, copiedId, type, index }
    )
  }

  function getItemProps(dir: directoryType, item: fileType | folderType, length: number): dirItemProps {
    if(item.dir === 'folder') {
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
          const opened = dir.opened && dir.opened.id == item.id && type === 'cut'
          if(opened) setDir(dir.id, (dir) => {
            dir.opened = null
          })
          setHolding({id: item.id, root: dir.id, type})
        },
        onPaste() { 
          if(!holding.id || !holding.root || holding.root === dir.id || holding.type === 'stale') return 
          reSpaceFolder(dir.id, holding.root, holding.id, holding.type, length)
        },
        selected: dir.opened?.id === item.id,
        disable: item.id === holding.id,
        isHolding: Boolean(holding.id)
      }
    } else {
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
        disable: false,
        isHolding: false
      }
    }
  }
 

  function getActionProps(dir: directoryType, length: number) {
    return {
      isHolding: Boolean(holding.id),
      onAddFolder() {
        addFolder(dir.id, length)
      },
      onPaste() {
        if(!holding.id || !holding.root || holding.root === dir.id || holding.type === 'stale') return
        reSpaceFolder(dir.id, holding.root, holding.id, holding.type, length)
      },
    }
  }

  return { directories, breadcrumbs, openFolder, addFolder, status, renameFolder, getItemProps, getActionProps  };
}
