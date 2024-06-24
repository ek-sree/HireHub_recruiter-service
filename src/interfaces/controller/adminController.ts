import { AdminService } from "../../application/use-case/admin";

class AdminController {
    private adminServicer: AdminService;

    constructor() {
        this.adminServicer = new AdminService();
    }

    async fetchedRecruiterData() {
        try {
            const result = await this.adminServicer.fetchRecruiter();
            return result;
        } catch (error) {
            console.log("error fetching all recruiter", error);
        }
    }
}

export const adminController = new AdminController();