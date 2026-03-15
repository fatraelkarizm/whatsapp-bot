"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Activity, 
  Settings, 
  LogOut, 
  Rocket,
  ChevronRight
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Products", icon: Package, path: "/admin/products" },
  { name: "Bot Status", icon: Activity, path: "/admin/status" },
  { name: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <div className="w-72 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
      <div className="p-8 border-b border-gray-50 mb-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-gray-200">
            <Rocket className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-black text-black">Digicy<span className="text-primary italic">Store</span></span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center justify-between px-6 py-4 rounded-2xl transition-all group ${
                isActive 
                  ? "bg-black text-white shadow-xl shadow-gray-200" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={22} className={isActive ? "text-primary" : "text-gray-400 group-hover:text-black"} />
                <span className="font-bold text-sm">{item.name}</span>
              </div>
              {isActive && <ChevronRight size={16} className="text-white/40" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-50 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 font-bold hover:bg-red-50 transition-all"
        >
          <LogOut size={22} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
