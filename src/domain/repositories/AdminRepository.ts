import mongoose from "mongoose";
import { Recruiter } from "../../model/Recruiter";
import { IRecruiter } from "../entities/IRecruiter";
import { IAdminRepository } from "./IAdminRepository";

export class AdminRepository implements IAdminRepository {

    async getRecruiter(): Promise<IRecruiter[]> {
        try {
            const recruiter = await Recruiter.find().select('-password').exec();
            return recruiter
        } catch (error) {
                const err = error as Error;
                throw new Error(`Error fetching recruiter: ${err.message}`);
            }
    }

    async blockUnblock(recruiterId: string | { recruiterId: string }): Promise<{ success: boolean, message: string }>{
        try {
            console.log("reached recruiter id", recruiterId);
            const idString = typeof recruiterId === "string" ? recruiterId : recruiterId.recruiterId;
            
            if(!mongoose.Types.ObjectId.isValid(idString)) {
                return { success: false, message: "Invalid recruiterId" };
            }
            const id = new mongoose.Types.ObjectId(idString);
            console.log("COnverted to object id", id);
            
            const recruiter = await Recruiter.findById(id);
            console.log("Recruiter found for block or unblock", recruiter);
            
            if(!recruiter){
                return { success: false, message: "recruiter not found" };
            }
            
            recruiter.status = !recruiter.status;
            await recruiter.save();
            console.log("Recruiter status updated", recruiter.status);
            
            return { success: true, message: `${recruiter.name} is now ${recruiter.status ? "blocked" : "unblocked" !}`}
        } catch (error) {
            console.error("Error in blockUnblock:", error);
            const err = error as Error;
            throw new Error(`Error blocking or unblocking recruiter: ${err.message}`);
        }
    }
}