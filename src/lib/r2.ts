import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { FetchHttpHandler } from "@smithy/fetch-http-handler";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
  // The SDK's default request handler uses Node's `https` module, which
  // doesn't exist on Cloudflare Workers (no raw sockets) — only `fetch`
  // does, so the request has to go through a fetch-based handler instead.
  requestHandler: new FetchHttpHandler(),
  // Every one of these has to be given a real value. Any left unset makes
  // the SDK try to read ~/.aws/config to pick a default, which crashes on
  // Cloudflare Workers (no filesystem) the first time it's actually used.
  requestChecksumCalculation: "WHEN_REQUIRED",
  responseChecksumValidation: "WHEN_REQUIRED",
  defaultsMode: "standard",
  maxAttempts: 3,
  retryMode: "standard",
  authSchemePreference: [],
  sigv4aSigningRegionSet: [],
  disableS3ExpressSessionAuth: false,
  useArnRegion: false,
  useDualstackEndpoint: false,
  useFipsEndpoint: false,
  userAgentAppId: "vmakizy",
  // This one lives in the request-signing step, not client construction,
  // so it only crashes the first time a request is actually signed.
  disableClockSkewCorrection: false,
});

export async function uploadToR2(
  file: Buffer,
  key: string,
  contentType: string
) {
  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      Body: file,
      ContentType: contentType,
    })
  );
  return `${process.env.R2_PUBLIC_URL}/${key}`;
}
