import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  
 /* modules: {
    eventBus: {
      resolve: "@medusajs/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL
      }
    },
    cacheService: {
      resolve: "@medusajs/cache-redis",
      options: {
        redisUrl: process.env.REDIS_URL
      }
    } 

  },*/

  modules: [
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/file-s3",
            options: {
              file_url: process.env.S3_FILE_URL,
              access_key_id: process.env.S3_ACCESS_KEY_ID,
              secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
              region: process.env.S3_REGION,
              bucket: process.env.S3_BUCKET,
              endpoint: process.env.S3_ENDPOINT,
            }
          }
        ],
       }
    }
  ],
  admin: {
    backendUrl: process.env.MEDUSA_BACKEND_URL,
  },
  
  plugins: [
    {
      resolve: `medusa-plugin-sendgrid`,
      options: {
        api_key: process.env.SENDGRID_API_KEY,
        from: process.env.SENDGRID_FROM,
        order_placed_template: process.env.SENDGRID_ORDER_PLACED_ID,
        order_canceled_template: process.env.SENDGRID_ORDER_CANCELED_ID,
        order_shipped_template: process.env.SENDGRID_ORDER_SHIPPED_ID,
        order_return_requested_template: process.env.SENDGRID_ORDER_RETURN_REQUESTED_ID,
        order_items_returned_template: process.env.SENDGRID_ORDER_ITEMS_RETURNED_ID,
        claim_shipment_created_template: process.env.SENDGRID_CLAIM_SHIPMENT_CREATED_ID,
        swap_created_template: process.env.SENDGRID_SWAP_CREATED_ID,
        swap_shipment_created_template: process.env.SENDGRID_SWAP_SHIPMENT_CREATED_ID,
        swap_received_template: process.env.SENDGRID_SWAP_RECEIVED_ID,
        gift_card_created_template: process.env.SENDGRID_GIFT_CARD_CREATED_ID,
        customer_password_reset_template: process.env.SENDGRID_CUSTOMER_PASSWORD_RESET_ID,
        user_password_reset_template: process.env.SENDGRID_USER_PASSWORD_RESET_ID,
        medusa_restock_template: process.env.SENDGRID_MEDUSA_RESTOCK_ID,
      },
    },
  ]
})
