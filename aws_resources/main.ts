import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { provider, s3Bucket } from './.gen/providers/aws';

class StaticWebsiteStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // Initialize the AWS provider
    new provider(this, 'aws', {
      region: 'us-east-1', // Change this to your desired region
    });

    // Create an S3 bucket for the static website
    const websiteBucket = new s3Bucket(this, 'websiteBucket', {
      bucket: 'aws-reactapp', // Change this to a unique bucket name for your website
      acl: 'public-read',
      website: [
        {
          indexDocument: 'index.html', // Change this to the name of your index file
          errorDocument: 'error.html', // Change this to the name of your error file
        },
      ],
    });

    // Output the bucket URL
    new Output(this, 'websiteUrl', {
      value: websiteBucket.websiteEndpoint,
    });
  }
}

const app = new App();

// Create a new CDKTF stack
new StaticWebsiteStack(app, 'StaticWebsiteStack');
app.synth();
