import { S3 } from '@aws-sdk/client-s3';
import AWS from 'aws-sdk';
import 'dotenv/config';

const bucket = 'dashboard-react';
const objectKey = 'edogp/Tron-legacy';
const region = 'eu-west-3';

const getFiles = async () => {
  const s3Config = {
    region,
    // region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
  };
  const client = new S3(s3Config);

  try {
    const files = await client.listObjectsV2({ Bucket: bucket });
    console.log({ files: files.Contents });
    const object = await client.getObject({
      Bucket: bucket,
      Key: objectKey,
    });
    const presignedUrl = await client.getObjectAcl({
      Bucket: bucket,
      Key: objectKey,
    });
    console.log({ object, presignedUrl });
    const bucketACL = await client.getBucketAcl({ Bucket: bucket });
    console.log(JSON.stringify({ bucketACL: bucketACL.Grants }, null, 2));
  } catch (error) {
    console.log(error);
  }
};

const getFilesV2 = async () => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    region,
    signatureVersion: 'v4',
  });
  const s3 = new AWS.S3();
  const signedUrlExpireSeconds = 60 * 1; // 5 minutes

  const url = s3.getSignedUrl('getObject', {
    Bucket: bucket,
    Key: objectKey,
    Expires: signedUrlExpireSeconds,
  });
  console.log({ url });
};

getFilesV2();

export default {
  getFiles,
  getFilesV2,
};
