import { Request ,Response} from "express";


export default interface IPatient {
    (depenedencies: Map<String, any>) : IPatient;
    save(req:Request,res: Response): void;
    getAll(req:Request,res: Response): void;
    updatePatientExtra(req:Request,res: Response): void;
    getPatientDetail(req:Request,res: Response): void;
    deletePatient(req:Request,res:Response):void; 
}