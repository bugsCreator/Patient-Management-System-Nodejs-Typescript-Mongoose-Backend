import { Response, Request } from "express";
import IPatient from "../Model/Interface/IPatient";

function getRouter(depenedencies: Map<String, any>) {
    const router = depenedencies.get("express").Router();
    let requestError = depenedencies.get("requestError");
    let Patient:IPatient = depenedencies.get("Patient_Bussiness");
    //creating a new patient
    router.post('/', (req: Request, res: Response) => {
        try {
            return Patient(depenedencies).save(req, res)
            
        } catch (error) {
            return requestError(res, error, "Internal server error");
        }

    });
    

    //getting all patients
    router.get('/', (req: Request, res: Response) => {
        try {
            return Patient(depenedencies).getAll(req, res)
        } catch (error) {
            return requestError(res, error, "Internal server error");
        }

    });

    router.put('/:id/detail', (req: Request, res: Response) => {
        try {
            return Patient(depenedencies).updatePatientExtra(req, res)
        } catch (error) {
            return requestError(res, error, "Internal server error");
        }
    })


    router.get('/:id', (req: Request, res: Response) => {
        try {
            return Patient(depenedencies).getPatientDetail(req, res)
        } catch (error) {
            return requestError(res, error, "Internal server error");
        }
    })
    router.delete('/:id', (req: Request, res: Response) => {
        try {
            return Patient(depenedencies).deletePatient(req, res)
        } catch (error) {
            return requestError(res, error, "Internal server error");
        }
    })
    return router
}

export default getRouter;