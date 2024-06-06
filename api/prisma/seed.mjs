import {PrismaClient} from '@prisma/client';
import {faker} from '@faker-js/faker';

const prisma = new PrismaClient();

const specialities = [
    'Cardiologista',
    'Endocrinologista',
    'Clínico Geral',
    'Pediatra',
    'Urologista',
];

function createDoctor(){
    const doctor = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        city: faker.location.city(),
        crm: faker.commerce.isbn().slice(0,4),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        state: faker.location.state(),
        bio: faker.person.bio(),
        address: faker.location.streetAddress(true),
        speciality: specialities[Math.floor(Math.random()*specialities.length)],
        picture: `photo-${Math.floor(Math.random()*9)}.jpg`,
        price: Number(faker.commerce.price({min: 100, max: 500})),
        //availability: 'Segunda à sexta das 10:00 às 16:00',
        experience: `${Math.floor(Math.random() * 5)} anos`,
        attendances: Math.floor(Math.random() * 10),
    };
    return doctor;
}

function generateAgenda(quantity){
    const dates = [
        '2024-06-03 19:00:00',
        '2024-06-04 19:00:00',
        '2024-06-05 19:00:00',
        '2024-06-06 19:00:00',
        '2024-06-07 19:00:00',
        '2024-06-08 19:00:00',
    ];

    return dates.splice(0,quantity);
}

async function main(){
    console.log('Seed está iniciando...');
    const ROWS_QUANTITY = 10;

    for(let index = 0; index < ROWS_QUANTITY; index++){
        const ITEMS_AGENDA = Math.floor(Math.random()*5);
        const doctor = createDoctor();
        const agenda = generateAgenda(ITEMS_AGENDA);

        await prisma.doctor.create({
            data: {
                ...doctor,
                agenda: {
                    createMany:{
                        data: agenda.map((item) => ({
                            date:new Date(item).toISOString(),
                        })),
                    },
                },
            },
        });
    }
}

main();

