import { createId } from "@/utils/Keeper";

const directories: { [key: string]: directoryType } = {
  akfnr: {
    id: "akfnr",
    index: 1,
    files: [
      { id: "f1", index: 1, name: "video.mp4", type: "video", dir: 'file' },
      { id: "f2", index: 5, name: "image.jpg", type: "image", dir: 'file' },
      { id: "f3", index: 4, name: "audio.mp3", type: "audio", dir: 'file' },
    ],
    folders: [
      { id: "fd123", index: 3, name: "Folder sample", type: "public" , dir: 'folder'},
      { id: "img123", index: 2, name: "Images Folder", type: "public", dir: 'folder' },
    ],
    name: "root Folder",
    root: ["root"],
    opened: null,
  },
  fd123: {
    id: "fd123",
    index: 1,
    files: [
      { id: "2f1", index: 1, name: "video.mp4", type: "video", dir: 'file' },
      { id: "2f2", index: 5, name: "image.jpg", type: "image", dir: 'file' },
      { id: "2f3", index: 4, name: "audio.mp3", type: "audio", dir: 'file' },
      { id: "2f4", index: 6, name: "doc.docs", type: "docs", dir: 'file' },
      { id: "2f5", index: 7, name: "pdf.pdf", type: "pdfs" , dir: 'file'},
    ],
    folders: [
      { id: "vdo123", index: 3, name: "Video Folder", type: "public", dir: 'folder' },
      { id: "adu123", index: 2, name: "Audio Folder", type: "locked", dir: 'folder' },
      { id: "dca123", index: 10, name: "Documents Folder", type: "private", dir: 'folder' },
      { id: "pdf123", index: 9, name: "Pdfs Folder", type: "hidden", dir: 'folder'},
      { id: "new123", index: 8, name: "folder new", type: "public", dir: 'folder' },
    ],
    opened: null,
    root: ["akfnr"],
    name: "Folder sample",
  },
  img123: {
    id: "img123",
    index: 2,
    files: [
      { id: "2f2", index: 1, name: "image.jpg", type: "image", dir: 'file' },
      { id: "2f3", index: 2, name: "image.jpg", type: "image", dir: 'file' },
      { id: "2f4", index: 3, name: "image.jpg", type: "image", dir: 'file' },
      { id: "2f5", index: 4, name: "image.jpg", type: "image", dir: 'file' },
      { id: "2f6", index: 5, name: "image.jpg", type: "image", dir: 'file' },
    ],
    folders: [],
    opened: null,
    root: ["akfnr"],
    name: "Images Folder",
  },
  vdo123: {
    id: "vdo123",
    index: 3,
    files: [
      { id: "2v2", index: 1, name: "video.mp4", type: "video", dir: 'file' },
      { id: "2v3", index: 2, name: "video.mp4", type: "video", dir: 'file' },
      { id: "2v4", index: 3, name: "video.mp4", type: "video", dir: 'file' },
      { id: "2v5", index: 4, name: "video.mp4", type: "video", dir: 'file' },
      { id: "2v6", index: 5, name: "video.mp4", type: "video", dir: 'file' },
    ],
    folders: [],
    opened: null,
    root: ["fd12"],
    name: "Video Folder",
  },
  adu123: {
    id: "adu123",
    index: 2,
    files: [
      { id: "3d2", index: 1, name: "audio.mp3", type: "audio", dir: 'file' },
      { id: "3d3", index: 2, name: "audio.mp3", type: "audio", dir: 'file' },
      { id: "3d4", index: 3, name: "audio.mp3", type: "audio", dir: 'file' },
      { id: "3d5", index: 4, name: "audio.mp3", type: "audio", dir: 'file' },
      { id: "3d6", index: 5, name: "audio.mp3", type: "audio", dir: 'file' },
    ],
    folders: [],
    opened: null,
    root: ["fd12"],
    name: "Audio Folder",
  },
  dca123: {
    id: "dca123",
    index: 10,
    files: [
      { id: "3d2", index: 1, name: "doc.docs", type: "docs", dir: 'file' },
      { id: "3d3", index: 2, name: "doc.docs", type: "docs", dir: 'file' },
      { id: "3d4", index: 3, name: "doc.docs", type: "docs", dir: 'file' },
      { id: "3d5", index: 4, name: "doc.docs", type: "docs", dir: 'file' },
      { id: "3d6", index: 5, name: "doc.docs", type: "docs", dir: 'file' },
    ],
    folders: [],
    opened: null,
    root: ["fd12"],
    name: "Documents Folder",
  },
  pdf123: {
    id: "pdf123",
    index: 9,
    files: [
      { id: "3d2", index: 1, name: "pdf.pdf", type: "pdfs", dir: 'file' },
      { id: "3d3", index: 2, name: "pdf.pdf", type: "pdfs", dir: 'file' },
      { id: "3d4", index: 3, name: "pdf.pdf", type: "pdfs", dir: 'file' },
      { id: "3d5", index: 4, name: "pdf.pdf", type: "pdfs", dir: 'file' },
      { id: "3d6", index: 5, name: "pdf.pdf", type: "pdfs", dir: 'file' },
    ],
    folders: [],
    opened: null,
    root: ["fd12"],
    name: "Pdfs Folder",
  },
  new123: {
    id: "new123",
    index: 8,
    files: [],
    folders: [],
    opened: null,
    root: ["fd12"],
    name: "New Folder",
  },
};

export function getDirectory(id: string): directoryType | undefined   {
  return directories[id]
}
export function deleteDirectory(id: string): boolean  {
  try {
    if(directories[id]) {
      const folders = directories[id].folders
      folders.forEach(fd=>{
        const newRoot = directories[fd.id]?.root.filter(fl=> fl !== id)
        const deletable = newRoot.length === 0
        if(deletable) delete directories[fd.id]
        else directories[fd.id].root = newRoot
      })
      delete directories[id]
      return true
    } else return false
  } catch (error) {
    return false
  }
}
export function setDirectory(id: string, dir: directoryType): directoryType | undefined {
  if(directories[id]) {
    directories[id] = dir
    return dir
  } else return undefined 
}
export function addDirectory(root: string, name: string, index: number, type: folderTypeType): folderType | undefined {
    if(!directories[root]) return undefined
   const newid = createId()
   const newDir: directoryType = {
    files: [],
    folders: [],
    opened: null,
    root: [root],
    id: newid,
    name,
    index,
   }
   const newFolder: folderType = {id: newid, name, index, type, dir: "folder"}
   directories[root].folders.push(newFolder)
   directories[newid] = newDir 
   return newFolder
}
