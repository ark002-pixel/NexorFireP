
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Verifying Signature Persistence...');

    // 1. Find the inspection we've been working with (insp-002 or similar)
    // We'll look for any inspection that has signatures
    const inspection = await prisma.inspection.findFirst({
        where: {
            NOT: {
                inspectorSignature: null
            }
        }
    });

    if (inspection) {
        console.log(`✅ Found inspection with signature: ${inspection.id}`);
        console.log(`Inspector Sig Length: ${inspection.inspectorSignature?.length}`);
        console.log(`Client Sig Length: ${inspection.clientSignature?.length}`);
        console.log(`Client Name: ${inspection.clientName}`);
    } else {
        console.log('❌ No inspection found with signatures yet.');

        // Let's check if we can update one manually to test the schema
        console.log('Attempting to update an inspection manually...');
        const target = await prisma.inspection.findFirst();
        if (target) {
            await prisma.inspection.update({
                where: { id: target.id },
                data: {
                    inspectorSignature: 'test-sig-inspector',
                    clientSignature: 'test-sig-client',
                    clientName: 'Test Client'
                }
            });
            console.log('✅ Manually updated inspection with signatures.');
        }
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
