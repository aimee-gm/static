import path from "path";

export function getRelativePath(
  baseDir: string,
  filepath: string,
  castToFolder = true
): string {
  const relpath = path.relative(baseDir, filepath.replace(/\.[a-z]+$/, ""));

  if (relpath === "index") {
    return "/";
  }

  if (relpath.match(/index$/)) {
    return `/${relpath.replace(/index$/, "")}`;
  }

  return `/${relpath}${castToFolder ? "/" : ""}`;
}
