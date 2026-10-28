import NavbarLogin from "@/components/dashboard/sidebar/NavbarLogin";
import SideBar from "@/components/dashboard/sidebar/Sidebar";
import { SidebarProvider } from "@/components/dashboard/sidebar/SidebarContext";
import { requireUser } from "@/lib/api-server";

// TODO: gli account solo genitore (senza studentId) avranno un'area dedicata
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <SidebarProvider>
      <NavbarLogin email={user.email} />
      <SideBar />
      <main className="sm:ml-64 mt-14 p-4">{children}</main>
    </SidebarProvider>
  );
}
