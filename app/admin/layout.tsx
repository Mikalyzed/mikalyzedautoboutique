import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin | Mikalyzed Auto Boutique",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen lg:min-w-0">
        <AdminHeader />
        <main className="flex-1 p-4 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
