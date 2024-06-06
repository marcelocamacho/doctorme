import DatabaseService from "@/infra/DatabaseService"
import { NotFoundError } from "@/infra/helpers/Errors";

export default class GetDoctorByIdUseCase {
    constructor (readonly database: DatabaseService){}

    async execute(id:number){
        const INCLUDE_AGENDA = true;
        const INCLUDE_DOCTOR = true;
        const doctor = await this.database.getDoctorById(id,INCLUDE_AGENDA)

        if(!doctor){
            throw new NotFoundError('Doctor not found');
        }

        return doctor;
    }
    
}