import { log } from "../../utilities/helpers.ts";
import { S3Client } from "@bradenmacdonald/s3-lite-client";
import { join } from "@std/path";

const read = (s3client: any, path: string) => async (fileName: string) => {
  const filePath = join(path, fileName);

  try {
    log("Reading from S3", filePath);
    const res = await s3client.getObject(filePath);
    const buffer = await res.arrayBuffer();
    return new Uint8Array(buffer);
  } catch (e) {
    log("Error reading S3", e.message, filePath);
    return;
  }
};

const write =
  (s3client: any, path: string) => async (fileName: string, data: any) => {
    const filePath = join(path, fileName);

    try {
      log("Writing to S3", filePath);
      const put = await s3client.putObject(filePath, data);
      const get = await read(s3client, "")(filePath);

      return put && get;
    } catch (e) {
      log("Error writting S3", e.message, filePath);
      return;
    }
  };

const inPath = (s3client: any, path: string) => ({
  read: read(s3client, path),
  write: write(s3client, path),
});

type S3StoreInit = {
  host: string;
  bucket: string;
  region: string;
  accessKey?: string;
  secretKey?: string;
  baseDirectory?: string;
};

export default (
  { host, bucket, region, accessKey, secretKey, baseDirectory = "" }:
    S3StoreInit,
) => {
  log("Using S3", host, bucket);

  const hostUrl = new URL(host);
  const s3client = new S3Client({
    endPoint: hostUrl.hostname,
    useSSL: hostUrl.protocol === "https:",
    bucket,
    accessKey,
    secretKey,
    region,
  });

  return Promise.resolve({
    ...inPath(s3client, baseDirectory),
    inPath: (path: string) => {
      const fullPath = join(baseDirectory, path);
      log("Creating client for ", fullPath);
      return inPath(s3client, fullPath);
    },
  });
};
