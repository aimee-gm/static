import path from "path";

export function getRelativePath(baseDir: string, filepath: string): string {
  return path.relative(baseDir, filepath.replace(/(\/index)?\.[a-z]+$/, ""));
}
