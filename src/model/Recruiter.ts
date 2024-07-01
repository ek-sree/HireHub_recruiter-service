import mongoose, { Document, Schema } from "mongoose";
import { IRecruiter } from "../domain/entities/IRecruiter";

//@ts-ignore
export interface IRecruiterDocument extends IRecruiter, Document {}

const recruiterSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    companyEmail: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

export const Recruiter = mongoose.model<IRecruiterDocument>("Recruiter", recruiterSchema);