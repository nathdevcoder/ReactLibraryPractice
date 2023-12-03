export function setDir(stateDir: directoryType | null, id: string, dir: directoryType): directoryType | null {  
    if(stateDir === null) return stateDir
    if(stateDir.id == id) stateDir.opened = dir
    else setDir(stateDir.opened, id, dir)
    return stateDir
}

export function putFolder(stateDir: directoryType | null, id: string, folder: folderType): directoryType | null {  
    if(stateDir === null) return stateDir
    if(stateDir.id == id) stateDir.folders.push(folder)
    else putFolder(stateDir.opened, id, folder)
    return stateDir
}