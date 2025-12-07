const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const inspection = await prisma.inspection.findFirst();
    if (inspection) {
        console.log('INSPECTION_ID:' + inspection.id);
    } else {
        console.log('NO_INSPECTIONS_FOUND');
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
