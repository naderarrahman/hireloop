"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Briefcase,
  Bookmark,
  FileText,
  CreditCard,
  Settings,
  Users,
  Building2,
  Wallet,
} from "lucide-react";

const roleBasedDashboard = {
  seeker: [
    { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { name: "Jobs", url: "/dashboard/seeker/jobs", icon: Briefcase },
    { name: "Saved Jobs", url: "/dashboard/seeker/saved", icon: Bookmark },
    { name: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
    { name: "Billing", url: "/dashboard/seeker/billing", icon: CreditCard },
    { name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    { name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    { name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: Briefcase },
    { name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
    { name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],
  admin: [
    { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Users", url: "/dashboard/admin/users", icon: Users },
    { name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
    { name: "Payments", url: "/dashboard/admin/payments", icon: Wallet },
    { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
};

function UserCard({
  name,
  image,
  roleText,
  badge,
}: {
  name: string;
  image?: string;
  roleText: string;
  badge?: string;
}) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
      <div className="h-9 w-9 rounded-full bg-zinc-800 overflow-hidden flex items-center justify-center border border-zinc-700">
        {image ? (
          <Image src={image} width={36} height={36} alt="avatar" className="object-cover" />
        ) : (
          <span className="text-sm font-bold text-white">{name?.charAt(0) || "U"}</span>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-white truncate max-w-[110px]">{name || "User"}</span>
        <span className="text-[11px] text-zinc-400 font-medium">{roleText}</span>
        {badge && (
          <span className="mt-1 text-[10px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full w-fit">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const user = session?.user as { name: string; image?: string; role?: "seeker" | "recruiter" | "admin" } | undefined;
  const role = user?.role || "seeker";
  const menuItems = roleBasedDashboard[role];

  return (
    <Sidebar className="[&_[data-sidebar=sidebar]]:bg-[#0a0a0a] [&_[data-sidebar=sidebar]]:border-r [&_[data-sidebar=sidebar]]:border-zinc-800 [&_[data-sidebar=sidebar]]:text-zinc-300">
      
      <SidebarHeader className="pt-6 pb-4 px-4 flex flex-col items-start gap-4">
        <Link href="/">
          <Image src="/logo/logo.png" alt="HireLoop" width={120} height={32} className="h-7 w-auto" />
        </Link>

        {role === "admin" && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 ml-1">
            Admin Console
          </span>
        )}

        {role === "recruiter" && (
          <div className="w-full mt-2">
            <UserCard
              name={user?.name || "User"}
              image={user?.image}
              roleText="Recruiter"
              badge="Premium account"
            />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarMenu className="gap-1.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  render={
                    <Link href={item.url} className="flex items-center gap-3 w-full">
                      <div
                        className={`w-1 h-5 rounded-r-md absolute left-0 transition-colors ${
                          isActive ? "bg-[#5A45FF]" : "bg-transparent"
                        }`}
                      />
                      <item.icon className={`w-4 h-4 ${isActive ? "text-[#5A45FF]" : "text-zinc-400"}`} />
                      <span className={isActive ? "text-white font-medium" : "text-zinc-400"}>
                        {item.name}
                      </span>
                    </Link>
                  }
                  className={`w-full px-3 py-2.5 rounded-lg transition-colors hover:bg-zinc-800/50 hover:text-white ${
                    isActive ? "bg-zinc-800 text-white" : "text-zinc-400"
                  }`}
                />
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-zinc-800">
        {role === "seeker" && (
          <UserCard
            name={user?.name || "User"}
            image={user?.image}
            roleText="Pro Member"
          />
        )}

        {role === "admin" && (
          <UserCard
            name={user?.name || "User"}
            image={user?.image}
            roleText="Super Admin"
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}