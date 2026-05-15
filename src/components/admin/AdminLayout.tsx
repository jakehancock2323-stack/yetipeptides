import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { adminSignOut } from "@/lib/adminAuth";
import { LayoutDashboard, Package, BarChart3, Users, Boxes, Mail, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/admin", label: "Orders", icon: Package, end: true },
  { to: "/admin/stats", label: "Stats", icon: BarChart3 },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/inventory", label: "Inventory", icon: Boxes },
  { to: "/admin/templates", label: "Email Templates", icon: Mail },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 w-60 border-r border-border/40 bg-background/80 backdrop-blur-md flex flex-col">
        <div className="p-5 border-b border-border/40">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-[hsl(var(--ice-blue))]" />
            <span className="font-bold tracking-wider text-sm">YETI ADMIN</span>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
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
      </aside>
      <main className="ml-60 p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
