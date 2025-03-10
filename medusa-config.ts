import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const REDIS_URL = process.env.REDIS_URL || ''

module.exports = defineConfig({
  projectConfig: {
    redisUrl: REDIS_URL,
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: {
    eventBus: {
      resolve: "@medusajs/event-bus-redis",
      options: {
        redisUrl: REDIS_URL,
        type: "redis"
      }
    },
    cacheService: {
      resolve: "@medusajs/cache-redis",
      options: {
        redisUrl: REDIS_URL,
        type: "redis"
      }
    }
  },
  plugins: [
    {
      resolve: `medusa-plugin-sendgrid`,
      options: {
        api_key: process.env.SENDGRID_API_KEY,
        from: process.env.SENDGRID_FROM,
        order_placed_template: process.env.SENDGRID_ORDER_PLACED_ID,
        order_shipped_template: process.env.SENDGRID_ORDER_SHIPPED_ID,
        order_canceled_template: process.env.SENDGRID_ORDER_CANCELED_ID,
        user_password_reset_template: process.env.SENDGRID_USER_PASSWORD_RESET_ID,
        customer_password_reset_template: process.env.SENDGRID_CUSTOMER_PASSWORD_RESET_ID,
      },
    },
    {
      resolve: `medusa-file-spaces`,
      options: {
        spaces_url: process.env.SPACE_URL,
        bucket: process.env.SPACE_BUCKET,
        endpoint: process.env.SPACE_ENDPOINT,
        access_key_id: process.env.SPACE_ACCESS_KEY_ID,
        secret_access_key: process.env.SPACE_SECRET_ACCESS_KEY,
      },
    },
  ],
})
