import { IRecruiter } from "../../domain/entities/IRecruiter";
import { RecruiterRepository } from "../../domain/repositories/RecruiterRepository";
import { sendOtpEmail } from "../../utils/emailVerification";
import { generateOtp } from "../../utils/generateOtp";


const recruiterRepo = new RecruiterRepository()

export const registerRecruiter = async (recruiterData: IRecruiter): Promise<any> =>{
    try {
        const recruiterExist = await recruiterRepo.findByEmail(recruiterData.email);
        if(recruiterExist) {
            return { success: false , message: "Email already exist"};
        } else{
            const otp = generateOtp();
            await sendOtpEmail(recruiterData.email, otp);
            return {message:"Succes", success: true, otp, recruiter_data: recruiterData}
        }
    } catch (error) {
        const err = error as Error;
        throw new Error(`Error saving user: ${err.message}`);
    }
};

export const verifyOtp = async (recruiterData: IRecruiter): Promise<any> =>{
    try {
        const savedRecruiter = await recruiterRepo.save(recruiterData);
        return{ message:"User Data saved successfully", success: true, recruiter_data: savedRecruiter};
    } catch (error) {
        const err = error as Error;
        throw new Error(`Error saving user: ${err.message}`);
    }
};

export const resendOtp = async(email: string): Promise<any> =>{
    try {
        const otp = generateOtp()
        await sendOtpEmail(email, otp);
        return { success: true, newOtp: otp};
    } catch (error) {
        const err = error as Error;
        throw new Error(`Error saving user: ${err.message}`);
    }
};

export const loginRecruiter = async(email: string, password: string) =>{
    try {
        const result = await recruiterRepo.checkRecruiter(email, password);
        return result;
    } catch (error) {
        const err = error as Error;
        throw new Error(`Error saving user: ${err.message}`);
    }
};
