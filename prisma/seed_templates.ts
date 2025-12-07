import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Colombian Inspection Templates (Updated 2025)...');

    // Cleanup existing templates to avoid duplicates (Manual Cascade)
    const templateNames = [
        'Comercio General (NSR-10)',
        'Industria y Bodegas',
        'Propiedad Horizontal (Zonas Comunes)',
        'Sitios de Reunión (Bares/Restaurantes)'
    ];

    const templatesToDelete = await prisma.inspectionTemplate.findMany({
        where: { name: { in: templateNames } },
        select: { id: true }
    });
    const templateIds = templatesToDelete.map(t => t.id);

    if (templateIds.length > 0) {
        // Unlink inspections
        await prisma.inspection.updateMany({
            where: { templateId: { in: templateIds } },
            data: { templateId: null }
        });

        // Get items to clean up their relations
        const items = await prisma.inspectionItem.findMany({
            where: { templateId: { in: templateIds } },
            select: { id: true }
        });
        const itemIds = items.map(i => i.id);

        if (itemIds.length > 0) {
            // Delete associated codes
            await prisma.inspectionItemCode.deleteMany({
                where: { inspectionItemId: { in: itemIds } }
            });

            // Delete results
            await prisma.inspectionResult.deleteMany({
                where: { itemId: { in: itemIds } }
            });

            // Delete items
            await prisma.inspectionItem.deleteMany({
                where: { templateId: { in: templateIds } }
            });
        }

        // Delete templates
        await prisma.inspectionTemplate.deleteMany({
            where: { id: { in: templateIds } }
        });
        console.log('Cleaned up existing templates.');
    }

    // 1. COMERCIO GENERAL (NSR-10 / NTC 2885)
    const comercio = await prisma.inspectionTemplate.create({
        data: {
            name: 'Comercio General (NSR-10)',
            type: 'Annual',
            description: 'Inspección estándar para locales comerciales. Actualizado con Res. 430/431 de 2024 (DNBC) y NSR-10 vigentes.',
            items: {
                create: [
                    // Normativa 2024
                    { question: '¿Se cumple con los Procedimientos Operativos Normalizados (PON) según Res. 431/2024?', type: 'PassFail', order: 0, mandatory: true },

                    // Extintores (NTC 2885)
                    { question: '¿Los extintores están ubicados en lugares visibles y de fácil acceso?', type: 'PassFail', order: 1, mandatory: true },
                    { question: '¿La altura de instalación del extintor es correcta (máx 1.50m)?', type: 'PassFail', order: 2, mandatory: true },
                    { question: '¿El manómetro del extintor indica presión adecuada (zona verde)?', type: 'PassFail', order: 3, mandatory: true },
                    { question: '¿Cuentan con etiqueta de mantenimiento y recarga vigente?', type: 'PassFail', order: 4, mandatory: true },
                    { question: 'Foto del extintor y etiqueta', type: 'Photo', order: 5 },

                    // Rutas de Evacuación (NSR-10 Título K)
                    { question: '¿Las rutas de evacuación están libres de obstáculos y mercancía?', type: 'PassFail', order: 6, mandatory: true },
                    { question: '¿La señalización de salida de emergencia es fotoluminiscente y visible?', type: 'PassFail', order: 7, mandatory: true },
                    { question: '¿Existe iluminación de emergencia funcional en las rutas de salida?', type: 'PassFail', order: 8, mandatory: true },

                    // Eléctrico (RETIE)
                    { question: '¿El tablero eléctrico está señalizado y accesible?', type: 'PassFail', order: 9 },
                    { question: '¿Existen cables expuestos o empalmes inadecuados?', type: 'PassFail', order: 10 },
                ]
            }
        }
    });

    // 2. INDUSTRIA Y BODEGAS (NSR-10 / NFPA)
    const industria = await prisma.inspectionTemplate.create({
        data: {
            name: 'Industria y Bodegas',
            type: 'Annual',
            description: 'Instalaciones industriales. Incluye red contra incendios y materiales peligrosos. Ref: NSR-10, NFPA, Res. 430/2024.',
            items: {
                create: [
                    // Normativa 2024
                    { question: '¿Se dispone de los PON específicos para riesgos industriales (Res. 431/2024)?', type: 'PassFail', order: 0, mandatory: true },

                    // Red Contra Incendio (NSR-10 Título J)
                    { question: '¿La bomba contra incendio está en modo automático?', type: 'PassFail', order: 1, mandatory: true },
                    { question: '¿Las válvulas de control de rociadores están abiertas y supervisadas?', type: 'PassFail', order: 2, mandatory: true },
                    { question: '¿La conexión siamesa (FDC) está visible, accesible y con sus tapas?', type: 'PassFail', order: 3, mandatory: true },
                    { question: '¿Los gabinetes contra incendio cuentan con manguera y boquilla en buen estado?', type: 'PassFail', order: 4 },
                    { question: 'Foto del cuarto de bombas / Manómetros', type: 'Photo', order: 5 },

                    // Almacenamiento
                    { question: '¿El almacenamiento respeta la distancia mínima de 45cm a los rociadores?', type: 'PassFail', order: 6, mandatory: true },
                    { question: '¿Los pasillos entre estanterías cumplen con el ancho mínimo requerido?', type: 'PassFail', order: 7 },
                    { question: '¿Existe almacenamiento de líquidos inflamables fuera de gabinetes de seguridad?', type: 'PassFail', order: 8, mandatory: true },
                ]
            }
        }
    });

    // 3. PROPIEDAD HORIZONTAL (Residencial)
    const residencial = await prisma.inspectionTemplate.create({
        data: {
            name: 'Propiedad Horizontal (Zonas Comunes)',
            type: 'Annual',
            description: 'Zonas comunes residenciales. Cumplimiento NSR-10 y actualización normativa bomberil 2024.',
            items: {
                create: [
                    // Normativa 2024
                    { question: '¿El plan de emergencias está actualizado según lineamientos recientes?', type: 'PassFail', order: 0, mandatory: true },

                    // Medios de Egreso
                    { question: '¿Las puertas de las escaleras de emergencia cierran automáticamente?', type: 'PassFail', order: 1, mandatory: true },
                    { question: '¿Las puertas cortafuego ajustan correctamente y no tienen calzas?', type: 'PassFail', order: 2, mandatory: true },
                    { question: '¿La iluminación de emergencia en escaleras funciona al corte de energía?', type: 'PassFail', order: 3, mandatory: true },

                    // Red Contra Incendio
                    { question: '¿Los gabinetes en cada piso están completos (llave, manguera, hacha)?', type: 'PassFail', order: 4 },
                    { question: '¿La toma de la red seca en fachada es accesible?', type: 'PassFail', order: 5, mandatory: true },
                    { question: 'Foto de gabinete tipo', type: 'Photo', order: 6 },
                ]
            }
        }
    });

    // 4. SITIOS DE REUNIÓN (Bares, Restaurantes, Discotecas)
    const reunion = await prisma.inspectionTemplate.create({
        data: {
            name: 'Sitios de Reunión (Bares/Restaurantes)',
            type: 'Annual',
            description: 'Control de aforo y seguridad humana. Actualizado Res. 430/431 de 2024 y NFPA 101.',
            items: {
                create: [
                    // Normativa 2024
                    { question: '¿Se cumple con el cálculo de aforo actualizado y visible?', type: 'PassFail', order: 0, mandatory: true },

                    // Salidas y Aforo
                    { question: '¿Las puertas de salida abren en el sentido de evacuación y tienen barra antipánico?', type: 'PassFail', order: 1, mandatory: true },
                    { question: '¿El número de salidas es suficiente para la carga de ocupación (aforo)?', type: 'PassFail', order: 2, mandatory: true },
                    { question: '¿Las rutas de evacuación están iluminadas permanentemente?', type: 'PassFail', order: 3, mandatory: true },

                    // Cocinas (NFPA 96)
                    { question: '¿Existe sistema de extinción automático (tipo K) para la campana/freidoras?', type: 'PassFail', order: 4, mandatory: true },
                    { question: '¿Los filtros de la campana extractora están libres de grasa excesiva?', type: 'PassFail', order: 5 },
                    { question: '¿Existe un extintor Tipo K (Acetato de Potasio) accesible?', type: 'PassFail', order: 6, mandatory: true },
                    { question: 'Foto del sistema de extinción de cocina', type: 'Photo', order: 7 },
                ]
            }
        }
    });

    console.log('Templates created:', {
        comercio: comercio.name,
        industria: industria.name,
        residencial: residencial.name,
        reunion: reunion.name
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
