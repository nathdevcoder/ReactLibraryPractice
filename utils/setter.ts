export function setDir(stateDir: directoryType | null, id: string, dir: directoryType): directoryType | null {  
    if(stateDir === null) return stateDir
    if(stateDir.id == id) stateDir.opened = dir
    else setDir(stateDir.opened, id, dir)
    return stateDir
}