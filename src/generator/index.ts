import fs from "fs";
import path from "path";
import { ensureDir } from "../utils/ensureDir";

export type ContentGenerator = (abspath: string) => string;

interface RenderOptions {
  outDir: string;
  postRender: (html: string) => string;
}

interface RegisteredPage {
  urlpath: string;
  content: ContentGenerator;
}

const pages: RegisteredPage[] = [];

function makeFilepath(outDir: string, abspath: string) {
  return path.resolve(outDir, abspath.replace(/^\//, "./"), "index.html");
}

function makeAbspath(urlpath: string) {
  return urlpath.replace(/^(.?\/?)/, "/").replace(/(\/?)$/, "/");
}

function checkPath(urlpath: string) {
  if (pages.some(p => p.urlpath === urlpath)) {
    console.error(`Unable to register ${urlpath}: already exists`);
    process.exit(1);
  }
}

/**
 *  Register a single page for static generation
 */
export function register(
  urlpath: string,
  content: ContentGenerator
): void {
  checkPath(urlpath);

  pages.push({ urlpath, content });
}

/**
 * Render all registered pages to static HTML files.
 */
export function render(opts: Partial<RenderOptions> = {}) {
  const { outDir, postRender } = {
    outDir: process.cwd(),
    postRender: (val: string) => val,
    ...opts
  };

  while (pages.length) {
    const page = pages.pop();

    if (!page) {
      break;
    }

    const abspath = makeAbspath(page.urlpath);
    const filepath = makeFilepath(outDir, abspath);
    ensureDir(filepath);
    const content = postRender(page.content(abspath));
    console.log(`Writing ${filepath}`);
    fs.writeFileSync(filepath, content);
  }
}
