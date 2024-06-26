import * as grpc from '@grpc/grpc-js';
import { recruiterService } from '../../application/use-case/recruiter';

class RecruiterController {
    async registerRecruiter(call: any, callback: any) {
        try {
            console.log("call req rec signup",call.request);
            
            const result = await recruiterService.registerRecruiter(call.request);
            callback(null, result);
        } catch (error) {
            const err = error as Error;
            callback({
                code: grpc.status.INTERNAL,
                message: err.message,
            }, null);
        }
    }

    async verifyOtp(call: any, callback: any) {
        try {
            const recruiterData = call.request.recruiter_data;
            const result = await recruiterService.verifyOtp(recruiterData);
            console.log("verify otp recruiter confirm controller.....",result);
            
            callback(null, result);
        } catch (error) {
            const err = error as Error;
            callback({
                code: grpc.status.INTERNAL,
                message: err.message,
            }, null);
        }
    }

    async resendOtp(call: any, callback: any) {
        try {
            const result = await recruiterService.resendOtp(call.request);
            console.log("result resned otp", result);
            
            callback(null, result);
        } catch (error) {
            const err = error as Error;
            callback({
                code: grpc.status.INTERNAL,
                message: err.message,
            }, null);
        }
    }

    async loginRecruiter(call: any, callback: any) {
        try {
            const { email, password } = call.request;
            const result = await recruiterService.loginRecruiter(email, password);
            console.log("loin recruiter controller..ld...",result);
            if (result.recruiter_data && result.recruiter_data._id) {
                result.recruiter_data._id = result.recruiter_data._id.toString();
            }
            callback(null, result);
        } catch (error) {
            const err = error as Error;
            callback({
                code: grpc.status.INTERNAL,
                message: err.message,
            }, null);
        }
    }
}

export const recruiterController = new RecruiterController();
