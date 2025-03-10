import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  admin: {
    backendUrl: process.env.MEDUSA_BACKEND_URL,
  },
  plugins: [
    {
      resolve: "@medusajs/file-s3",
      options: {
        s3_url: process.env.S3_URL,
        bucket: process.env.S3_BUCKET,
        region: process.env.S3_REGION,
        access_key_id: process.env.S3_ACCESS_KEY_ID,
        secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
        endpoint: process.env.S3_ENDPOINT,
        cache_control: "public, max-age=31536000",
        download_file_duration: 60 * 60, // 1 hour in seconds
        force_path_style: false,
        aws_config_options: {
          ACL: "public-read",
          signatureVersion: "v4"
        }
      },
    },
  ],
})
