
import {
  CreateBucketCommand,
  GetObjectCommand,
  ListBucketsCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3';
import uniqueString from 'unique-string';

const bucketPrefix = process.env.WEB_BACKEND_STORAGE_BUCKET_PREFIX;

/** @type {S3Client} */
let client = null;
/** @type {string} */
let bucketName = null;

// TODO: should the bucket name be stored as a site setting?  and should this
// function simply ensure that a bucket with that name exists?
/**
 * @return {Promise<string>}
 */
async function getBucketName() {
  const listBuckets = new ListBucketsCommand({});
  const {
    Buckets
  } = await client.send(listBuckets);
  const appBucket = Buckets.find(
    (bucket) => bucket.Name?.startsWith(bucketPrefix)
  );

  if (appBucket) {
    return appBucket.Name;
  }

  const bucketName = `${bucketPrefix}-${uniqueString().slice(0, 16)}`;
  const createBucket = new CreateBucketCommand({
    Bucket: bucketName
  });
  await client.send(createBucket);

  return bucketName;
}

/** @return {Promise<import('~/t').Storage>} */
export async function init() {
  client = new S3Client({
    region: `us-east-1` // TODO: configurable, eventually
  });

  bucketName = await getBucketName();

  return {
    createFolder,
    getBaseUrl,
    getFolderContents,
    getObject,
    uploadObject
  };
}

/**
 * @param {Object} opts
 * @param {string} opts.name
 */
async function createFolder(opts) {
  const folderName = opts.name.endsWith(`/`)
    ? opts.name
    : `${opts.name}/`;
  const putObject = new PutObjectCommand({
    Bucket: bucketName,
    Key: folderName
  });

  await client.send(putObject);
}

/**
 * @param {Object} opts
 * @param {boolean} [opts.auth]
 * @param {Buffer} opts.data
 * @param {string} opts.fileName
 * @param {string} [opts.folderName]
 * @param {string} opts.mimeType
 * @return {Promise<{ path: string }>}
 */
async function uploadObject(opts) {
  const {
    auth = true,
    data,
    fileName,
    folderName,
    mimeType
  } = opts;
  const path = folderName
    ? `${folderName}/${fileName}`
    : `/${fileName}`;
  const putObject = new PutObjectCommand({
    ACL: auth
      ? undefined
      : `public-read`,
    Body: data,
    Bucket: bucketName,
    ContentType: mimeType,
    Key: folderName
      ? path
      : fileName,
    ...opts
  });

  const response = await client.send(putObject);

  if (response.$metadata.httpStatusCode !== 200) {
    throw new Error();
  }

  return {
    path
  };
}

/**
 * @param {Object} opts
 * @param {string} opts.name
 */
async function getFolderContents(opts) {
  const {
    name
  } = opts;
  const listObjects = new ListObjectsCommand({
    Bucket: bucketName,
    Prefix: name
    // TODO: implement cursor with the Marker option for buckets with >1000 items
  });

  const response = await client.send(listObjects);

  return response;
}

async function getBaseUrl() {
  const bucketName = await getBucketName();

  return `https://${bucketName}.s3.amazonaws.com`;
}

/**
 * @param {Object} opts
 * @return {Promise<{ data: unknown; mimeType: string }>}
 */
async function getObject(opts) {
  const {
    path
  } = opts;
  const getObject = new GetObjectCommand({
    Bucket: bucketName,
    Key: path
  });
  const response = await client.send(getObject);
  const data = await new Promise(function(resolve) {
    const buffers = [];
    response.Body.on(`readable`, function() { buffers.push(response.Body.read()) });
    response.Body.on(`end`, function() { resolve(Buffer.concat(buffers.filter(Boolean))) });
  });

  return {
    data,
    mimeType: response.ContentType
  };
}
