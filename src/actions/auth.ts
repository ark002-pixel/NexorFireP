'use server';

import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcryptjs';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function registerUser(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !password) {
        return { error: 'Todos los campos son obligatorios' };
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return { error: 'El usuario ya existe' };
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    redirect('/login');
}

export async function loginUser(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: 'Todos los campos son obligatorios' };
    }

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return { error: 'Credenciales inválidas' };
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
        return { error: 'Credenciales inválidas' };
    }

    // Create session
    const session = await encrypt({ id: user.id, email: user.email, name: user.name, role: user.role });

    (await cookies()).set('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
    });

    redirect('/');
}

export async function logoutUser() {
    (await cookies()).delete('session');
    redirect('/login');
}
