import dotenv from 'dotenv'
dotenv.config()

export default {
  jwtSecret: process.env.JWT_SECRET ?? 'ASD_!@#supersecret'
}