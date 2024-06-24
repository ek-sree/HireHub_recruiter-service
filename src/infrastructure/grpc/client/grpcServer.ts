import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import config from '../../config';
import { recruiterController } from '../../../interfaces/controller/recruiterController';

const PROTO_PATH = path.resolve(__dirname, '../proto/recruiter.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const protoDescription = grpc.loadPackageDefinition(packageDefinition) as any;
const recruiterProto = protoDescription.recruiter;

const server = new grpc.Server();
server.addService(recruiterProto.RecruiterService.service, {
    RegisterRecruiter: recruiterController.registerRecruiter.bind(recruiterController),
    VerifyOtp: recruiterController.verifyOtp.bind(recruiterController),
    ResendOtp: recruiterController.resendOtp.bind(recruiterController),
    Login: recruiterController.loginRecruiter.bind(recruiterController),
});

const startGrpcService = () => {
    const grpcPort = config.grpcPort;
    server.bindAsync(`0.0.0.0:${grpcPort}`, grpc.ServerCredentials.createInsecure(), (err, bindPort) => {
        if (err) {
            console.log("Failed to start grpc server: ", err);
            return;
        } else {
            console.log(`grpc server running at http://0.0.0.0:${bindPort}`);
        }
    })
}

export { startGrpcService };
