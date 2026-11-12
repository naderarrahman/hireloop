import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/Dashboard/Dashboard-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full bg-[#050505] min-h-screen">
        <div className="p-4">
          <SidebarTrigger className="text-zinc-400 hover:text-white" />
        </div>
        <div className="p-6">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}