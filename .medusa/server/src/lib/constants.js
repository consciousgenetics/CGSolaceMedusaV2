"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHOULD_DISABLE_ADMIN = exports.WORKER_MODE = exports.MEILISEARCH_ADMIN_KEY = exports.MEILISEARCH_HOST = exports.STRIPE_WEBHOOK_SECRET = exports.STRIPE_API_KEY = exports.SENDGRID_FROM_EMAIL = exports.SENDGRID_API_KEY = exports.RESEND_FROM_EMAIL = exports.RESEND_API_KEY = exports.COOKIE_SECRET = exports.JWT_SECRET = exports.STORE_CORS = exports.AUTH_CORS = exports.ADMIN_CORS = exports.REDIS_URL = exports.DATABASE_URL = exports.BACKEND_URL = exports.IS_DEV = void 0;
const utils_1 = require("@medusajs/framework/utils");
const assert_value_1 = require("utils/assert-value");
(0, utils_1.loadEnv)(process.env.NODE_ENV || 'development', process.cwd());
/**
 * Is development environment
 */
exports.IS_DEV = process.env.NODE_ENV === 'development';
/**
 * Public URL for the backend
 */
exports.BACKEND_URL = (_b = (_a = process.env.BACKEND_PUBLIC_URL) !== null && _a !== void 0 ? _a : process.env.RAILWAY_PUBLIC_DOMAIN_VALUE) !== null && _b !== void 0 ? _b : 'http://localhost:9000';
/**
 * Database URL for Postgres instance used by the backend
 */
exports.DATABASE_URL = (0, assert_value_1.assertValue)(process.env.DATABASE_URL, 'Environment variable for DATABASE_URL is not set');
/**
 * (optional) Redis URL for Redis instance used by the backend
 */
exports.REDIS_URL = process.env.REDIS_URL;
/**
 * Admin CORS origins
 */
exports.ADMIN_CORS = (0, assert_value_1.assertValue)(process.env.ADMIN_CORS, 'Environment variable for ADMIN_CORS is not set');
/**
 * Auth CORS origins
 */
exports.AUTH_CORS = (0, assert_value_1.assertValue)(process.env.AUTH_CORS, 'Environment variable for AUTH_CORS is not set');
/**
 * Store/frontend CORS origins
 */
exports.STORE_CORS = (0, assert_value_1.assertValue)(process.env.STORE_CORS, 'Environment variable for STORE_CORS is not set');
/**
 * JWT Secret used for signing JWT tokens
 */
exports.JWT_SECRET = (0, assert_value_1.assertValue)(process.env.JWT_SECRET, 'Environment variable for JWT_SECRET is not set');
/**
 * Cookie secret used for signing cookies
 */
exports.COOKIE_SECRET = (0, assert_value_1.assertValue)(process.env.COOKIE_SECRET, 'Environment variable for COOKIE_SECRET is not set');
/**
 * (optional) Resend API Key and from Email - do not set if using SendGrid
 */
exports.RESEND_API_KEY = process.env.RESEND_API_KEY;
exports.RESEND_FROM_EMAIL = process.env.RESEND_FROM;
/**
 * (optionl) SendGrid API Key and from Email - do not set if using Resend
 */
exports.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
exports.SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL;
/**
 * (optional) Stripe API key and webhook secret
 */
exports.STRIPE_API_KEY = process.env.STRIPE_API_KEY;
exports.STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
/**
 * (optional) Meilisearch configuration
 */
exports.MEILISEARCH_HOST = process.env.MEILISEARCH_HOST;
exports.MEILISEARCH_ADMIN_KEY = process.env.MEILISEARCH_ADMIN_KEY;
/**
 * Worker mode
 */
exports.WORKER_MODE = (_c = process.env.MEDUSA_WORKER_MODE) !== null && _c !== void 0 ? _c : 'shared';
/**
 * Disable Admin
 */
exports.SHOULD_DISABLE_ADMIN = process.env.MEDUSA_DISABLE_ADMIN === 'true';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHFEQUFtRDtBQUVuRCxxREFBZ0Q7QUFFaEQsSUFBQSxlQUFPLEVBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO0FBRTdEOztHQUVHO0FBQ1UsUUFBQSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssYUFBYSxDQUFBO0FBRTVEOztHQUVHO0FBQ1UsUUFBQSxXQUFXLEdBQUcsTUFBQSxNQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLG1DQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLG1DQUFJLHVCQUF1QixDQUFBO0FBRS9IOztHQUVHO0FBQ1UsUUFBQSxZQUFZLEdBQUcsSUFBQSwwQkFBVyxFQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFDeEIsa0RBQWtELENBQ25ELENBQUE7QUFFRDs7R0FFRztBQUNVLFFBQUEsU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO0FBRS9DOztHQUVHO0FBQ1UsUUFBQSxVQUFVLEdBQUcsSUFBQSwwQkFBVyxFQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFDdEIsZ0RBQWdELENBQ2pELENBQUE7QUFFRDs7R0FFRztBQUNVLFFBQUEsU0FBUyxHQUFHLElBQUEsMEJBQVcsRUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQ3JCLCtDQUErQyxDQUNoRCxDQUFBO0FBRUQ7O0dBRUc7QUFDVSxRQUFBLFVBQVUsR0FBRyxJQUFBLDBCQUFXLEVBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUN0QixnREFBZ0QsQ0FDakQsQ0FBQTtBQUVEOztHQUVHO0FBQ1UsUUFBQSxVQUFVLEdBQUcsSUFBQSwwQkFBVyxFQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFDdEIsZ0RBQWdELENBQ2pELENBQUE7QUFFRDs7R0FFRztBQUNVLFFBQUEsYUFBYSxHQUFHLElBQUEsMEJBQVcsRUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQ3pCLG1EQUFtRCxDQUNwRCxDQUFBO0FBRUQ7O0dBRUc7QUFDVSxRQUFBLGNBQWMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztBQUM1QyxRQUFBLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO0FBRXpEOztHQUVHO0FBQ1UsUUFBQSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0FBQ2hELFFBQUEsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztBQUVuRTs7R0FFRztBQUNVLFFBQUEsY0FBYyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO0FBQzVDLFFBQUEscUJBQXFCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQztBQUV2RTs7R0FFRztBQUNVLFFBQUEsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztBQUNoRCxRQUFBLHFCQUFxQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7QUFFdkU7O0dBRUc7QUFDVSxRQUFBLFdBQVcsR0FDdEIsTUFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFpRSxtQ0FBSSxRQUFRLENBQUE7QUFFNUY7O0dBRUc7QUFDVSxRQUFBLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEtBQUssTUFBTSxDQUFBIn0=