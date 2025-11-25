import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Inspection Templates...');

    // 1. NSR-10 Seguridad Humana (Título J/K)
    const nsr10 = await prisma.inspectionTemplate.create({
        data: {
            name: 'NSR-10 Seguridad Humana',
            type: 'Annual',
            description: 'Lista de chequeo para cumplimiento de Títulos J (Redes de Fuego) y K (Requisitos Complementarios) de la NSR-10.',
            items: {
                create: [
                    { question: '¿Las rutas de evacuación están señalizadas y libres de obstáculos?', type: 'PassFail', order: 1, mandatory: true, codeRefId: null },
                    { question: '¿Las puertas de salida abren en sentido de la evacuación?', type: 'PassFail', order: 2, mandatory: true },
                    { question: '¿Existe iluminación de emergencia funcional?', type: 'PassFail', order: 3, mandatory: true },
                    { question: '¿El ancho de las escaleras cumple con la carga de ocupación?', type: 'PassFail', order: 4 },
                    { question: 'Foto de la señalización de salida', type: 'Photo', order: 5 },
                ]
            }
        }
    });

    // 2. NTC 2885 Extintores Portátiles
    const ntc2885 = await prisma.inspectionTemplate.create({
        data: {
            name: 'NTC 2885 Extintores',
            type: 'Annual',
            description: 'Verificación de selección, distribución y mantenimiento de extintores según NTC 2885 / NFPA 10.',
            items: {
                create: [
                    { question: '¿Los extintores están en su ubicación designada?', type: 'PassFail', order: 1, mandatory: true },
                    { question: '¿El acceso a los extintores es visible y no está obstruido?', type: 'PassFail', order: 2, mandatory: true },
                    { question: '¿El manómetro indica presión en el rango operable (verde)?', type: 'PassFail', order: 3, mandatory: true },
                    { question: '¿La etiqueta de mantenimiento está vigente (último año)?', type: 'PassFail', order: 4, mandatory: true },
                    { question: 'Foto del extintor y etiqueta', type: 'Photo', order: 5 },
                ]
            }
        }
    });

    // 3. Sistemas PCI (Protección Contra Incendio)
    const pci = await prisma.inspectionTemplate.create({
        data: {
            name: 'Sistemas PCI (Rociadores/Alarmas)',
            type: 'Annual',
            description: 'Inspección visual de sistemas fijos de protección contra incendio.',
            items: {
                create: [
                    { question: '¿El panel de alarma de incendio está en estado normal (sin fallos)?', type: 'PassFail', order: 1, mandatory: true },
                    { question: '¿Las válvulas de control de rociadores están abiertas y aseguradas?', type: 'PassFail', order: 2, mandatory: true },
                    { question: '¿La conexión siamesa (FDC) es visible y accesible?', type: 'PassFail', order: 3 },
                    { question: '¿Hay cabezas de rociadores pintadas, dañadas o corroídas?', type: 'PassFail', order: 4 },
                    { question: 'Foto del panel de alarma', type: 'Photo', order: 5 },
                ]
            }
        }
    });

    console.log('Templates created:', { nsr10: nsr10.name, ntc2885: ntc2885.name, pci: pci.name });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
