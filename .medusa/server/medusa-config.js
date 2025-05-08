"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/utils");
const constants_1 = require("./src/lib/constants");
// import { MARKETPLACE_MODULE } from 'modules/marketplace';
(0, utils_1.loadEnv)(process.env.NODE_ENV, process.cwd());
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
            cookieSecret: constants_1.COOKIE_SECRET
        }
    },
    admin: {
        backendUrl: constants_1.BACKEND_URL,
        disable: constants_1.SHOULD_DISABLE_ADMIN,
    },
    modules: [
        fileModule,
        ...(constants_1.REDIS_URL ? [{
                key: utils_1.Modules.EVENT_BUS,
                resolve: '@medusajs/event-bus-redis',
                options: {
                    redisUrl: constants_1.REDIS_URL,
                    redis: {
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
                }
            },
            {
                key: utils_1.Modules.WORKFLOW_ENGINE,
                resolve: '@medusajs/workflow-engine-redis',
                options: {
                    redis: {
                        url: constants_1.REDIS_URL,
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
                    }
                }
            }] : []),
        {
            key: utils_1.Modules.NOTIFICATION,
            resolve: '@medusajs/notification',
            options: {
                providers: [
                    {
                        resolve: "@medusajs/notification-sendgrid",
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
    // Register custom subscribers
    subscribers: {
        "cart.completed": [
            "src/subscribers/metadata-transfer.ts"
        ]
    }
};
console.log(JSON.stringify(medusaConfig, null, 2));
exports.default = (0, utils_1.defineConfig)(medusaConfig);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkdXNhLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21lZHVzYS1jb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBaUU7QUFDakUsbURBdUI2QjtBQUM3Qiw0REFBNEQ7QUFFNUQsSUFBQSxlQUFPLEVBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFFN0MsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssYUFBYSxDQUFDO0FBRTdELE1BQU0sVUFBVSxHQUFHO0lBQ2pCLEdBQUcsRUFBRSxlQUFPLENBQUMsSUFBSTtJQUNqQixPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCLEVBQUUsRUFBRSxJQUFJO0lBQ1IsT0FBTyxFQUFFO1FBQ1AsU0FBUyxFQUFFO1lBQ1Q7Z0JBQ0UsT0FBTyxFQUFFLG1CQUFtQjtnQkFDNUIsT0FBTyxFQUFFO29CQUNQLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVc7b0JBQy9CLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVM7b0JBQzdCLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVM7b0JBQzdCLGFBQWEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQjtvQkFDM0MsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0I7b0JBQ25ELGFBQWEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQjtvQkFDM0MsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUztvQkFDN0IsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVztvQkFDakMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVztvQkFDakMsZ0JBQWdCLEVBQUUsSUFBSTtvQkFDdEIsbUJBQW1CLEVBQUUsSUFB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