const directories = {
    id: '1',
    index: 1,
    files: [
      {id: 'f1', index: 1, name: 'video.mp4', type: 'video'},
      {id: 'f2', index: 5, name: 'image.jpg', type: 'image'},
      {id: 'f3', index: 4, name: 'audio.mp3', type: 'audio'},
    ],
    folders: [
      {id: 'fd1', index: 3, name: 'folder1', type: 'public'},
      {id: 'fd1', index: 2, name: 'folder2', type: 'public'},
    ], 
    name: 'root Folder',
    root: ["root"],
    opened: {
      id: '2',
      index: 1,
      files: [
        {id: '2f1', index: 1, name: 'video.mp4', type: 'video'},
        {id: '2f2', index: 5, name: 'image.jpg', type: 'image'},
        {id: '2f3', index: 4, name: 'audio.mp3', type: 'audio'},
        {id: '2f4', index: 6, name: 'doc.docs', type: 'docs'},
        {id: '2f5', index: 7, name: 'pdf.pdf', type: 'pdfs'},
      ],
      folders: [
        {id: '2fd1', index: 3, name: 'folder3', type: 'public'},
        {id: '2fd7', index: 2, name: 'folder10', type: 'locked'},
        {id: '2fd5', index: 10, name: 'folder11', type: 'private'},
        {id: '2fd8', index: 9, name: 'folder9', type: 'hidden'},
        {id: '2fd9', index: 8, name: 'folder8', type: 'public'},
      ], 
      opened: null,
      root: ['1'],
      name: 'folder 1'
    }
} as directoryType

export default directories