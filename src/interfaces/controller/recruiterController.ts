import * as grpc from '@grpc/grpc-js';
import { fetchRecruiter, loginRecruiter, registerRecruiter, resendOtp, verifyOtp } from '../../application/use-case/recruiter';

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
            const recruiterData = call.request.recruiter_data
            const result = await verifyOtp(recruiterData);
            callback(null, result);
            console.log("Rec", result);
            
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
            console.log("resend",call.request);
            
            const result = await resendOtp(call.request);
            console.log("res resend", result);
            
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
            console.log(":login rec", call.request);
            
            const { email , password} = call.request;
            const result = await loginRecruiter(email, password);
            console.log("res login rec",result);
            
            callback(null, result);
        } catch (error) {
            const err = error as Error;
            callback({
                code: grpc.status.INTERNAL,
                message:err.message,
            },null);
        }
    },

    fetchedRecruiterData: async(call: any, callback: any) => {
        try {
           const result = await fetchRecruiter();
           console.log("recruiter fetching", result);
           callback(null, result) 
        } catch (error) {
            const err = error as Error;
            callback({
               code:grpc.status.INTERNAL,
               message:err.message,
            },null); 
           }
    }
}