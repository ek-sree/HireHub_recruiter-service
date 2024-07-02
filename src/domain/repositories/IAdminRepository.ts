import { IRecruiter } from "../entities/IRecruiter";

export interface IAdminRepository {
    getRecruiter(page: number, limit: number): Promise<{recruiters:IRecruiter[], totalRecruiters: number}>;
}