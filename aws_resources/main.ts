import { Construct } from 'constructs';
import { App, TerraformStack, TerraformOutput as Output } from 'cdktf';

import { S3Bucket } from './.gen/providers/aws/s3-bucket';

class StaticWebsiteStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

     // Create an S3 bucket for the static website with website configuration
     const websiteBucket = new S3Bucket(this, 'websiteBucket', {
      bucket: 'your-unique-bucket-name', // Change this to a unique bucket name for your website
      acl: 'public-read',
      website: [{
        indexDocument: 'index.html',
        errorDocument: '404.html',
      }],
    });


    // Output the bucket URL
    new Output(this, 'websiteUrl', {
      value: websiteBucket.websiteEndpoint!,
    });
  }
}


// Create a new CDKTF stack
new StaticWebsiteStack(app, 'StaticWebsiteStack');

const app = new App();
new StaticWebsiteStack(app, 'StaticWebsiteStack');
app.synth();
