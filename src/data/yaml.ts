import yaml from "js-yaml";

import { glob } from "../utils/glob";
import { getRelativePath } from "../utils/getRelativePath";
import { FileData } from "../types";

export function loadYamlData<T extends FileData>(
  basePath: string,
  type: string
): T[] {
  const raw = glob(`${basePath}/**/*.{yaml,yml}`);

  return raw.map(({ filepath, contents }) => {
    const parsed = yaml.safeLoad(contents);
    const relpath = getRelativePath(basePath, filepath);

    return {
      ...parsed,
      type,
      filepath,
      relpath,
    };
  });
}
