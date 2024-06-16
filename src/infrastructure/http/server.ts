import express from 'express';
import config from '../config';
import { connectToDatabase } from '../database/mongodb';
import { connectToRabbitMQ } from '../mq/rabbitmq';
import { startGrpcService } from '../grpc/client/grpcServer';


const app = express();
app.use(express.json());

const startServer = async ()=>{
    try {
        await connectToDatabase();
        await connectToRabbitMQ();
        await startGrpcService()

        const port = config.port;
        app.listen(port, ()=>{
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        console.log("error running server", error); 
    }
}

startServer();