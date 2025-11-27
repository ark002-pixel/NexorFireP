import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';



export async function DELETE(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    const id = params.id;
    console.log('API Route: DELETE inspection called for id:', id);

    try {
        // Delete related records manually since Cascade is not set in schema
        console.log('Deleting related InspectionResults...');
        await prisma.inspectionResult.deleteMany({ where: { inspectionId: id } });
        console.log('Deleting related Violations...');
        await prisma.violation.deleteMany({ where: { inspectionId: id } });

        console.log('Finding related Invoices...');
        const invoices = await prisma.invoice.findMany({ where: { inspectionId: id } });
        console.log(`Found ${invoices.length} invoices.`);
        for (const invoice of invoices) {
            console.log(`Deleting InvoiceItems for invoice ${invoice.id}...`);
            await prisma.invoiceItem.deleteMany({ where: { invoiceId: invoice.id } });
            console.log(`Deleting Invoice ${invoice.id}...`);
            await prisma.invoice.delete({ where: { id: invoice.id } });
        }

        console.log('Deleting Inspection...');
        await prisma.inspection.delete({
            where: { id }
        });
        console.log('Inspection deleted successfully.');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting inspection:', error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
