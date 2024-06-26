import mongoose from "mongoose";
import { Recruiter } from "../../model/Recruiter";
import { IRecruiter } from "../entities/IRecruiter";
import { IAdminRepository } from "./IAdminRepository";

export class AdminRepository implements IAdminRepository {


    async getUnVerifiedRecruiter(): Promise<IRecruiter[]> {
        try {
            const unVerifiedrecruiter = await Recruiter.find({isVerified:false}).select('-password').exec();
            return unVerifiedrecruiter;
        } catch (error) {
            const err = error as Error;
            throw new Error(`Error fetching recruiter: ${err.message}`);
        }
    }


    async verifyRecruiter(recruiterId: string | { recruiterId: string }): Promise<{success:boolean, message:string}> {
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
            recruiter.isVerified = true;
            await recruiter.save()
            return { success: true, message:"Recruiter verified successfullt" }
        } catch (error) {
            const err = error as Error;
            console.log("error occured verifying recruiter", err);
            return {success: false, message: "Error happended verifying recruiter"}
        }
    }

    async getRecruiter(): Promise<IRecruiter[]> {
        try {
            const recruiter = await Recruiter.find({isVerified: true}).select('-password').exec();
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