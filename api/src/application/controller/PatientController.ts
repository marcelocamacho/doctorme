import {Request,Response} from 'express';

export default interface PatientController {
    createPatient(request: Request, response: Response): Promise<void>;
    createAppointment(request:Request, response: Response): Promise<void>;
    authenticate(req: Request, res: Response): Promise<void>;
    getPatientByPhone(req:Request,res: Response): Promise<void>;

}