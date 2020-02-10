import frontMatter from "front-matter";

export function parseFrontMatter(contents: string) {
  const { body, attributes: parsed } = frontMatter(contents);
  return { ...parsed, body };
}
