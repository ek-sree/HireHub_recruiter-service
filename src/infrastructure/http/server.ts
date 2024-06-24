import express from 'express';
import config from '../config';
import { connectToDatabase } from '../database/mongodb';
import { startGrpcService } from '../grpc/client/grpcServer';
import RabbitMQClient from '../mq/client';

const app = express();
app.use(express.json());

const startServer = async ()=>{
    try {
        await connectToDatabase();
        await startGrpcService();
        RabbitMQClient.initialize();

        const port = config.port;
        app.listen(port, ()=>{
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        console.log("error running server", error); 
    }
}

startServer();