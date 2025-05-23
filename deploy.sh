#!/bin/bash

# Deployment script for Learner Dashboard
echo "🚀 Deploying Learner Dashboard..."

# Deploy CDK stack
echo "☁️ Deploying AWS infrastructure..."
cdk deploy --require-approval never

# Get the S3 bucket URL from CDK output
echo "📝 Getting S3 bucket information..."
BUCKET_URL=$(aws cloudformation describe-stacks --stack-name LearnerDashboardStack --query "Stacks[0].Outputs[?OutputKey=='BucketUrl'].OutputValue" --output text)

if [ -n "$BUCKET_URL" ]; then
    echo "✅ S3 Bucket URL: $BUCKET_URL"
    
    # Update the frontend environment file
    cd frontend
    echo "REACT_APP_S3_BUCKET_URL=$BUCKET_URL" > .env.local
    echo "📝 Updated frontend environment configuration"
    
    # Build the frontend
    echo "🔨 Building frontend..."
    npm run build
    
    echo "✅ Deployment complete!"
    echo "📋 Next steps:"
    echo "   1. Run 'npm start' in the frontend directory"
    echo "   2. Open http://localhost:3000"
    echo "   3. Your S3 bucket URL is: $BUCKET_URL"
else
    echo "❌ Could not retrieve S3 bucket URL from CloudFormation"
    echo "Please check the CDK deployment and try again"
fi