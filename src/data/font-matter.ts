import frontMatter from "front-matter";

import { glob } from "../utils/glob";
import { getRelativePath } from "../utils/getRelativePath";
import { FileData } from "../types";

interface FrontMatterOptions {
  ext?: string;
}

interface FrontMatterFileData extends FileData {
  body: string;
}

export function loadFrontMatter<T extends FrontMatterFileData>(
  basePath: string,
  type: string,
  opts: FrontMatterOptions = {}
): T[] {
  const { ext } = { ext: "md", ...opts };

  const raw = glob(`${basePath}/**/*.${ext}`);

  return raw.map(({ filepath, contents }) => {
    const { body, attributes: parsed } = frontMatter(contents);

    const relpath = getRelativePath(basePath, filepath);

    return {
      filepath,
      ...parsed,
      body,
      type,
      relpath,
    };
  });
}
