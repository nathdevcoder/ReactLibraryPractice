type dirItemType = {
    name: string
    id: string
    index: number
}
type folderTypeType = 'locked' | 'public' | 'private' | 'hidden'
type fileTypeType = 'video' | 'image' | 'docs' | 'pdfs' | 'audio' | 'others'

type fileType = dirItemType & { 
    type: fileTypeType
}
type folderType = dirItemType & {   
    type: folderTypeType
}

type directoryType = {
    files: fileType[]
    folders: folderType[]
    id: string
    name: string
    index: number
    opened: directoryType | null
    root: string[]
}
 

type DirType<t> = {component:t[], props: {id: string, name: string, length: number}}[]