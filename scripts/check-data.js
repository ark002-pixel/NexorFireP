require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const inspections = await prisma.inspection.findMany({
        where: { id: { in: ['insp-001', 'insp-002'] } },
        include: { building: true }
    });
    console.log('Total Inspections:', inspections.length);
    inspections.forEach(i => {
        console.log(`- ${i.id}: ${i.building.name} at ${i.date} (${i.status})`);
    });
}

main().finally(() => prisma.$disconnect());
