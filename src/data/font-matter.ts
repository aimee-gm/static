import frontMatter from "front-matter";

interface FrontMatter {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  body: string;
}

export function parseFrontMatter(contents: string): FrontMatter {
  const { body, attributes: parsed } = frontMatter(contents);
  return { ...parsed, body };
}
