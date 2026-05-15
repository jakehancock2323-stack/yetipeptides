import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAdminSession } from "@/lib/adminAuth";
import { Lock } from "lucide-react";

// Fixed admin credentials. Username is mapped to a stable internal email so
// Supabase auth (which requires an email) keeps working unchanged.
const ADMIN_USERNAME = "yeti";
const ADMIN_PASSWORD = "peptides";
const ADMIN_EMAIL = "yeti@yetipeptides.admin";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdminSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session && isAdmin) navigate("/admin", { replace: true });
  }, [session, isAdmin, loading, navigate]);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (username.trim().toLowerCase() !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        throw new Error("Invalid username or password");
      }

      // Try sign-in first. If the account doesn't exist yet, create it.
      let { error } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      });

      if (error) {
        const signUp = await supabase.auth.signUp({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
        });
        if (signUp.error && !/registered|exists/i.test(signUp.error.message)) {
          throw signUp.error;
        }
        const retry = await supabase.auth.signInWithPassword({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
        });
        if (retry.error) throw retry.error;
      }

      // Grant admin role on first login (no-op if an admin already exists).
      await supabase.rpc("bootstrap_admin");

      toast.success("Signed in");
      navigate("/admin", { replace: true });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm frosted-glass rounded-2xl p-7 glow-border">
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-full bg-[hsl(var(--ice-blue))]/15 flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-[hsl(var(--ice-blue))]" />
          </div>
          <h1 className="text-xl font-bold tracking-wide">YETI ADMIN</h1>
          <p className="text-xs text-muted-foreground mt-1">Sign in to your admin account</p>
        </div>
        <form onSubmit={handle} className="space-y-3">
          <div>
            <Label htmlFor="username" className="text-xs text-muted-foreground">Username</Label>
            <Input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 bg-secondary/20 border-border/30"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-xs text-muted-foreground">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 bg-secondary/20 border-border/30"
            />
          </div>
          <Button
            type="submit"
            disabled={busy}
            className="w-full bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/80 text-background font-semibold mt-2"
          >
            {busy ? "…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
