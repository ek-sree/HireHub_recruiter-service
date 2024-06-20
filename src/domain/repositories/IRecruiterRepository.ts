import { IRecruiter } from "../entities/IRecruiter";

export interface IRecruiterRepository {
    findByEmail(email: string): Promise<IRecruiter | null>;
    save(recruiter: IRecruiter): Promise<IRecruiter>;
    checkRecruiter(email: string, password: string): Promise<{success: boolean, message: string, recruiter_data?: IRecruiter}>;
    getRecruiter(): Promise<IRecruiter[]>
}