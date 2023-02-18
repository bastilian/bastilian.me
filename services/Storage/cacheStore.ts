import { log } from "../../utilities/helpers.ts";

const writeCache = (cacheStore) => async (fileName, data) => {
  return await cacheStore.put(
    new URL("http://" + fileName),
    new Response(data),
  );
};

const readCache = (cacheStore) => async (fileName) => {
  return (await cacheStore.match(new URL("http://" + fileName))).arrayBuffer();
};

export default async ({ namespace }) => {
  log("Using Cache API");

  const cacheStore = await caches.open("images");

  return {
    readFile: readCache(cacheStore),
    writeFile: writeCache(cacheStore),
  };
};
