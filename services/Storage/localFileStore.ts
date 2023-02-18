import { log } from "../../utilities/helpers.ts";
import { ensureDir } from "fs";
import { join } from "path";

const writeLocal = (baseDirectory) => async (fileName, data) => {
  const filePath = join(baseDirectory, fileName);

  return await Deno.writeFile(filePath, data);
};

const readLocal = (baseDirectory) => async (fileName) => {
  const filePath = join(baseDirectory, fileName);

  return await Deno.readFile(filePath);
};

export default async ({ directory }) => {
  log("Using local storage");
  await ensureDir(directory);

  return {
    readFile: readLocal(directory),
    writeFile: writeLocal(directory),
  };
};
