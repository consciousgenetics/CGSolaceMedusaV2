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
                    redisUrl: constants_1.REDIS_URL
                }
            },
            {
                key: utils_1.Modules.WORKFLOW_ENGINE,
                resolve: '@medusajs/workflow-engine-redis',
                options: {
                    redis: {
                        url: constants_1.REDIS_URL,
                    }
                }
            }] : []),
        {
            key: utils_1.Modules.NOTIFICATION,
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
exports.default = (0, utils_1.defineConfig)(medusaConfig);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkdXNhLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21lZHVzYS1jb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBaUU7QUFDakUsbURBdUI2QjtBQUM3Qiw0REFBNEQ7QUFFNUQsSUFBQSxlQUFPLEVBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFFN0MsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssYUFBYSxDQUFDO0FBRTdELE1BQU0sVUFBVSxHQUFHO0lBQ2pCLEdBQUcsRUFBRSxlQUFPLENBQUMsSUFBSTtJQUNqQixPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCLEVBQUUsRUFBRSxJQUFJO0lBQ1IsT0FBTyxFQUFFO1FBQ1AsU0FBUyxFQUFFO1lBQ1Q7Z0JBQ0UsT0FBTyxFQUFFLG1CQUFtQjtnQkFDNUIsT0FBTyxFQUFFO29CQUNQLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVc7b0JBQy9CLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVM7b0JBQzdCLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVM7b0JBQzdCLGFBQWEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQjtvQkFDM0MsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0I7b0JBQ25ELGFBQWEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQjtvQkFDM0MsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUztvQkFDN0IsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVztvQkFDakMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVztvQkFDakMsZ0JBQWdCLEVBQUUsSUFBSTtvQkFDdEIsbUJBQW1CLEVBQUUsSUFBSTtvQkFDekIsaUJBQWlCLEVBQUUsSUFBSTtvQkFDdkIsWUFBWSxFQUFFLENBQUM7b0JBQ2YsV0FBVyxFQUFFLElBQUk7b0JBQ2pCLGdCQUFnQixFQUFFLElBQUk7b0JBQ3RCLGVBQWUsRUFBRSxLQUFLO2lCQUN2QjthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFFRixNQUFNLFlBQVksR0FBRztJQUNuQixhQUFhLEVBQUU7UUFDYixXQUFXLEVBQUUsd0JBQVk7UUFDekIsZUFBZSxFQUFFLEtBQUs7UUFDdEIsUUFBUSxFQUFFLHFCQUFTO1FBQ25CLFVBQVUsRUFBRSx1QkFBVztRQUN2QixJQUFJLEVBQUU7WUFDSixTQUFTLEVBQUUsc0JBQVU7WUFDckIsUUFBUSxFQUFFLHFCQUFTO1lBQ25CLFNBQVMsRUFBRSxzQkFBVTtZQUNyQixTQUFTLEVBQUUsc0JBQVU7WUFDckIsWUFBWSxFQUFFLHlCQUFhO1NBQzVCO0tBQ0Y7SUFDRCxLQUFLLEVBQUU7UUFDTCxVQUFVLEVBQUUsdUJBQVc7UUFDdkIsT0FBTyxFQUFFLGdDQUFvQjtLQUM5QjtJQUNELE9BQU8sRUFBRTtRQUNQLFVBQVU7UUFDVixHQUFHLENBQUMscUJBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDZixHQUFHLEVBQUUsZUFBTyxDQUFDLFNBQVM7Z0JBQ3RCLE9BQU8sRUFBRSwyQkFBMkI7Z0JBQ3BDLE9BQU8sRUFBRTtvQkFDUCxRQUFRLEVBQUUscUJBQVM7aUJBQ3BCO2FBQ0Y7WUFDRDtnQkFDRSxHQUFHLEVBQUUsZUFBTyxDQUFDLGVBQWU7Z0JBQzVCLE9BQU8sRUFBRSxpQ0FBaUM7Z0JBQzFDLE9BQU8sRUFBRTtvQkFDUCxLQUFLLEVBQUU7d0JBQ0wsR0FBRyxFQUFFLHFCQUFTO3FCQUNmO2lCQUNGO2FBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDTjtZQUNBLEdBQUcsRUFBRSxlQUFPLENBQUMsWUFBWTtZQUN6QixPQUFPLEVBQUUsd0JBQXdCO1lBQ2pDLE9BQU8sRUFBRTtnQkFDUCxTQUFTLEVBQUU7b0JBQ1Q7d0JBQ0UsT0FBTyxFQUFFLHdDQUF3Qzt3QkFDakQsRUFBRSxFQUFFLFVBQVU7d0JBQ2QsT0FBTyxFQUFFOzRCQUNQLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQzs0QkFDbkIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCOzRCQUNyQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhO3lCQUNoQztxQkFDRjtpQkFFRjthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25ELGtCQUFlLElBQUEsb0JBQVksRUFBQyxZQUFZLENBQUMsQ0FBQyJ9