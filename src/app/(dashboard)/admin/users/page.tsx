export const dynamic = 'force-dynamic';
import { getUsers } from '@/actions/users';
import UsersClient from '@/components/admin/UsersClient';

export default async function UsersPage() {
    const users = await getUsers();

    return <UsersClient users={users} />;
}
