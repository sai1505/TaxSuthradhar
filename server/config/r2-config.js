import { S3Client } from '@aws-sdk/client-s3';
import 'dotenv/config';

// --- Cloudflare R2 Configuration ---
// Load environment variables
const { CLOUDFLARE_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME } = process.env;

// Validate that all required environment variables are set
if (!CLOUDFLARE_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
    console.error("Error: Missing required Cloudflare R2 environment variables in .env file.");
    process.exit(1); // Exit the process with an error code
}

// Construct the R2 endpoint URL
const R2_ENDPOINT = `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`;

// Initialize the S3 client to interact with Cloudflare R2
const S3 = new S3Client({
    region: 'auto',
    endpoint: R2_ENDPOINT,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
});

console.log('S3 Client configured for Cloudflare R2.');

// Export the S3 client and bucket name for use in other files
export { S3, R2_BUCKET_NAME };
