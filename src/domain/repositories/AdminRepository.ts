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
}