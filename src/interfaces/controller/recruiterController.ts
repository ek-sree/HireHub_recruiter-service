import * as grpc from '@grpc/grpc-js';
import { loginRecruiter, registerRecruiter, resendOtp, verifyOtp } from '../../application/use-case/recruiter';

export const recruiterController = {
    registerRecruiter: async(call: any, callback: any)=>{
        try {
            const result = await registerRecruiter(call.request);
            callback(null, result);
        } catch (error) {
            const err = error as Error;
            callback({
                code: grpc.status.INTERNAL,
                message:err.message,
            },null);
        }
    },

    verifyOtp: async(call: any, callback: any) =>{
        try {
            const result = await verifyOtp(call.request);
            callback(null, result);
        } catch (error) {
            const err = error as Error;
            callback({
                code: grpc.status.INTERNAL,
                message:err.message,
            },null);
        }
    },

    ResendOtp: async(call: any, callback: any) =>{
        try {
            const result = await resendOtp(call.request);
            callback(null, result);
        } catch (error) {
            const err = error as Error;
            callback({
                code: grpc.status.INTERNAL,
                message:err.message,
            },null);
        }
    },

    loginRecruiter : async(call: any, callback: any) =>{
        try {
            const { email , password} = call.request;
            const result = await loginRecruiter(email, password);
            callback(null, result);
        } catch (error) {
            const err = error as Error;
            callback({
                code: grpc.status.INTERNAL,
                message:err.message,
            },null);
        }
    }
}