const Redis = require('ioredis');

// Redis connection details from your config
const redisUrl = "rediss://red-cv6vt0nnoe9s73c38dmg:Me9L0csaRcsyCr0WxDOvHOvm1JuWRJ7I@oregon-keyvalue.render.com:6379";

// Configure Redis client with more debug and error information
const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: 3,
  enableOfflineQueue: true,
  connectTimeout: 10000,
  retryStrategy: (times) => {
    console.log(`Retrying connection... Attempt: ${times}`);
    return Math.min(times * 1000, 3000);
  }
});

// Event handlers
redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('ready', () => {
  console.log('Redis client ready');
  // Try a simple command
  redis.ping().then(result => {
    console.log('PING result:', result);
    redis.quit();
  }).catch(err => {
    console.error('PING failed:', err);
    redis.quit();
  });
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

redis.on('close', () => {
  console.log('Connection closed');
});

redis.on('reconnecting', () => {
  console.log('Reconnecting to Redis...');
});

redis.on('end', () => {
  console.log('Redis client ended');
});

// Test timeout
setTimeout(() => {
  console.log('Test timeout reached. Closing connection.');
  redis.disconnect();
  process.exit(1);
}, 15000); 