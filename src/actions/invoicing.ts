'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getInvoices() {
    return await prisma.invoice.findMany({
        include: {
            permit: {
                include: {
                    building: true,
                    permitType: true
                }
            },
            inspection: {
                include: {
                    building: true
                }
            },
            items: true
        },
        orderBy: {
            date: 'desc'
        }
    });
}

export async function getInvoice(id: string) {
    return await prisma.invoice.findUnique({
        where: { id },
        include: {
            permit: {
                include: {
                    building: true,
                    permitType: true
                }
            },
            inspection: {
                include: {
                    building: true
                }
            },
            items: true
        }
    });
}
