#!/usr/bin/env node

/**
 * Script to update the S3 bucket URL in the frontend configuration
 * Usage: node scripts/update-bucket-url.js <bucket-url>
 */

const fs = require('fs');
const path = require('path');

const bucketUrl = process.argv[2];

if (!bucketUrl) {
  console.error('❌ Please provide a bucket URL');
  console.error('Usage: node scripts/update-bucket-url.js <bucket-url>');
  process.exit(1);
}

const envFilePath = path.join(__dirname, '..', 'frontend', '.env.local');
const envContent = `REACT_APP_S3_BUCKET_URL=${bucketUrl}\n`;

try {
  fs.writeFileSync(envFilePath, envContent);
  console.log('✅ Updated S3 bucket URL in frontend configuration');
  console.log(`📝 Bucket URL: ${bucketUrl}`);
} catch (error) {
  console.error('❌ Failed to update configuration:', error.message);
  process.exit(1);
}