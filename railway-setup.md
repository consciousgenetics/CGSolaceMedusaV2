# Railway Deployment Setup

## Required Environment Variables

Set these environment variables in your Railway project:

### Core Configuration
```
NODE_ENV=production
DATABASE_URL=<your-postgres-url>
```

### CORS Configuration (CRITICAL for admin panel)
```
ADMIN_CORS=https://<your-railway-domain>.railway.app
AUTH_CORS=https://<your-railway-domain>.railway.app  
STORE_CORS=https://<your-railway-domain>.railway.app,https://your-frontend-domain.com
```

### Security
```
JWT_SECRET=<generate-a-secure-jwt-secret>
COOKIE_SECRET=<generate-a-secure-cookie-secret>
```

### Optional (if using Redis)
```
REDIS_URL=<your-redis-url>
```

### Email (if using SendGrid)
```
SENDGRID_API_KEY=<your-sendgrid-api-key>
SENDGRID_FROM=<your-from-email>
```

## CORS Setup Tips

1. **Single Domain Setup**: If your admin and API are on the same Railway domain:
   ```
   ADMIN_CORS=https://your-app.railway.app
   AUTH_CORS=https://your-app.railway.app
   STORE_CORS=https://your-app.railway.app
   ```

2. **Multiple Domains**: If you have separate domains:
   ```
   ADMIN_CORS=https://admin.yourdomain.com,https://your-app.railway.app
   AUTH_CORS=https://admin.yourdomain.com,https://your-app.railway.app
   STORE_CORS=https://store.yourdomain.com,https://your-app.railway.app
   ```

## Debugging Admin Panel Issues

1. Check browser console for CORS errors
2. Verify Railway environment variables are set
3. Check that RAILWAY_PUBLIC_DOMAIN_VALUE is automatically set by Railway
4. Ensure your Railway app is using HTTPS (should be automatic)

## Railway Build Command
Ensure your Railway build command is:
```
npm run build
```

## Railway Start Command  
Ensure your Railway start command is:
```
npm start
```
