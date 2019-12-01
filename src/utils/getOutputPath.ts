import path from "path";

const regex = /^\/(.*)\/([^/]+\.html)?$/;

export function getOutputPath(basePath: string, input: string) {
  const isValid = Boolean(input.match(regex));

  if (!isValid) {
    throw new Error(`Cannot determine output file path for ${input}`);
  }

  const filePath = input.replace(/(\/)$/, "/index.html");

  return path.join(basePath, filePath);
}
