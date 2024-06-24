import dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.PORT || 50052,
    dbUri: process.env.DB_URI || 'mongodb://localhost:27017/HireHub-Recruiter-service',
    grpcPort: process.env.GRPC_PORT || 50051,
    EMAIL: process.env.EMAIL_NODEMAILER,
    EMAIL_PASSWORD: process.env.PASSWORD_NODEMAILER,
    rabbitMq_url: process.env.RABBITmq_url || '',
};

if (!config.rabbitMq_url) {
    console.error('RABBITmq_url is not defined in environment variables.');
    process.exit(1); 
}


export default config;