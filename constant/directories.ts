const directories = {
    id: '1',
    index: 1,
    files: [
      {id: 'f1', index: 1, name: 'video.mp4', type: 'video', dir: 'file'},
      {id: 'f2', index: 5, name: 'image.jpg', type: 'image', dir: 'file'},
      {id: 'f3', index: 4, name: 'audio.mp3', type: 'audio', dir: 'file'},
    ],
    folders: [
      {id: 'fd1', index: 3, name: 'folder1', type: 'public', dir: 'folder'},
      {id: 'fd1', index: 2, name: 'folder2', type: 'public', dir: 'folder'},
    ], 
    name: 'root Folder',
    root: ["root"],
    opened: {
      id: '2',
      index: 1,
      files: [
        {id: '2f1', index: 1, name: 'video.mp4', type: 'video', dir: 'file'},
        {id: '2f2', index: 5, name: 'image.jpg', type: 'image', dir: 'file'},
        {id: '2f3', index: 4, name: 'audio.mp3', type: 'audio', dir: 'file'},
        {id: '2f4', index: 6, name: 'doc.docs', type: 'docs',dir: 'file'},
        {id: '2f5', index: 7, name: 'pdf.pdf', type: 'pdfs',dir: 'file'},
      ],
      folders: [
        {id: '2fd1', index: 3, name: 'folder3', type: 'public', dir: 'folder'},
        {id: '2fd7', index: 2, name: 'folder10', type: 'locked', dir: 'folder'},
        {id: '2fd5', index: 10, name: 'folder11', type: 'private', dir: 'folder'},
        {id: '2fd8', index: 9, name: 'folder9', type: 'hidden', dir: 'folder'},
        {id: '2fd9', index: 8, name: 'folder8', type: 'public', dir: 'folder'},
      ], 
      opened: null,
      root: ['1'],
      name: 'folder 1'
    }
} as directoryType

export default directories