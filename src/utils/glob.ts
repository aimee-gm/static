import fs from "fs";
import { sync } from "glob";

interface GlobResult {
  filepath: string;
  contents: string;
}

export function glob(pattern: string): GlobResult[] {
  const filepaths = sync(pattern);
  return filepaths.map(filepath => ({
    filepath,
    contents: fs.readFileSync(filepath, "utf8")
  }));
}
