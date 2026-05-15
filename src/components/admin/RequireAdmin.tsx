import { Navigate } from "react-router-dom";
import { useAdminSession } from "@/lib/adminAuth";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { session, isAdmin, loading } = useAdminSession();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-[hsl(var(--ice-blue))] font-mono text-sm tracking-widest animate-pulse">
          AUTHENTICATING…
        </div>
      </div>
    );
  }

  if (!session) return <Navigate to="/admin/login" replace />;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center gap-4">
        <h1 className="text-2xl font-bold text-destructive">Access denied</h1>
        <p className="text-muted-foreground max-w-md">
          You're signed in but your account doesn't have admin access. Contact the site owner to grant you the admin role.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
