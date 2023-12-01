type fileType = {
    name: string
    id: string
    index: number
    type: 'video' | 'image' | 'docs' | 'pdfs' | 'audio' | 'others'
}
type folderType = {
    files: fileType[]
    folders: folderType[]
    id: string
    name: string
    index: number
    opened: folderType | null
    root: string | 'root'
}

 