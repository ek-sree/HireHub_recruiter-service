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

    async fetchedRecruiterData() {
        try {
            const result = await this.adminServicer.fetchRecruiter();
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
}

export const adminController = new AdminController();