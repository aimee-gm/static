import { extname } from "path";

import { glob } from "../utils/glob";
import { parseFrontMatter } from "./font-matter";
import { getRelativePath } from "../utils/getRelativePath";
import { parseYaml } from "./yaml";

type DataFileExt = "md" | "yml" | "yaml";

export interface FileData {
  filepath: string;
  relpath: string;
}

interface LoadDataFilesOpts {
  ext?: DataFileExt[];
  castToFolder?: boolean;
}

function extractData(filepath: string, contents: string): {} {
  const ext = extname(filepath);

  switch (ext) {
    case ".md":
      return parseFrontMatter(contents);
    case ".yml":
    case ".yaml":
      return parseYaml(contents);
  }

  throw new Error(`Cannot extract data from unknown extension ${ext}`);
}

export function loadDataFiles<T extends {}>(
  basePath: string,
  opts: LoadDataFilesOpts = {}
): (T & FileData)[] {
  const { ext, castToFolder }: Required<LoadDataFilesOpts> = {
    ext: ["md", "yml"],
    castToFolder: true,
    ...opts
  };

  const raw = glob(`${basePath}/**/*.{${ext.join()}}`);

  return raw.map(({ filepath, contents }) => {
    const data = extractData(filepath, contents) as T;

    return {
      ...data,
      filepath,
      relpath: getRelativePath(basePath, filepath, castToFolder)
    };
  });
}
