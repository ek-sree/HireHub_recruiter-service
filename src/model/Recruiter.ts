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
        type: Number,
        required: true
    },
    password:{
        type: Number,
        required: true
    },
    companyname:{
        type: String,
        requiree: true
    },
    companyemail:{
        type: String,
        required: true
    },
    coverphoto:{
        type: String
    },
    status:{
        type: Boolean,
        default: false
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