import { log } from "../../utilities/helpers.ts";

const write = (namespace) => (kvStore) => async (key, data) => {
  log("Writing to KV", namespace, key, data);
  await kvStore.set(
    [namespace, key],
    data,
  );

  return await kvStore.get([namespace, key]);
};

const read = (namespace) => (kvStore) => async (key) => {
  log("Reading from KV", namespace, key);
  const value = (await kvStore.get([namespace, key])).value;
  if (value) {
    const encoder = new TextEncoder();
    return encoder.encode(value);
  } else {
    return;
  }
};

export default async ({ dbPath, namespace } = {}) => {
  log("Using Deno KV API");

  const kvStore = await Deno.openKv(dbPath);

  return (namespace) => ({
    read: read(namespace)(kvStore),
    write: write(namespace)(kvStore),
  });
};
