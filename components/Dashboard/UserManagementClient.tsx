"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Download,
  User as UserIcon,
  Briefcase,
  ShieldCheck,
  ChevronDown,
  Trash2,
  Loader2,
} from "lucide-react";
import { updateUserRole } from "@/lib/api/patch";

export interface UserData {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role?: string;
  status?: string;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  image?: string;
}

interface Props {
  initialUsers?: UserData[];
}

const ROLES = [
  {
    key: "seeker",
    label: "Seeker",
    icon: UserIcon,
    activeClass: "bg-zinc-700 text-white shadow-sm",
  },
  {
    key: "recruiter",
    label: "Recruiter",
    icon: Briefcase,
    activeClass: "bg-[#5A45FF] text-white shadow-sm shadow-[#5A45FF]/30",
  },
  {
    key: "admin",
    label: "Admin",
    icon: ShieldCheck,
    activeClass: "bg-amber-500/20 text-amber-300 border border-amber-500/40",
  },
] as const;

export default function UserManagementClient({ initialUsers = [] }: Props) {
  const router = useRouter();
  const safeUsers = Array.isArray(initialUsers) ? initialUsers : [];

  const formattedUsers = safeUsers.map((u, idx) => ({
    ...u,
    _id: u._id || u.id || `user-${idx}`,
    role:
      u.role?.toLowerCase() ||
      (u.name?.toLowerCase().includes("admin")
        ? "admin"
        : u.name?.toLowerCase().includes("recruiter")
        ? "recruiter"
        : "seeker"),
    status: u.status?.toLowerCase() || "active",
  }));

  const [users, setUsers] = useState(formattedUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: string) => {
    const targetUser = users.find((u) => u._id === userId);
    if (!targetUser || targetUser.role === newRole || updatingUserId === userId) {
      return;
    }

    const previousRole = targetUser.role;
    setUpdatingUserId(userId);

    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );

    try {
      await updateUserRole(userId, newRole);
      router.refresh();
    } catch (error) {
      console.error("Failed to update user role:", error);
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, role: previousRole } : user
        )
      );
      alert("Failed to update user role. Please try again.");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleStatusToggle = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId
          ? {
              ...user,
              status: user.status === "active" ? "suspended" : "active",
            }
          : user
      )
    );
  };

  // সার্চ ও রোল ফিল্টারিং
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalActive = users.filter((u) => u.status === "active").length;
  const recruiterCount = users.filter((u) => u.role === "recruiter").length;
  const suspendedCount = users.filter((u) => u.status === "suspended").length;
  const newSignupsCount = users.filter((u) => {
    if (!u.createdAt) return false;
    const diffHours =
      (new Date().getTime() - new Date(u.createdAt).getTime()) / (1000 * 3600);
    return diffHours <= 24;
  }).length;

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1400px] bg-[#0a0a0c] p-4 text-white md:p-8">
      {/* Top Search Bar & Filters */}
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full rounded-xl border border-zinc-800 bg-[#111114] py-2.5 pr-4 pl-10 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-[#5A45FF] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="cursor-pointer appearance-none rounded-xl border border-zinc-800 bg-[#111114] py-2.5 pr-9 pl-4 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-700 focus:outline-none"
            >
              <option value="all">All Roles</option>
              <option value="seeker">Seeker</option>
              <option value="recruiter">Recruiter</option>
              <option value="admin">Admin</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-zinc-200"
          >
            <Download className="h-3.5 w-3.5" />
            Export List
          </button>
        </div>
      </div>

      {/* Header Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          User Management
        </h1>
        <p className="mt-1 text-xs text-zinc-400 md:text-sm">
          Review, filter, and assign platform roles across all registered users.
        </p>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-zinc-800/80 bg-[#111114] p-5">
          <p className="text-xs font-medium text-zinc-400">Total Active Users</p>
          <p className="mt-2 text-3xl font-bold text-white">{totalActive}</p>
          <p className="mt-2 text-xs font-medium text-emerald-400">
            Active across platform
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-[#111114] p-5">
          <p className="text-xs font-medium text-zinc-400">Total Recruiters</p>
          <p className="mt-2 text-3xl font-bold text-white">{recruiterCount}</p>
          <p className="mt-2 text-xs font-medium text-emerald-400">
            Verified hiring accounts
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-[#111114] p-5">
          <p className="text-xs font-medium text-zinc-400">Suspended Accounts</p>
          <p className="mt-2 text-3xl font-bold text-white">{suspendedCount}</p>
          <p className="mt-2 text-xs text-zinc-500">
            {users.length > 0
              ? ((suspendedCount / users.length) * 100).toFixed(1)
              : 0}
            % of total
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-[#111114] p-5">
          <p className="text-xs font-medium text-zinc-400">New Signups (24h)</p>
          <p className="mt-2 text-3xl font-bold text-white">{newSignupsCount}</p>
          <p className="mt-2 text-xs font-medium text-amber-400">
            Recent registrations
          </p>
        </div>
      </div>

      {/* Users Data Table */}
      <div className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#111114]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-800/80 bg-[#151519]">
                <th className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                  User Info
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                  Join Date
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                  Assign Role
                </th>
                <th className="px-6 py-4 text-right text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                  Account Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredUsers.map((user) => {
                const isSuspended = user.status === "suspended";
                const isUpdating = updatingUserId === user._id;

                return (
                  <tr
                    key={user._id}
                    className={`transition-colors hover:bg-zinc-900/40 ${
                      isSuspended ? "opacity-65" : ""
                    }`}
                  >
                    {/* User Name & Email Combined */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-700/60 bg-zinc-800 text-xs font-bold text-zinc-200 uppercase">
                          {user.name?.slice(0, 2) || "US"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white capitalize">
                            {user.name}
                          </p>
                          <p className="text-xs text-zinc-400">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Join Date */}
                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          })
                        : "N/A"}
                    </td>

                    {/* Status Pill */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                          !isSuspended
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                            : "border-red-500/20 bg-red-500/10 text-red-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            !isSuspended ? "bg-emerald-400" : "bg-red-400"
                          }`}
                        />
                        {!isSuspended ? "Active" : "Suspended"}
                      </span>
                    </td>

                    {/* Segmented Role Control */}
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-2">
                        <div
                          className={`inline-flex items-center rounded-xl border border-zinc-800 bg-[#0a0a0c] p-1 ${
                            isUpdating ? "opacity-60" : ""
                          }`}
                        >
                          {ROLES.map((roleItem) => {
                            const Icon = roleItem.icon;
                            const isSelected = user.role === roleItem.key;

                            return (
                              <button
                                key={roleItem.key}
                                type="button"
                                disabled={isUpdating}
                                onClick={() =>
                                  handleRoleChange(user._id!, roleItem.key)
                                }
                                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
                                  isUpdating
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                                } ${
                                  isSelected
                                    ? roleItem.activeClass
                                    : "text-zinc-500 hover:text-zinc-300"
                                }`}
                              >
                                <Icon className="h-3.5 w-3.5" />
                                {roleItem.label}
                              </button>
                            );
                          })}
                        </div>
                        {isUpdating && (
                          <Loader2 className="h-4 w-4 animate-spin text-[#5A45FF]" />
                        )}
                      </div>
                    </td>

                    {/* Account Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => handleStatusToggle(user._id!)}
                          className={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                            !isSuspended
                              ? "border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                              : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                          }`}
                        >
                          {!isSuspended ? "Suspend" : "Activate"}
                        </button>

                        <button
                          type="button"
                          title="Delete User"
                          className="cursor-pointer rounded-lg border border-zinc-800 bg-zinc-900/60 p-1.5 text-zinc-400 transition-colors hover:border-red-500/30 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="py-12 text-center text-sm text-zinc-500">
            No users found matching your filter.
          </div>
        )}
      </div>
    </div>
  );
}