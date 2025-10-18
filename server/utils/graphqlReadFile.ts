import { readFileSync } from "fs";
import { join } from "path";

export function readFile(path: string) {
  return readFileSync(join(__dirname, `../graphql/schema/${path}`), "utf-8");
}