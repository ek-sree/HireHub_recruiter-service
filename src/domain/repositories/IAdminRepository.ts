import { IRecruiter } from "../entities/IRecruiter";

export interface IAdminRepository {
    getRecruiter(): Promise<IRecruiter[]>;
}