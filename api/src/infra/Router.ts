import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import DoctorController from '@/application/controller/DoctorController';
import PatientController from '@/application/controller/PatientController';
import { validateBody,validateParams } from '@/infra/ValidationMiddleware';
import {authenticationSchema,createAppointmentAgendaIdSchema,createPatientPatientIdSchema,getDoctorByIdSchema,getPatientPhoneSchema} from '@/infra/ValidationSchema';
import { errorHandling } from '@/infra/helpers/ErrorHandling';

export default class Router {
    app: express.Express;

    constructor(
        readonly doctorController: DoctorController,
        readonly patientController: PatientController
    ){
        this.app = express();
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.json());
        this.setRoutes();
        this.app.use(errorHandling);
    }

    private setRoutes(){
        this.app.get('/', (req,res)=>{
            res.send('Hello World');
        });
        this.app.get('/doctors',this.doctorController.listDoctor);
        this.app.get('/doctor/:id',validateParams(getDoctorByIdSchema),this.doctorController.getDoctorById);
        this.app.post('/patient', this.patientController.createPatient);
        this.app.post('/patient/:patientId/appointment', 
            validateParams(createPatientPatientIdSchema),
            validateBody(createAppointmentAgendaIdSchema),
            this.patientController.createAppointment);
        this.app.post('/authenticate', 
            validateBody(authenticationSchema),
            this.patientController.authenticate);
        this.app.get('/patient/',validateBody(getPatientPhoneSchema),this.patientController.getPatientByPhone);
    }

    public start(port: number){
        this.app.listen(port, ()=>{
            console.log(`O Servidor esta rodando na porta ${port}`);
        });
    }
}