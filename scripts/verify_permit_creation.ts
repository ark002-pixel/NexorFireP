
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function issuePermitFromInspection(inspectionId: string) {
    try {
        const inspection = await prisma.inspection.findUnique({
            where: { id: inspectionId },
            include: { building: true }
        });

        if (!inspection) throw new Error('Inspection not found');

        const issueDate = new Date();
        const expiryDate = new Date();
        expiryDate.setDate(issueDate.getDate() + 365); // 1 year validity

        const permit = await prisma.permit.create({
            data: {
                buildingId: inspection.buildingId,
                status: 'Approved',
                issueDate,
                expiryDate,
            }
        });

        return { success: true, permitId: permit.id };
    } catch (error) {
        console.error('Error issuing permit:', error);
        return { success: false, error: String(error) };
    }
}

async function main() {
    console.log('Verifying Permit Creation Logic...');

    // 1. Get an inspection ID
    const inspection = await prisma.inspection.findFirst({
        where: { status: 'Completed' }
    });

    if (!inspection) {
        console.error('No completed inspection found to test with.');
        return;
    }

    console.log(`Testing with Inspection ID: ${inspection.id}`);

    // 2. Count existing permits
    const initialPermits = await prisma.permit.count();
    console.log(`Initial Permits: ${initialPermits}`);

    // 3. Call the function
    console.log('Calling issuePermitFromInspection...');
    const result = await issuePermitFromInspection(inspection.id);

    if (!result.success) {
        console.error('Action failed:', result.error);
        return;
    }

    console.log('Action returned success.');

    // 4. Count permits again
    const finalPermits = await prisma.permit.count();
    console.log(`Final Permits: ${finalPermits}`);

    if (finalPermits > initialPermits) {
        console.log('✅ SUCCESS: Permit was created.');
    } else {
        console.error('❌ FAILURE: Permit count did not increase.');
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
