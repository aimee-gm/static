import fs from "fs";
import { ensureDir } from "../utils/ensureDir";
import { getOutputPath } from "../utils/getOutputPath";

interface PageToRender {
  path: string;
  render: (abspath: string) => string;
}

interface RenderOptions {
  pages: PageToRender[];
  outDir?: string;
  postRender?: (html: string) => string;
}

/**
 * Render all registered pages to static HTML files.
 */
export function render(opts: RenderOptions) {
  const { outDir, postRender, pages }: Required<RenderOptions> = {
    outDir: process.cwd(),
    postRender: (val: string) => val,
    ...opts
  };

  pages.forEach(page => {
    const filepath = getOutputPath(outDir, page.path);
    ensureDir(filepath);

    const html = page.render(page.path);
    const content = postRender(html);

    console.log(`Writing ${page.path}`);
    fs.writeFileSync(filepath, content);
  });
}
