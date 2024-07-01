export interface IRecruiter {
    _id?:string;
    name: string;
    email: string;
    phone: string;
    password: string;
    companyName: string;
    companyEmail: string;
    coverphoto?: string;
    avatar?: string;
    status?: boolean;
    isVerified?: boolean;
    created_at?: Date;
}