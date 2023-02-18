import { log } from "../../utilities/helpers.ts";
import { S3Client } from "s3_lite_client";

const writeS3 = (s3client) => async (fileName, data) => {
  log("Trying to write from S3");
  await s3client.putObject(fileName, data);
  return new Uint8Array(
    await (await s3client.getObject(fileName)).arrayBuffer(),
  );
};

const readS3 = (s3client) => async (fileName) => {
  log("Trying to read from S3");
  const res = await s3client.getObject(fileName);
  return new Uint8Array(await res.arrayBuffer());
};

export default ({ host, bucket, region, accessKey, secretKey }) => {
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
    readFile: readS3(s3client),
    writeFile: writeS3(s3client),
  });
};
