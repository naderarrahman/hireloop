import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/Dashboard/Dashboard-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      
      <SidebarInset className="bg-[#050505] text-white min-h-screen">
        <header className="flex h-16 shrink-0 items-center px-4">
          <SidebarTrigger className="text-zinc-400 hover:text-white" />
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}