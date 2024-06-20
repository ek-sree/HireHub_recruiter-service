import { IRecruiter } from "../entities/IRecruiter";
import { IRecruiterRepository } from "./IRecruiterRepository";
import { Recruiter } from "../../model/Recruiter";
import bcrypt from 'bcrypt';

export class RecruiterRepository implements IRecruiterRepository {
    async findByEmail(email: string): Promise<IRecruiter | null> {
        try {
            const recruiter = Recruiter.findOne({email}).exec();
            return recruiter;
        } catch (error) {
            const err = error as Error;
            throw new Error(`Error finding user by email: ${err.message}`);
        }
    }

    async save(recruiter: IRecruiter): Promise<IRecruiter> {
        try {
            console.log("saving function repo", recruiter);
            
            const hashedPassword = await bcrypt.hash(recruiter.password, 10);
            console.log("hash",hashedPassword);
            
            const recruiterWithHashedPassword = { ...recruiter, password: hashedPassword };
            console.log("rec has", recruiterWithHashedPassword);
            
            const newRecruiter = new Recruiter(recruiterWithHashedPassword);
            console.log("newRec saving", newRecruiter);
            
             await newRecruiter.save()
             console.log("SAVED ?",newRecruiter);
             
            return newRecruiter;
        } catch (error) {
            const err = error as Error;
            throw new Error(`Error saving user: ${err.message}`);
        }
    }

    async checkRecruiter(email: string, password: string): Promise<{ success: boolean; message: string; recruiter_data?: IRecruiter | undefined; }> {
        try {
            const recruiter_data = await Recruiter.findOne({email}).exec();
            if(!recruiter_data){
                return { success: false, message:"Email is incorrect"};
            }

            const isPasswordMatch = await bcrypt.compare(password, recruiter_data.password);
            if(!isPasswordMatch){
                return { success: false, message: "Password is incorrect"};
            }
            if(recruiter_data.status !== true){
                return { success: false, message:"Your account has been blocked"};
            }
            return { success: true, message:"Recruiter found", recruiter_data }
        } catch (error) {
            const err = error as Error;
            throw new Error(`Error finding user by email and password: ${err.message}`);
        }
    }

     async getRecruiter(): Promise<IRecruiter[]> {
        try {
            const recruiter = await Recruiter.find().select('-password').exec();
            return recruiter
        } catch (error) {
                const err = error as Error;
                throw new Error(`Error fetching recruiter: ${err.message}`);
            }
    }
}