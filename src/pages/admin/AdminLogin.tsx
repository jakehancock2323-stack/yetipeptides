import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAdminSession } from "@/lib/adminAuth";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdminSession();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session && isAdmin) navigate("/admin", { replace: true });
  }, [session, isAdmin, loading, navigate]);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. Sign in now — your account still needs the admin role granted.");
        setMode("login");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
      }
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
          <p className="text-xs text-muted-foreground mt-1">
            {mode === "login" ? "Sign in to your admin account" : "Create your admin account"}
          </p>
        </div>
        <form onSubmit={handle} className="space-y-3">
          <div>
            <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 bg-secondary/20 border-border/30"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-xs text-muted-foreground">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="mt-1 bg-secondary/20 border-border/30"
            />
          </div>
          <Button
            type="submit"
            disabled={busy}
            className="w-full bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/80 text-background font-semibold mt-2"
          >
            {busy ? "…" : mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="text-[11px] text-muted-foreground hover:text-foreground mt-4 w-full text-center"
        >
          {mode === "login" ? "First time? Create an account" : "Have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
