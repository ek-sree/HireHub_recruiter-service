import { IRecruiter } from "../../domain/entities/IRecruiter";
import { AdminRepository } from "../../domain/repositories/AdminRepository";

interface RecruiterResponse {
    success: boolean;
    recruiter_data?: Array<{
        _id: string;
        name: string;
        email: string;
        phone: string;
    }>;
    message?: string;
}

class AdminService {
    private adminRepo: AdminRepository;

    constructor() {
        this.adminRepo = new AdminRepository();
    }


    async unVerifiedRec(): Promise<RecruiterResponse> {
        try {
            let notVerifiedRec = await this.adminRepo.getUnVerifiedRecruiter();
            if(!notVerifiedRec) {
                return { success: false }
            }
            const recruiter_data = notVerifiedRec.map((recruiter: any) => {
                return {
                    _id: recruiter._id.toString(),
                    name: recruiter.name,
                    email: recruiter.email,
                    phone: recruiter.phone,
                };
            });
            return { success: true, recruiter_data };
        } catch (error) {
            const err = error as Error;
            throw new Error(`Error finding recruiter details: ${err.message}`);
        }
    }

    async verifyingRecruiter(recruiterId: string): Promise<{success: boolean, message: string}> {
        try {
            const result = await this.adminRepo.verifyRecruiter(recruiterId);
            return result;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error blocking user: ${error.message}`);
            }
            throw error;
        }
    }

    async fetchRecruiter(): Promise<any> {
        try {
            let recruiter = await this.adminRepo.getRecruiter();
            if (!recruiter) {
                return { success: false, message: "no data found" };
            }
            const recruiter_data = recruiter.map((recruiter: any) => {
                return {
                    _id: recruiter._id.toString(),
                    name: recruiter.name,
                    email: recruiter.email,
                    phone: recruiter.phone,
                    status: recruiter.status
                };
            });
            return { success: true, recruiter_data };
        } catch (error) {
            const err = error as Error;
            throw new Error(`Error finding recruiter details: ${err.message}`);
        }
    }

    async blockedRecruiter(recruiterId: string): Promise<{success: boolean, message: string}> {
    try {
        const result = await this.adminRepo.blockUnblock(recruiterId);
        return result;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error blocking user: ${error.message}`);
        }
        throw error;
    }
    }
}

export { AdminService }