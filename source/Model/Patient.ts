import { model, Schema, Document } from 'mongoose';

export interface Patient extends Document {
    name: string;
    age: number;
    sex: string;
    fatherName: string;
    contactNumber: string;
    designation: string;
    address: string;
    patientDetail?: string;
     
}

const patientSchema = new Schema({
    patientDetail: {
        type: Schema.Types.ObjectId,
        ref: 'patientDetail',
        required: false,
        unique: true
    },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    sex: { type: String, required: true },
    fatherName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    designation: { type: String, required: true },
    address: { type: String, required: true }
});

export default model<Patient>('Patient', patientSchema);
export type IPatientInterface= Patient;
