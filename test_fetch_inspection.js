const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const id = 'insp-001'; // Testing with one of the known IDs
    console.log(`Fetching inspection with ID: ${id}`);

    try {
        const inspection = await prisma.inspection.findUnique({
            where: { id },
            include: {
                building: true,
                template: {
                    include: {
                        items: {
                            orderBy: { order: 'asc' },
                            include: {
                                linkedItems: {
                                    include: {
                                        fireCode: true
                                    }
                                }
                            }
                        }
                    }
                },
                results: true
            }
        });

        if (inspection) {
            console.log("Inspection found!");
            console.log("Building:", inspection.building?.name);
            console.log("Template:", inspection.template?.name);
            console.log("Items count:", inspection.template?.items?.length);
        } else {
            console.log("Inspection NOT found.");
        }

    } catch (e) {
        console.error("Error fetching inspection:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
