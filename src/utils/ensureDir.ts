import path from 'path';
import mkdirp from 'mkdirp';

export function ensureDir(filepath: string) {
  const dirpath = path.dirname(filepath);
  mkdirp.sync(dirpath);
}
