import { log } from "../../utilities/helpers.ts";

const writeCache = (cacheStore: any) => async (fileName: string, data: any) => {
  return await cacheStore.put(
    new URL("http://" + fileName),
    new Response(data),
  );
};

const readCache = (cacheStore: any) => async (fileName: string) => {
  return (await cacheStore.match(new URL("http://" + fileName))).arrayBuffer();
};

export default async () => {
  log("Using Cache API");

  const cacheStore = await caches.open("images");

  return {
    readFile: readCache(cacheStore),
    writeFile: writeCache(cacheStore),
  };
};
