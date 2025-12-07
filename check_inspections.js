const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const inspections = await prisma.inspection.findMany({
            include: {
                building: true
            }
        });
        console.log("Inspections found:", inspections.length);
        inspections.forEach(i => {
            console.log(`ID: ${i.id}, Building: ${i.building?.name}, Status: ${i.status}`);
        });
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
