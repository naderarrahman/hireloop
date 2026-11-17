import { getUsers } from "@/lib/api/users";
import UserManagementClient, {
  UserData,
} from "@/components/Dashboard/UserManagementClient";

export default async function AdminUsersPage() {
  const response = await getUsers();

  const rawUsers = Array.isArray(response)
    ? response
    : response?.users ?? [];

  const users: UserData[] = rawUsers.map((user) => ({
    ...user,
    createdAt: user.createdAt
      ? new Date(user.createdAt).toISOString()
      : undefined,
    updatedAt: user.updatedAt
      ? new Date(user.updatedAt).toISOString()
      : undefined,
  }));

  return <UserManagementClient initialUsers={users} />;
}