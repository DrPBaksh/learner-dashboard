#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LearnerDashboardStack } from '../lib/learner-dashboard-stack';

const app = new cdk.App();
new LearnerDashboardStack(app, 'LearnerDashboardStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});