import mongoose, { Document, Schema } from "mongoose";
import { IRecruiter } from "../domain/entities/IRecruiter";


export interface IRecruiterDocument extends IRecruiter, Document {}

const recruiterSchema: Schema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
        requiree: true
    },
    companyEmail:{
        type: String,
        required: true
    },
    coverphoto:{
        type: String
    },
    status:{
        type: Boolean,
        default: true
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    avatar:{
        type: String
    },
    created_at:{
        type: Date,
        required: true,
        default: Date.now()
    }
})

export const Recruiter = mongoose.model<IRecruiterDocument>("Recruiter", recruiterSchema);