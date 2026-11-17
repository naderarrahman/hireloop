import { getUsers } from "@/lib/api/users";
import UserManagementClient from "@/components/Dashboard/UserManagementClient";

export default async function AdminUsersPage() {
  const response = await getUsers();

  const users = Array.isArray(response)
    ? response
    : response?.users || response?.data || [];

  return <UserManagementClient initialUsers={users} />;
}