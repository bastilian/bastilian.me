import config from "../_config.ts";

import localFileStore from "./Storage/localFileStore.ts";
import s3Store from "./Storage/s3Store.ts";
import cacheStore from "./Storage/cacheStore.ts";

export default async () => {
  if (config.storage.s3) {
    return await s3Store(config.storage.s3);
  }

  if (config.storage.local) {
    return await localFileStore(config.storage.local);
  }

  if (config.storage.cache) {
    return await cacheStore();
  }
};
