import { IRecruiter } from "../../domain/entities/IRecruiter";
import { RecruiterRepository } from "../../domain/repositories/RecruiterRepository";
import { sendOtpEmail } from "../../utils/emailVerification";
import { generateOtp } from "../../utils/generateOtp";

class RecruiterService {
    private recruiterRepo: RecruiterRepository;

    constructor() {
        this.recruiterRepo = new RecruiterRepository();
    }

    async registerRecruiter(recruiterData: IRecruiter): Promise<any> {
        try {
            const recruiterExist = await this.recruiterRepo.findByEmail(recruiterData.email);
            const companyEmailExist = await this.recruiterRepo.findByCompanyEmail(recruiterData.companyEmail);
            
            if (recruiterExist) {
                return { success: false, message: "Recruiter email already exists" };
            } else if (companyEmailExist) {
                return { success: false, message: "Company email already exists" };
            } else {
                const otp = generateOtp();
                await sendOtpEmail(recruiterData.companyEmail, otp);
                return { message: "Success", success: true, otp, recruiter_data: recruiterData };
            }
        } catch (error) {
            const err = error as Error;
            throw new Error(`Error saving user: ${err.message}`);
        }
    }

    async verifyOtp(recruiterData: IRecruiter): Promise<any> {
        try {
            const savedRecruiter = await this.recruiterRepo.save(recruiterData);
            return { message: "User Data saved successfully", success: true, recruiter_data: savedRecruiter };
        } catch (error) {
            const err = error as Error;
            throw new Error(`Error saving user: ${err.message}`);
        }
    }

    async resendOtp(email: { email: string }): Promise<any> {
        try {
            const otp = generateOtp();
            await sendOtpEmail(email.email, otp);
            return { success: true, newOtp: otp };
        } catch (error) {
            const err = error as Error;
            throw new Error(`Error resending OTP: ${err.message}`);
        }
    }

    async loginRecruiter(email: string, password: string): Promise<any> {
        try {
            const result = await this.recruiterRepo.checkRecruiter(email, password);
            return result;
        } catch (error) {
            const err = error as Error;
            throw new Error(`Error logging in: ${err.message}`);
        }
    }
}

export const recruiterService = new RecruiterService();
