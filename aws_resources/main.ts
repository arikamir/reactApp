import { Construct } from 'constructs';
import { App, TerraformStack, TerraformOutput as Output } from 'cdktf';

import { S3Bucket } from './.gen/providers/aws/s3-bucket';
import { provider } from '@cdktf/provider-aws';

class StaticWebsiteStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);
      const aws = new provider.AwsProvider(this, 'aws', {
      region: 'us-east-1',
      accessKey: process.env.AWS_ACCESS_KEY_ID,
      secretKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
     // Create an S3 bucket for the static website with website configuration
     const websiteBucket = new S3Bucket(this, 'websiteBucket', {
      bucket: 'aws-reactapp', // Change this to a unique bucket name for your website
      acl: 'public-read',
    });


    // Output the bucket URL for the website
    new Output(this, 'websiteUrl', {
      value: websiteBucket.websiteEndpoint!,
    });
  }
}


const app = new App();
new StaticWebsiteStack(app, 'StaticWebsiteStack');

