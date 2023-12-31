type dirItemType = {
    name: string
    id: string
    index: number
}
type folderTypeType = 'locked' | 'public' | 'private' | 'hidden'
type fileTypeType = 'video' | 'image' | 'docs' | 'pdfs' | 'audio' | 'others'

type fileType = dirItemType & { 
    type: fileTypeType
    dir: 'file'
}
type folderType = dirItemType & {   
    type: folderTypeType
    dir: 'folder'
}

type directoryType = {
    files: fileType[]
    folders: folderType[]
    id: string
    name: string
    index: number
    opened: directoryType | null
    root: string
}

type FileComponentType = Record<fileTypeType, (fl:fileType)=>React.ReactNode>
type folderComponentType = Record<folderTypeType, (fl:folderType)=>React.ReactNode>

type DirType<t> = {component:t[], props: {id: string, name: string, length: number}}[]

type dirItemProps = {
    onOpen(): void;
    onRename(name: string): void;
    onDelete(): void;
    onHold(type: "copy" | "cut"): void;
    onPaste(): void;
    selected: boolean;
    disable: boolean;
    isHolding: boolean;
}
type dirTypes = folderType | fileType
type dirActionProps = {
    isHolding: boolean;
    onAddFolder(): void;
    onPaste(): void;
}