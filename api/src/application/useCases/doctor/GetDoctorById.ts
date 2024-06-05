import DatabaseService from "@/infra/DatabaseService"

export default class GetPatientByIdUseCase {
    constructor (readonly database: DatabaseService){}

    async execute(id:number){
        const INCLUDE_AGENDA = true;
        const doctor = await this.database.getDoctorById(id,INCLUDE_AGENDA)

        if(!doctor){
            throw new Error('Doctor not found');
        }

        return doctor;
    }
    
}