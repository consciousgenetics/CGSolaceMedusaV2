/**
 * Is development environment
 */
export declare const IS_DEV: boolean;
/**
 * Public URL for the backend
 */
export declare const BACKEND_URL: string;
/**
 * Database URL for Postgres instance used by the backend
 */
export declare const DATABASE_URL: string;
/**
 * (optional) Redis URL for Redis instance used by the backend
 */
export declare const REDIS_URL: string;
/**
 * Admin CORS origins
 */
export declare const ADMIN_CORS: string;
/**
 * Auth CORS origins
 */
export declare const AUTH_CORS: string;
/**
 * Store/frontend CORS origins
 */
export declare const STORE_CORS: string;
/**
 * JWT Secret used for signing JWT tokens
 */
export declare const JWT_SECRET: string;
/**
 * Cookie secret used for signing cookies
 */
export declare const COOKIE_SECRET: string;
/**
 * (optional) Resend API Key and from Email - do not set if using SendGrid
 */
export declare const RESEND_API_KEY: string;
export declare const RESEND_FROM_EMAIL: string;
/**
 * (optionl) SendGrid API Key and from Email - do not set if using Resend
 */
export declare const SENDGRID_API_KEY: string;
export declare const SENDGRID_FROM_EMAIL: string;
/**
 * (optional) Stripe API key and webhook secret
 */
export declare const STRIPE_API_KEY: string;
export declare const STRIPE_WEBHOOK_SECRET: string;
/**
 * (optional) Meilisearch configuration
 */
export declare const MEILISEARCH_HOST: string;
export declare const MEILISEARCH_ADMIN_KEY: string;
/**
 * Worker mode
 */
export declare const WORKER_MODE: "worker" | "server" | "shared";
/**
 * Disable Admin
 */
export declare const SHOULD_DISABLE_ADMIN: boolean;
