import { ensureDir } from "@std/fs";
import { join } from "@std/path";
import { log } from "../../utilities/helpers.ts";

const writeLocal =
  (baseDirectory: string) => async (fileName: string, data: any) => {
    const filePath = join(baseDirectory, fileName);

    return await Deno.writeFile(filePath, data);
  };

const readLocal = (baseDirectory: string) => async (fileName: string) => {
  const filePath = join(baseDirectory, fileName);

  return await Deno.readFile(filePath);
};

export default async ({ directory }: { directory: string }) => {
  log("Using local storage");
  await ensureDir(directory);

  return {
    readFile: readLocal(directory),
    writeFile: writeLocal(directory),
  };
};
