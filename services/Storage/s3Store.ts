import { log } from "../../utilities/helpers.ts";
import { S3Client } from "@bradenmacdonald/s3-lite-client";
import { join } from "@std/path";

const read = (s3client, path) => async (fileName) => {
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

const write = (s3client, path) => async (fileName, data) => {
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

const inPath = (s3client, path) => ({
  read: read(s3client, path),
  write: write(s3client, path),
});

export default (
  { host, bucket, region, accessKey, secretKey, baseDirectory = "" },
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
    inPath: (path) => {
      const fullPath = join(baseDirectory, path);
      log("Creating client for ", fullPath);
      return inPath(s3client, fullPath);
    },
  });
};
