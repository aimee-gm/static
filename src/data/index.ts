import { glob } from "../utils/glob";
import { parseFrontMatter } from "./font-matter";
import { extname } from "path";
import { getRelativePath } from "../utils/getRelativePath";
import { parseYaml } from "./yaml";

type DataFileExt = "md" | "yml" | "yaml";

export interface FileData {
  filepath: string;
  relpath: string;
}

interface LoadDataFilesOpts {
  ext?: DataFileExt[];
}

function extractData(filepath: string, contents: string) {
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

export function loadDataFiles<T extends FileData>(
  basePath: string,
  opts: LoadDataFilesOpts = {}
): T[] {
  const options: Required<LoadDataFilesOpts> = { ext: ["md", "yml"], ...opts };

  const raw = glob(`${basePath}/**/*.{${options.ext.join()}}`);

  return raw.map(({ filepath, contents }) => {
    const relpath = getRelativePath(basePath, filepath);
    const data: T = extractData(filepath, contents);

    return {
      ...data,
      filepath,
      relpath
    };
  });
}
