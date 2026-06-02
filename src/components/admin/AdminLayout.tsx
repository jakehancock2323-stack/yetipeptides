import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { adminSignOut } from "@/lib/adminAuth";
import { LayoutDashboard, Package, BarChart3, Users, Mail, LogOut, Menu, X, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/admin", label: "All Orders", icon: Package, end: true },
  { to: "/admin/domestic", label: "UK Domestic", icon: Truck },
  { to: "/admin/stats", label: "Stats", icon: BarChart3 },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/templates", label: "Email Templates", icon: Mail },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const SidebarContent = (
    <>
      <div className="p-5 border-b border-border/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-[hsl(var(--ice-blue))]" />
          <span className="font-bold tracking-wider text-sm">YETI ADMIN</span>
        </div>
        <button
          className="lg:hidden text-muted-foreground"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-[hsl(var(--ice-blue))]/15 text-[hsl(var(--ice-blue))] font-medium"
                  : "text-muted-foreground hover:bg-secondary/30 hover:text-foreground"
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-border/40 space-y-1">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-muted-foreground"
          onClick={() => navigate("/")}
        >
          ← Back to site
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive"
          onClick={async () => {
            await adminSignOut();
            navigate("/admin/login");
          }}
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 h-14 border-b border-border/40 bg-background/90 backdrop-blur-md">
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="text-foreground">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-4 h-4 text-[hsl(var(--ice-blue))]" />
          <span className="font-bold tracking-wider text-xs">YETI ADMIN</span>
        </div>
        <div className="w-6" />
      </header>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar: drawer on mobile, fixed on desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-border/40 bg-background flex flex-col transform transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {SidebarContent}
      </aside>

      <main className="lg:ml-64 p-4 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
