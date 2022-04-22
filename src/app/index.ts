import { S3, S3Client } from '@aws-sdk/client-s3';
import 'dotenv/config';

const getFiles = async () => {
  const bucket = 'dashboard-react';
  const s3Config = {
    region: 'eu-west-3',
    // region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  };
  // const clientv2 = new s3v2();
  const client = new S3(s3Config);
  const client2 = new S3Client(s3Config);
  try {
    const files = await client.listObjectsV2({ Bucket: 'dashboard-react' });
    console.log({ files: files.Contents });
    const bucketACL = await client.getBucketAcl({ Bucket: bucket });
    const info = await client2.send;
    console.log(JSON.stringify({ bucketACL: bucketACL.Grants }, null, 2));
    console.log(JSON.stringify({ info }, null, 2));
  } catch (error) {
    console.log(error);
  }
};

getFiles();
