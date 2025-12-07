require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    console.log('🌱 Seeding mobile test data...');
    console.log('DB URL:', process.env.DATABASE_URL ? 'Set' : 'Not Set');

    try {
        // 1. Get Admin User
        const admin = await prisma.user.findUnique({
            where: { email: 'admin@nexorfire.com' }
        });

        if (!admin) {
            throw new Error('Admin user not found. Please ensure database is seeded with initial users.');
        }

        console.log(`   Found Admin: ${admin.name} (${admin.id})`);

        // 1.5 Delete existing routes to force regeneration
        await prisma.route.deleteMany({ where: { inspectorId: admin.id } });
        console.log('   Deleted existing routes.');

        // 2. Create Sample Buildings
        const building1 = await prisma.building.upsert({
            where: { id: 'bldg-001' },
            update: {},
            create: {
                id: 'bldg-001',
                name: 'Torre Reforma',
                address: 'Paseo de la Reforma 483',
                city: 'Mexico City',
                type: 'High-Rise',
                floors: 57,
                latitude: 19.4233,
                longitude: -99.1756
            }
        });

        const building2 = await prisma.building.upsert({
            where: { id: 'bldg-002' },
            update: {},
            create: {
                id: 'bldg-002',
                name: 'Angel de la Independencia',
                address: 'Paseo de la Reforma',
                city: 'Mexico City',
                type: 'Monument',
                floors: 1,
                latitude: 19.4270,
                longitude: -99.1677
            }
        });

        console.log('Buildings ensured.');

        // 3. Create Inspections for Today
        const today = new Date();
        today.setHours(10, 0, 0, 0);

        const i1 = await prisma.inspection.upsert({
            where: { id: 'insp-001' },
            update: { status: 'Scheduled', date: today },
            create: {
                id: 'insp-001',
                buildingId: building1.id,
                inspectorId: admin.id,
                date: today,
                status: 'Scheduled'
            }
        });
        console.log('Upserted i1:', i1.id);

        const later = new Date(today);
        later.setHours(14, 0, 0, 0);

        const i2 = await prisma.inspection.upsert({
            where: { id: 'insp-002' },
            update: { status: 'Scheduled', date: later },
            create: {
                id: 'insp-002',
                buildingId: building2.id,
                inspectorId: admin.id,
                date: later,
                status: 'Scheduled'
            }
        });
        console.log('Upserted i2:', i2.id);

        console.log('Inspections seeded.');

    } catch (error) {
        console.error('---------------- ERROR ----------------');
        console.error('Message:', error.message);
        console.error('Code:', error.code);
        console.error('Meta:', error.meta);
        console.error('---------------------------------------');
    } finally {
        await prisma.$disconnect();
    }
}

seed();
