import NavbarLogin from "@/components/dashboard/sidebar/NavbarLogin";
import SideBar from "@/components/dashboard/sidebar/Sidebar";
import { SidebarProvider } from "@/components/dashboard/sidebar/SidebarContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <NavbarLogin />
      <SideBar />
      <main className="sm:ml-64 mt-14 p-4">{children}</main>
    </SidebarProvider>
  );
}
