'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function submitPublicRequest(formData: FormData) {
    const businessName = formData.get('businessName') as string;
    const nit = formData.get('nit') as string;
    const address = formData.get('address') as string;
    const contactName = formData.get('contactName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const requestType = formData.get('requestType') as string;

    console.log('Public Request Received:', {
        businessName, nit, address, contactName, email, phone, requestType
    });

    // TODO: Save to database when PublicRequest model is available
    // await prisma.publicRequest.create({ ... })

    return { success: true, message: 'Solicitud recibida correctamente. Nos pondremos en contacto pronto.' };
}
