import { Request, Response } from "express";
import IPatient from "../Model/Patient";
import IPatientDetail from "../Model/PatientDetail";
import requestError from "../utils/requestError";
import getMulter from "../utils/multerUtil";
import { MulterError } from "multer";

export function Patient(depenedencies: Map<String, any>) {
    let requestSuccess = depenedencies.get("requestSuccess");

    async function save(req: Request, res: Response) {

        // Create a new patient instance from the request body
        const { name, age, sex, fatherName, contactNumber, designation, address } = req.body;
        if (!name || !age || !sex || !fatherName || !contactNumber || !designation || !address) {
            return requestError(res, new Error('Please fill all the fields'), 'Please fill all the fields')
        }
        const patient = new IPatient({
            name,
            age,
            sex,
            fatherName,
            contactNumber,
            designation,
            address
        });
        let response = await patient.save()
        const patientDetail = new IPatientDetail({
            patient: response._id,
            photoList: [],
            prescriptionList: []
        });

        await patientDetail.save();

        // Return success response
        return requestSuccess(res, { message: 'Patient added successfully!' });

    }
    async function getPatientDetail(req: Request, res: Response) {
        let userId = req.params.id;
        const patientDetail = await IPatientDetail.findOne({ patient: userId }).populate({ path: "patient" });
        return requestSuccess(res, patientDetail);
    }
    async function updatePatientExtra(req: Request, res: Response) {
        getMulter(depenedencies)(req, res, async (err: any) => {
            if (err instanceof MulterError) {
                return requestError(res, err, err.message)
            }
            if (err) {
                return requestError(res, err, err.message)
            };

            let photos = (req.files as any).photo;
            let prescriptions = (req.files as any).prescription;
            if (photos.length) {
                photos = [...photos.map((e: any) => e.filename)];
            } else {
                photos = []
            }

            if (prescriptions.length) {
                prescriptions = [...prescriptions.map((e: any) => e.filename)];
            } else {
                prescriptions = []
            }


            let userId = req.params.id;
            const patientDetail = await IPatientDetail.findOneAndUpdate(
                { patient: userId },
                { $push: { photoList: { $each: photos }, prescriptionList: { $each: prescriptions } } },
                { new: true }
            ).populate({ path: "patient" });;



            return requestSuccess(res, patientDetail);
        });



        // const patientDetail = await IPatientDetail.findOneAndUpdate(
        //     { patient: req.params.id },
        //     { photoList, prescriptionList },
        //     { new: true }
        //   );

        //   if (!patientDetail) {
        //     return res.status(404).json({ error: 'Patient detail not found' });
        //   }

        //   return res.json(patientDetail);

    }

    async function getAll(req: Request, res: Response) {
        // Get all patients from the database
        const patients = await IPatient.find();

        // Return success response
        return requestSuccess(res, patients);
    }

    async function deletePatient(req: Request, res: Response) {
        // Get all patients from the database
        let id = req.params.id
        if (!id) {
            return requestError(res, new Error("invalid parms"), "invalid parms")
        }
        const patients = await IPatient.deleteOne({ _id: id });

        // Return success response
        return requestSuccess(res, patients);
    }
    return { save, getAll, updatePatientExtra, getPatientDetail, deletePatient }

}