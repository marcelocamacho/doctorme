import { PrismaClient } from "@prisma/client";

export default class DatabaseService{

    constructor(readonly connection: PrismaClient){}

    listDoctor(){
        return this.connection.doctor.findMany({
            include: {agenda: true,},
        });
    }

    getDoctorById(id: number, includeAgenda:boolean = false){
        return this.connection.doctor.findUnique({
            where: {id},
            include: {agenda: includeAgenda} // isso faz um join
        });
    }

    getPatientByPhone(phone: string, includeAppointment: boolean = false){
        return this.connection.patient.findUnique({
            where: {phone},
            include: {appointment:includeAppointment}
        })
    }

    getUserByPhone(phone: string){
        return this.connection.user.findUnique({
            where: {phone}
        });
    }

    createUser(phone: string, password: string){
        return this.connection.user.create({
            data: {
                phone, password,
            },
        });
    }

    createPatient(name: string, phone: string, userId: number){
        return this.connection.patient.create({
            data: {
                name, phone, userId,
            },
        });
    }

    getPatientById(id: number){
        return this.connection.patient.findUnique({
            where: {id},
        });
    }

    getAgendaById(id: number){
        return this.connection.agenda.findUnique({
            where: {id},
        });
    }
    updateAgenda(id: number, data: {available: boolean}){
        return this.connection.agenda.update({
            where: {id},
            data,
        });
    }
    createAppointment(patientId: number, doctorId: number, date: Date){
        return this.connection.appointment.create({
            data: {
                patientId, doctorId, date,
            }
        })
    }
}

export const database = new DatabaseService(new PrismaClient())