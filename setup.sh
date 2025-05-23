#!/bin/bash

# Learner Dashboard Setup Script
echo "🚀 Setting up Learner Dashboard..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install AWS CLI first."
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Please run 'aws configure' first."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Check if CDK is installed globally
if ! command -v cdk &> /dev/null; then
    echo "📦 Installing AWS CDK..."
    npm install -g aws-cdk
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

# Bootstrap CDK (if not already done)
echo "🏗️ Bootstrapping CDK..."
cdk bootstrap

# Deploy infrastructure
echo "☁️ Deploying AWS infrastructure..."
cdk deploy --require-approval never

# Get the S3 bucket URL
echo "📋 Getting S3 bucket information..."
BUCKET_URL=$(aws cloudformation describe-stacks --stack-name LearnerDashboardStack --query "Stacks[0].Outputs[?OutputKey=='BucketUrl'].OutputValue" --output text 2>/dev/null)

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

# Update environment configuration if bucket URL was retrieved
if [ -n "$BUCKET_URL" ]; then
    echo "📝 Updating frontend configuration..."
    echo "REACT_APP_S3_BUCKET_URL=$BUCKET_URL" > .env.local
    echo "✅ S3 Bucket URL configured: $BUCKET_URL"
else
    echo "⚠️ Could not retrieve S3 bucket URL. You may need to configure it manually."
    echo "Check the AWS CloudFormation console for the bucket URL."
fi

echo "✅ Setup complete!"
echo "📋 Next steps:"
echo "   1. Run 'npm run dev' in the frontend directory to start the development server"
echo "   2. The S3 bucket has been created and learners.csv uploaded"
echo "   3. Open http://localhost:3000 to view the dashboard"
echo ""
echo "📖 For more information, see the README.md file"
echo "🐛 If you encounter issues, check the troubleshooting section in README.md"