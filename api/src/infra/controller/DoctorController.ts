import DoctorController from "@/application/controller/DoctorController";
import ListDoctorUseCase from "@/application/useCases/doctor/ListDoctor";
import GetDoctorByIdUseCase from "@/application/useCases/doctor/GetDoctorById";
import { Request, Response } from "express";
import { database } from "../DatabaseService";


export default class DoctorControllerImpl implements DoctorController {
    async listDoctor(req: Request, res: Response) {
        const useCase = new ListDoctorUseCase(database);
        const doctors = await useCase.execute();

        res.status(200).json(doctors);
    }

    async getDoctorById(req: Request, res: Response) {
        const useCase = new GetDoctorByIdUseCase(database);
        const doctor = await useCase.execute(Number(req.params.id));

        res.status(200).json(doctor);
    }
}