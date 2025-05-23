import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import * as path from 'path';

export class LearnerDashboardStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket for learner data
    const learnerDataBucket = new s3.Bucket(this, 'LearnerDataBucket', {
      bucketName: `learner-dashboard-data-${this.account}-${this.region}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.POST, s3.HttpMethods.PUT],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
        },
      ],
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
    });

    // Deploy learners.csv to S3
    new s3deploy.BucketDeployment(this, 'DeployLearnerData', {
      sources: [s3deploy.Source.asset('./data')],
      destinationBucket: learnerDataBucket,
    });

    // Output the bucket name for frontend configuration
    new cdk.CfnOutput(this, 'BucketName', {
      value: learnerDataBucket.bucketName,
      description: 'S3 bucket name for learner data',
    });

    new cdk.CfnOutput(this, 'BucketUrl', {
      value: `https://${learnerDataBucket.bucketName}.s3.amazonaws.com`,
      description: 'S3 bucket URL for learner data',
    });
  }
}