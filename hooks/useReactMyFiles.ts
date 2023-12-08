import { useEffect, useState } from "react";
import useFetcher from "./useFetcher";

type hookType = {
      openDir: (dir: directoryType, root: string) => void;
      addDir: (root: string, folder: folderType) => void;
      setDir: (dir?: directoryType) => void;
      directories: {
        dirItems: (fileType | folderType)[];
        dir: directoryType;
      }[];
      type: 'normal'
    } | {
      directories: {
        dirItems: (fileType | folderType)[];
        dir: directoryType;
      }[];
      addFolder: (root: string, index: number) => Promise<void>;
      openFolder: (folderID: string, rootID: string) => Promise<void>;
      status: { loading: boolean; error: string };
      type: 'apied'
    };
type paramType = {
  root?: directoryType;
  endpoint?: string;
  rootID?: string;
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

export default function useReactMyFiles({ root, endpoint, rootID }: paramType): hookType {
  const { Post, Get, status } = useFetcher();
  const [rootDir, setRootDir] = useState(root || initial);

  useEffect(() => {
    if (endpoint)
      Get<directoryType>(endpoint, (data) => setDir(data), { root: rootID });
  }, []);

  const directories = MapDirectory(rootDir);
  function MapDirectory(dirs: directoryType) {
    const items: { dirItems: (fileType | folderType)[]; dir: directoryType }[] =
      [];
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

  function setDir(dir?: directoryType) {
    if (dir) setRootDir(dir);
  }

  function openDir(dir: directoryType, root: string) {
    setRootDir((state) => {
      const setTo = _setDir(state, root, dir);
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
  function _setDir(
    stateDir: directoryType | null,
    id: string,
    dir: directoryType
  ): directoryType | null {
    if (stateDir === null) return stateDir;
    if (stateDir.id == id) stateDir.opened = dir;
    else _setDir(stateDir.opened, id, dir);
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

  if (endpoint) {
    const apied: {
      addFolder: (root: string, index: number) => Promise<void>;
      openFolder: (folderID: string, rootID: string) => Promise<void>;
      status: { loading: boolean; error: string };
    } = {
      addFolder: async (root: string, index: number) => {
        await Post<
          { data: folderType | null; message: string; success: boolean },
          any
        >(
          endpoint,
          (data) => {
            if (data.data) addDir(root, data.data);
          },
          { root, index, name: "new Folder", type: "public" }
        );
      },
      openFolder: async (folderID: string, rootID: string) => {
        await Get<directoryType | null>(
          endpoint,
          (data) => {
            if (data) openDir(data, rootID);
          },
          { root: folderID }
        );
      },
      status: status,
    };
    return { directories, ...apied, type: 'apied' };
  } else {
    return { directories, openDir, addDir, setDir, type: 'normal' };
  }
}
