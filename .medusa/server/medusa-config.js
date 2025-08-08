"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./src/lib/constants");
const utils_1 = require("@medusajs/framework/utils");
// import { MARKETPLACE_MODULE } from 'modules/marketplace';
(0, utils_1.loadEnv)(process.env.NODE_ENV || 'development', process.cwd());
const isDevelopment = process.env.NODE_ENV === 'development';
const fileModule = {
    key: utils_1.Modules.FILE,
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
        databaseUrl: constants_1.DATABASE_URL,
        databaseLogging: false,
        redisUrl: constants_1.REDIS_URL,
        workerMode: constants_1.WORKER_MODE,
        http: {
            adminCors: constants_1.ADMIN_CORS,
            authCors: constants_1.AUTH_CORS,
            storeCors: constants_1.STORE_CORS,
            jwtSecret: constants_1.JWT_SECRET,
            cookieSecret: constants_1.COOKIE_SECRET,
        },
    },
    admin: {
        backendUrl: constants_1.BACKEND_URL,
        disable: constants_1.SHOULD_DISABLE_ADMIN,
    },
    modules: [
        fileModule,
        ...(constants_1.REDIS_URL
            ? [
                {
                    key: utils_1.Modules.EVENT_BUS,
                    resolve: '@medusajs/event-bus-redis',
                    options: {
                        redisUrl: constants_1.REDIS_URL,
                        redis: {
                            tls: constants_1.REDIS_URL.startsWith('rediss://') ? {} : undefined,
                            maxRetriesPerRequest: 3,
                            enableOfflineQueue: true,
                            reconnectOnError: (err) => {
                                console.log(`Redis event-bus reconnecting on error: ${err.message}`);
                                return true;
                            },
                            retryStrategy: (times) => {
                                console.log(`Redis event-bus retry attempt: ${times}`);
                                return Math.min(times * 100, 3000);
                            }
                        }
                    },
                },
                {
                    key: utils_1.Modules.WORKFLOW_ENGINE,
                    resolve: '@medusajs/workflow-engine-redis',
                    options: {
                        redis: {
                            url: constants_1.REDIS_URL,
                            tls: constants_1.REDIS_URL.startsWith('rediss://') ? {} : undefined,
                            maxRetriesPerRequest: 3,
                            enableOfflineQueue: true,
                            reconnectOnError: (err) => {
                                console.log(`Redis workflow-engine reconnecting on error: ${err.message}`);
                                return true;
                            },
                            retryStrategy: (times) => {
                                console.log(`Redis workflow-engine retry attempt: ${times}`);
                                return Math.min(times * 100, 3000);
                            }
                        },
                    },
                },
            ]
            : []),
        {
            key: utils_1.Modules.NOTIFICATION,
            resolve: '@medusajs/notification',
            options: {
                providers: [
                    {
                        resolve: '@medusajs/notification-sendgrid',
                        id: 'sendgrid',
                        options: {
                            channels: ['email'],
                            api_key: process.env.SENDGRID_API_KEY,
                            from: process.env.SENDGRID_FROM,
                        },
                    },
                ],
            },
        },
    ],
};
console.log(JSON.stringify(medusaConfig, null, 2));
exports.default = (0, utils_1.defineConfig)(medusaConfig);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkdXNhLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21lZHVzYS1jb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFXNEI7QUFDNUIscURBQTBFO0FBQzFFLDREQUE0RDtBQUU1RCxJQUFBLGVBQU8sRUFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxhQUFhLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7QUFDN0QsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssYUFBYSxDQUFBO0FBRTVELE1BQU0sVUFBVSxHQUFHO0lBQ2pCLEdBQUcsRUFBRSxlQUFPLENBQUMsSUFBSTtJQUNqQixPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCLEVBQUUsRUFBRSxJQUFJO0lBQ1IsT0FBTyxFQUFFO1FBQ1AsU0FBUyxFQUFFO1lBQ1Q7Z0JBQ0UsT0FBTyxFQUFFLG1CQUFtQjtnQkFDNUIsT0FBTyxFQUFFO29CQUNQLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVc7b0JBQy9CLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVM7b0JBQzdCLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVM7b0JBQzdCLGFBQWEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQjtvQkFDM0MsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0I7b0JBQ25ELGFBQWEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQjtvQkFDM0MsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUztvQkFDN0IsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVztvQkFDakMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVztvQkFDakMsZ0JBQWdCLEVBQUUsSUFBSTtvQkFDdEIsbUJBQW1C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