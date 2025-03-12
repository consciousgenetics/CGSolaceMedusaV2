// Override backend URL based on environment variable
// This ensures the admin panel connects to the correct API endpoint

const MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"

console.log(`Admin panel using backend URL: ${MEDUSA_BACKEND_URL}`)

export const config = {
  apiUrl: MEDUSA_BACKEND_URL
} 