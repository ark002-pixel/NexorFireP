const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando carga de normativa colombiana...');

    // 1. Crear Códigos de Incendio (NSR-10, NTC)
    const codesData = [
        { code: 'NSR-10 J.2.3', description: 'Sistemas de Rociadores Automáticos', source: 'NSR-10' },
        { code: 'NSR-10 J.2.4', description: 'Tomas Fijas para Bomberos y Gabinetes', source: 'NSR-10' },
        { code: 'NSR-10 J.2.5', description: 'Hidrantes Públicos y Privados', source: 'NSR-10' },
        { code: 'NSR-10 J.3.3', description: 'Extintores Portátiles (Cantidad y Distribución)', source: 'NSR-10' },
        { code: 'NSR-10 J.4.2', description: 'Sistemas de Detección y Alarma de Incendio', source: 'NSR-10' },
        { code: 'NSR-10 K.3.2', description: 'Número y Ubicación de Salidas de Evacuación', source: 'NSR-10' },
        { code: 'NSR-10 K.3.8', description: 'Iluminación de Medios de Evacuación', source: 'NSR-10' },
        { code: 'NSR-10 K.3.9', description: 'Señalización de Salidas de Emergencia', source: 'NSR-10' },
        { code: 'NTC 2885', description: 'Extintores Portátiles: Selección, Instalación y Mantenimiento', source: 'NTC' },
        { code: 'NTC 2301', description: 'Instalación de Sistemas de Rociadores', source: 'NTC' },
        { code: 'RETIE 20.2', description: 'Instalaciones Eléctricas en Lugares de Alta Concentración', source: 'RETIE' },
    ];

    const createdCodes = [];
    for (const code of codesData) {
        const existing = await prisma.fireCode.findFirst({ where: { code: code.code } });
        if (!existing) {
            const newCode = await prisma.fireCode.create({ data: code });
            createdCodes.push(newCode);
            console.log(`Código creado: ${code.code}`);
        } else {
            createdCodes.push(existing);
            console.log(`Código existente: ${code.code}`);
        }
    }

    // Helper to find code ID by code string
    const getCodeId = (codeStr) => createdCodes.find(c => c.code === codeStr)?.id;

    // 2. Crear Plantilla de Inspección
    const templateName = 'Inspección General de Seguridad Humana (NSR-10)';
    let template = await prisma.inspectionTemplate.findFirst({ where: { name: templateName } });

    if (!template) {
        template = await prisma.inspectionTemplate.create({
            data: {
                name: templateName,
                description: 'Lista de chequeo basada en la Norma Sismo Resistente 2010 (Títulos J y K) y Normas Técnicas Colombianas.',
                type: 'Annual',
            }
        });
        console.log(`Plantilla creada: ${template.name}`);
    } else {
        console.log(`Plantilla existente: ${template.name}`);
    }

    // 3. Crear Items de Inspección vinculados a los códigos
    const itemsData = [
        {
            question: '¿Los extintores portátiles están instalados en lugares visibles y de fácil acceso?',
            type: 'PassFail',
            responseType: 'Standard',
            order: 1,
            mandatory: true,
            code: 'NSR-10 J.3.3'
        },
        {
            question: '¿La carga de los extintores está vigente y tienen el anillo de verificación correspondiente?',
            type: 'PassFail',
            responseType: 'Standard',
            order: 2,
            mandatory: true,
            code: 'NTC 2885'
        },
        {
            question: '¿Las salidas de emergencia están libres de obstáculos y operan correctamente?',
            type: 'PassFail',
            responseType: 'Standard',
            order: 3,
            mandatory: true,
            code: 'NSR-10 K.3.2'
        },
        {
            question: '¿La señalización de salidas de emergencia es fotoluminiscente y visible?',
            type: 'PassFail',
            responseType: 'Standard',
            order: 4,
            mandatory: true,
            code: 'NSR-10 K.3.9'
        },
        {
            question: '¿El sistema de iluminación de emergencia funciona al interrumpir el fluido eléctrico?',
            type: 'PassFail',
            responseType: 'Standard',
            order: 5,
            mandatory: true,
            code: 'NSR-10 K.3.8'
        },
        {
            question: '¿El sistema de detección y alarma de incendios cubre todas las áreas requeridas?',
            type: 'PassFail',
            responseType: 'Standard',
            order: 6,
            mandatory: false,
            code: 'NSR-10 J.4.2'
        },
        {
            question: '¿Los gabinetes contra incendio cuentan con manguera, válvula y boquilla en buen estado?',
            type: 'PassFail',
            responseType: 'Standard',
            order: 7,
            mandatory: false,
            code: 'NSR-10 J.2.4'
        },
        {
            question: '¿Las instalaciones eléctricas visibles se encuentran en buen estado (sin cables expuestos)?',
            type: 'PassFail',
            responseType: 'Standard',
            order: 8,
            mandatory: true,
            code: 'RETIE 20.2'
        }
    ];

    for (const item of itemsData) {
        // Check if item exists in this template to avoid duplicates
        const existingItem = await prisma.inspectionItem.findFirst({
            where: {
                templateId: template.id,
                question: item.question
            }
        });

        if (!existingItem) {
            const codeId = getCodeId(item.code);
            await prisma.inspectionItem.create({
                data: {
                    templateId: template.id,
                    question: item.question,
                    type: item.type,
                    responseType: item.responseType,
                    order: item.order,
                    mandatory: item.mandatory,
                    isMandatory: item.mandatory,
                    associatedCodes: codeId ? {
                        create: { fireCodeId: codeId }
                    } : undefined
                }
            });
            console.log(`Item creado: ${item.question.substring(0, 30)}...`);
        } else {
            console.log(`Item existente: ${item.question.substring(0, 30)}...`);
        }
    }

    console.log('Carga de normativa finalizada con éxito.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
