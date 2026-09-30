import {z} from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.string().transform(Number).default(3000),
    DATEBASE_URL: z.string().min(1, 'DATABASE_URL обязателен'),
    JWT_SECRET: z.string().min(32, 'key is 32')
})

const _env = envSchema.safeParse(process.env);

if(!_env.success) {
    console.error('Некорректные переменные окружения:', _env.error.format())
    process.exit(1)
}

export const env = _env.data