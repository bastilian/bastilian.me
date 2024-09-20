import { logWithNamespace } from "../../utilities/helpers.ts";

const log = logWithNamespace("kv-store");

const read = (namespace) => (kvStore) => async (key) => {
  log("Reading from KV", namespace, key);
  const kv = await kvStore.get([namespace, key]);
  if (kv.value) {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(kv.value);

    return encoded;
  } else {
    return;
  }
};

const write = (namespace) => (kvStore) => async (key, data) => {
  log("Writing to KV", namespace, key);
  log("before");
  const save = await kvStore.set(
    [namespace, key],
    data,
  );
  log("After");
  if (save.ok) {
    log("Hellpo from save ok");
    return await read(namespace)(kvStore)(key);
  } else {
    log("Saving", [namespace, key], "failed");
    return data;
  }
};

export default async ({ dbPath, namespace } = {}) => {
  log("Using Deno KV API");

  const kvStore = await Deno.openKv(Deno.env.get("KV_STORE"));

  return (namespace) =>
    Promise.resolve({
      read: read(namespace)(kvStore),
      write: write(namespace)(kvStore),
    });
};
