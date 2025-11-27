'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import * as fs from 'fs';
import { prisma } from '@/lib/db';



export async function deleteInspection(id: string) {
    const log = (msg: string) => {
        try {
            fs.appendFileSync('debug_delete.log', `${new Date().toISOString()} - ${msg}\n`);
        } catch (e) {
            console.error('Failed to write to log file:', e);
        }
    };

    log(`Server Action: deleteInspection called for id: ${id}`);
    try {
        // Delete related records manually since Cascade is not set in schema
        log('Deleting related InspectionResults...');
        await prisma.inspectionResult.deleteMany({ where: { inspectionId: id } });
        log('Deleting related Violations...');
        await prisma.violation.deleteMany({ where: { inspectionId: id } });

        log('Finding related Invoices...');
        const invoices = await prisma.invoice.findMany({ where: { inspectionId: id } });
        log(`Found ${invoices.length} invoices.`);
        for (const invoice of invoices) {
            log(`Deleting InvoiceItems for invoice ${invoice.id}...`);
            await prisma.invoiceItem.deleteMany({ where: { invoiceId: invoice.id } });
            log(`Deleting Invoice ${invoice.id}...`);
            await prisma.invoice.delete({ where: { id: invoice.id } });
        }

        log('Deleting Inspection...');
        await prisma.inspection.delete({
            where: { id }
        });
        log('Inspection deleted successfully.');
        revalidatePath('/fire-prevention');
        return { success: true };
    } catch (error) {
        log(`Error deleting inspection: ${error}`);
        console.error('Error deleting inspection:', error);
        return { success: false, error: String(error) };
    }
}
