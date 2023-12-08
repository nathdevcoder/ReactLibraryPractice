import React, { ReactNode, useCallback, useMemo } from "react";

 
type MyFilesType = {
  fileComponents: FileComponentType;
  folderComponents: folderComponentType;
  root: directoryType;
};

export default function useReactMyFilesv2({
  fileComponents,
  folderComponents,
  root,
}: MyFilesType) {



  const directories = useMemo(() => mapper(root), [root]);

  const mapper = useCallback(function MapDirectory(dirs: directoryType) {
    const items: { dirItems: ReactNode[]; dir: directoryType }[] = [];
    mapper(dirs);
    function mapper(data: directoryType | null) {
      if (!data) return;
      const item: ReactNode[] = [];
      data.files.forEach((file) => {
        item[file.index] = fileComponents[file.type](file);
      });
      data.folders.forEach((folder) => {
        item[folder.index] = folderComponents[folder.type](folder);
      });
      items.push({ dirItems: item, dir: data });
      mapper(data.opened);
    }
    return items;
  }, []);
  return {directories};
}
