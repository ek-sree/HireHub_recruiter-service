export interface IRecruiter {
    email: string;
    name: string;
    phone: string;
    companyname: string;
    companyemail: string;
    password: string;
    coverphoto?: string;
    avatar?: string;
    status?: boolean;
    isVerified?: boolean;
    created_at?: Date;
}