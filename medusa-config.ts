import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
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
  ],
})
