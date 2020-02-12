import yaml from "js-yaml";

export function parseYaml(contents: string): {} {
  return yaml.safeLoad(contents);
}
