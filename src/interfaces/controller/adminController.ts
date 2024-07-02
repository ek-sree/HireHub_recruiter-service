import { AdminService } from "../../application/use-case/admin";

class AdminController {
    private adminServicer: AdminService;

    constructor() {
        this.adminServicer = new AdminService();
    }

    async unVerifiedRecr() {
        try {
            const result = await this.adminServicer.unVerifiedRec();
            return result;
        } catch (error) {
            console.log("error fetching all recruiter", error);
        }
    }

    async verifyedRecruiter(recruiterId: string) {
        try {
            const result = await this.adminServicer.verifyingRecruiter(recruiterId)
            return result;
        } catch (error) {
            console.log("error fetching all recruiter", error);
        }
    }

    async fetchedRecruiterData(data: { page: number, limit: number }) {
        try {
            const { page, limit } = data
            const result = await this.adminServicer.fetchRecruiter(page, limit);
            return result;
        } catch (error) {
            console.log("error fetching all recruiter", error);
        }
    }

    async blockRecruiter(recruiterId: string)  {
        try {
            const result = await this.adminServicer.blockedRecruiter(recruiterId);
            return result;
        } catch (error) {
            console.error("Error blocking user:", error);
            return { success: false, message: 'Error blocking user' };
        }
    }

    async searchRecruiter(data: {searchValue: string}){
        try {
            const { searchValue } = data
            const result = await this.adminServicer.searchRecruiter(searchValue);
            return result;
        } catch (error) {
            console.error("Error searching recruiter value:", error);
            return { success: false, message: 'Error searching recruiter value' };
        }
    }
}

export const adminController = new AdminController();