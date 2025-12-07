import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const inspection = await prisma.inspection.findFirst({
        orderBy: { createdAt: 'desc' }
    });

    if (inspection) {
        console.log(`Latest Inspection ID: ${inspection.id}`);
    } else {
        console.log('No inspections found.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
