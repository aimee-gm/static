import fs from "fs";
import path from "path";
import { ensureDir } from "../utils/ensureDir";
import { FileData } from "../types";

export type ContentGenerator<T extends {}> = (
  abspath: string,
  data: T
) => string;

interface RenderOptions {
  outDir: string;
  postRender: (html: string) => string;
}

interface RegisteredPage {
  urlpath: string;
  content: ContentGenerator<any>;
  data?: any;
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
export function register<T>(
  urlpath: string,
  content: ContentGenerator<T>
): void {
  checkPath(urlpath);

  pages.push({ urlpath, content });
}

/**
 * Register a single page for static generation.
 * The data param will be passed to the content generator
 */
export function registerOne<T>(
  urlpath: string,
  data: T,
  content: ContentGenerator<T>
): void {
  checkPath(urlpath);

  pages.push({ urlpath, content, data });
}

/**
 * Register a collection of pages for static generation.
 * Each item in the collection will be passed to the content generator.
 * URLs are constructed using the prefix parameter and the relative path
 * of the source file to the base folder searched.
 */
export function registerAll<T extends FileData>(
  prefix: string,
  collection: T[],
  content: ContentGenerator<T>
) {
  collection.forEach(data => {
    const urlpath = path.join(prefix, data.relpath);
    registerOne(urlpath, data, content);
  });
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
    const content = postRender(page.content(abspath, page.data));
    console.log(`Writing ${filepath}`);
    fs.writeFileSync(filepath, content);
  }
}
