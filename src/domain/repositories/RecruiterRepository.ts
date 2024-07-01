import { IRecruiter } from "../entities/IRecruiter";
import { IRecruiterRepository } from "./IRecruiterRepository";
import { Recruiter, IRecruiterDocument } from "../../model/Recruiter";
import bcrypt from 'bcrypt';

export class RecruiterRepository implements IRecruiterRepository {
    async findByEmail(email: string): Promise<IRecruiter | null> {
        try {
            const recruiter = await Recruiter.findOne({ email }).exec();
            return recruiter;
        } catch (error) {
            const err = error as Error;
            throw new Error(`Error finding user by email: ${err.message}`);
        }
    }

    async findByCompanyEmail(companyEmail: string): Promise<IRecruiter | null> {
        try {
            const recruiter = await Recruiter.findOne({ companyEmail }).exec();
            return recruiter;
        } catch (error) {
            const err = error as Error;
            throw new Error(`Error finding user by company email: ${err.message}`);
        }
    }

    async save(recruiter: IRecruiter): Promise<IRecruiter> {
        try {
            console.log("Saving recruiter:", recruiter);

            const hashedPassword = await bcrypt.hash(recruiter.password, 10);
            console.log("Hashed password:", hashedPassword);

            const recruiterWithHashedPassword = { ...recruiter, password: hashedPassword };
            const {_id, ...recruiterWithoutId} = recruiterWithHashedPassword;
            const newRecruiter = new Recruiter(recruiterWithoutId);
            console.log("New recruiter instance:", newRecruiter);

            const savedRecruiter = await newRecruiter.save();
            console.log("Saved recruiter:", savedRecruiter);

            return savedRecruiter;
        } catch (error) {
            console.error("Error saving user:", error);
            const err = error as Error;
            throw new Error(`Error finding user by company email: ${err.message}`);
        }
    }

    async checkRecruiter(email: string, password: string): Promise<{ success: boolean; message: string; recruiter_data?: IRecruiter | undefined; }> {
        try {
            const recruiter_data = await Recruiter.findOne({ email }).exec();
            if (!recruiter_data) {
                return { success: false, message: "Email is incorrect" };
            }

            const isPasswordMatch = await bcrypt.compare(password, recruiter_data.password);
            if (!isPasswordMatch) {
                return { success: false, message: "Password is incorrect" };
            }
            if (recruiter_data.status === true) {
                return { success: false, message: "Your account has been blocked" };
            }
            return { success: true, message: "Recruiter found", recruiter_data };
        } catch (error) {
            console.error("Error finding user by email and password:", error);
            const err = error as Error;
            throw new Error(`Error finding user by company email: ${err.message}`);
        }
    }
}
