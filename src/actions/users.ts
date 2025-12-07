'use server';

import { prisma } from '@/lib/db';
import { hash } from 'bcryptjs';
import { revalidatePath } from 'next/cache';

export async function getUsers() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                // Exclude password
            }
        });
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

export async function createUser(data: any) {
    try {
        const { name, email, password, role } = data;

        if (!name || !email || !password || !role) {
            return { success: false, error: 'Todos los campos son requeridos' };
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return { success: false, error: 'El email ya está registrado' };
        }

        const hashedPassword = await hash(password, 10);

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        });

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error: any) {
        console.error('Error creating user:', error);
        return { success: false, error: error.message };
    }
}

export async function updateUser(id: string, data: any) {
    try {
        const { name, email, password, role } = data;

        const updateData: any = {
            name,
            email,
            role
        };

        // Only update password if provided
        if (password && password.trim() !== '') {
            updateData.password = await hash(password, 10);
        }

        await prisma.user.update({
            where: { id },
            data: updateData
        });

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error: any) {
        console.error('Error updating user:', error);
        return { success: false, error: error.message };
    }
}

export async function deleteUser(id: string) {
    try {
        await prisma.user.delete({
            where: { id }
        });

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error: any) {
        console.error('Error deleting user:', error);
        return { success: false, error: error.message };
    }
}
