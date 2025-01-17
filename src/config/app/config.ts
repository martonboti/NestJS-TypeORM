import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    nodeEnv: process.env.NODE_ENV,
    url: process.env.APP_URL,
    port: process.env.APP_PORT,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiry: process.env.JWT_EXPIRY,
}));
