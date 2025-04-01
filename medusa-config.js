import { loadEnv, Modules, defineConfig } from '@medusajs/utils';
import {
  ADMIN_CORS,
  AUTH_CORS,
  BACKEND_URL,
  COOKIE_SECRET,
  DATABASE_URL,
  JWT_SECRET,
  REDIS_URL,
  RESEND_API_KEY,
  RESEND_FROM_EMAIL,
  SENDGRID_API_KEY,
  SENDGRID_FROM_EMAIL,
  SHOULD_DISABLE_ADMIN,
  STORE_CORS,
  STRIPE_API_KEY,
  STRIPE_WEBHOOK_SECRET,
  WORKER_MODE,
  MINIO_ENDPOINT,
  MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY,
  MINIO_BUCKET,
  MEILISEARCH_HOST,
  MEILISEARCH_ADMIN_KEY
} from './src/lib/constants';
// import { MARKETPLACE_MODULE } from 'modules/marketplace';

loadEnv(process.env.NODE_ENV, process.cwd());

const isDevelopment = process.env.NODE_ENV === 'development';

const fileModule = {
  key: Modules.FILE,
  resolve: '@medusajs/file',
  id: 's3',
  options: {
    providers: [
      {
        resolve: `@medusajs/file-s3`,
        options: {
          s3_url: process.env.S3_FILE_URL,
          bucket: process.env.S3_BUCKET,
          region: process.env.S3_REGION,
          access_key_id: process.env.S3_ACCESS_KEY_ID,
          secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
          cache_control: process.env.S3_CACHE_CONTROL,
          access: process.env.S3_ACCESS,
          file_url: process.env.S3_FILE_URL,
          endpoint: process.env.S3_ENDPOINT,
          force_path_style: true,
          s3_force_path_style: true,
          signature_version: 'v4',
          max_attempts: 3,
          retry_delay: 1000,
          retry_delay_base: 1000,
          retry_delay_max: 10000,
        },
      },
    ],
  },
};

const medusaConfig = {
  projectConfig: {
    databaseUrl: DATABASE_URL,
    databaseLogging: false,
    redisUrl: REDIS_URL,
    workerMode: WORKER_MODE,
    http: {
      adminCors: ADMIN_CORS,
      authCors: AUTH_CORS,
      storeCors: STORE_CORS,
      jwtSecret: JWT_SECRET,
      cookieSecret: COOKIE_SECRET
    }
  },
  admin: {
    backendUrl: BACKEND_URL,
    disable: SHOULD_DISABLE_ADMIN,
  },
  modules: [
    fileModule,
    ...(REDIS_URL ? [{
      key: Modules.EVENT_BUS,
      resolve: '@medusajs/event-bus-redis',
      options: {
        redisUrl: REDIS_URL
      }
    },
    {
      key: Modules.WORKFLOW_ENGINE,
      resolve: '@medusajs/workflow-engine-redis',
      options: {
        redis: {
          url: REDIS_URL,
        }
      }
    }] : []),
      {
      key: Modules.NOTIFICATION,
      resolve: '@medusajs/notification',
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/notification-sendgrid",
            id: "sendgrid",
            options: {
              channels: ["email"],
              api_key: process.env.SENDGRID_API_KEY,
              from: process.env.SENDGRID_FROM,
            },
          },

        ]
      }
    },
  ],
};

console.log(JSON.stringify(medusaConfig, null, 2));
export default defineConfig(medusaConfig);
