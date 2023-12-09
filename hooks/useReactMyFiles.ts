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
  root: [],
  id: "",
  name: "loading",
  index: -1,
};

export default function useReactMyFiles({ endpoint, rootID }: paramType) {
  const { Query, Mutate, status } = useFetcher();
  const [rootDir, setRootDir] = useState(initial);

  useEffect(() => {
    if (endpoint)
      Query<directoryType>(endpoint, (data) => initializeDir(data), { root: rootID });
  }, []);
 
  function MapDirectory(dirs: directoryType) {
    const items: { dirItems: (fileType | folderType)[]; dir: directoryType }[] = [];
    mapper(dirs);
    function mapper(data: directoryType | null) {
      if (!data) return;
      const item: (fileType | folderType)[] = [];
      data.files.forEach((file) => (item[file.index] = file));
      data.folders.forEach((folder) => (item[folder.index] = folder));
      items.push({ dirItems: item, dir: data });
      mapper(data.opened);
    }
    return items;
  }

  function initializeDir(dir?: directoryType) {
    if (dir) setRootDir(dir);
  }

  function openDir(dir: directoryType, root: string) {
    setRootDir((state) => {
      const setTo = _openDir(state, root, dir);
      if (!state || !root || !setTo) return dir;
      else return setTo;
    });
  }
  function addDir(root: string, folder: folderType) {
    setRootDir((state) => {
      const toSet = _putFolder(state, root, folder);
      if (!state || !folder || !toSet) return state;
      else return toSet;
    });
  }
  function setDir(root: string, set: (dir:directoryType)=>void) {
    setRootDir((state) => {
      const toSet = _setDir(state, root, set);
      if (!state || !toSet) return state;
      else return toSet;
    });
  }
  function _openDir(
    stateDir: directoryType | null,
    id: string,
    dir: directoryType
  ): directoryType | null {
    if (stateDir === null) return stateDir;
    if (stateDir.id == id) stateDir.opened = dir;
    else _openDir(stateDir.opened, id, dir);
    return stateDir;
  }
  function _putFolder(
    stateDir: directoryType | null,
    id: string,
    folder: folderType
  ): directoryType | null {
    if (stateDir === null) return stateDir;
    if (stateDir.id == id) stateDir.folders.push(folder);
    else _putFolder(stateDir.opened, id, folder);
    return stateDir;
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

  const directories = MapDirectory(rootDir);

  const addFolder = async (root: string, index: number) => {
    await Mutate< { data: folderType | null; message: string; success: boolean } > ( 
      "POST", endpoint, (data) => { 
        if (data.data) addDir(root, data.data) 
      },{ root, index, name: "new Folder", type: "public" }
    );
  };

  const openFolder = async (folderID: string, rootID: string) => {
    await Query<directoryType | null>(
      endpoint, (data) => {
        if (data) openDir(data, rootID);
      }, { root: folderID }
    );
  };

  const renameFolder =  async (rootID: string, name: string) => {
    await Mutate<responceType<directoryType>>(
      "PATCH", endpoint, (data) => {
        if(data.success) setDir(rootID, (dir) => dir.name=name)
      }, { root:  rootID, name, type: 'Rename' }
    );
  }

  function getFolderProps(dir: directoryType, item: fileType | folderType) {
    return {
      onOpen() {
        const opened = dir.opened && dir.opened.id == item.id
        if(!opened) openFolder(item.id, dir.id) 
      },
      onRename(name: string) {
        renameFolder(item.id, name)
      }
    }
  }
  function getFileProps(dir: directoryType, item: fileType | folderType) {
    return {
      onOpen() {
        console.log('clist');
      },
      onRename(name: string) {
        renameFolder(dir.id, name)
      }
    }
  }

  return { directories, openFolder, addFolder, status, renameFolder, getFolderProps, getFileProps };
}
