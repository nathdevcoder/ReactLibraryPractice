type dirItemType = {
    name: string
    id: string
    index: number
}

type fileType = dirItemType & { 
    type: 'video' | 'image' | 'docs' | 'pdfs' | 'audio' | 'others'
}
type folderType = dirItemType & {   
    type: 'locked' | 'public' | 'private' | 'hidden'
}

type directoryType = {
    files: fileType[]
    folders: folderType[]
    id: string
    name: string
    index: number
    opened: directoryType | null
    root: string | 'root'
}
 