import { model, Schema, Document } from 'mongoose';


export interface PatientDetail extends Document {
    patient: any;
    photoList: [String];
    prescriptionList: [String];
   
}

const patientDetailSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
        unique: true,
        path:"patient"
    },
    photoList: {
        type: [String],
        required: true
    },
    prescriptionList: {
        type: [String],
        required: true
    }
});

export default model<PatientDetail>('PatientDetail', patientDetailSchema);
export type IPatientInterface= PatientDetail;
