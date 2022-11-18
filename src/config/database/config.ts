import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
    dbApiUrl: process.env.DB_API_URL,
}));
