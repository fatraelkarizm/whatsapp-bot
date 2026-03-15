import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import { getAuthUserFromCookie } from "@/lib/auth-guards";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUserFromCookie();

  if (!user || user.role !== UserRole.ADMIN) {
    redirect("/login?next=/admin");
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <Sidebar />
      <main className="flex-1 p-10 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
