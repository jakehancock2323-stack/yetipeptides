import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Snowfall from "@/components/Snowfall";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Lock, UserPlus, LogIn, ShieldCheck, Mail } from "lucide-react";

const emailSchema = z.string().trim().email("Enter a valid email").max(255);
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password too long");

export default function Auth() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initialMode = params.get("mode") === "signup" ? "signup" : "signin";
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/account", { replace: true });
  }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const emailParse = emailSchema.safeParse(email);
    const passParse = passwordSchema.safeParse(password);
    if (!emailParse.success) return toast.error(emailParse.error.issues[0].message);
    if (!passParse.success) return toast.error(passParse.error.issues[0].message);

    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: emailParse.data,
          password: passParse.data,
          options: { emailRedirectTo: `${window.location.origin}/account` },
        });
        if (error) throw error;
        toast.success("Account created — check your inbox to confirm your email.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: emailParse.data,
          password: passParse.data,
        });
        if (error) throw error;
        toast.success("Signed in.");
        navigate("/account");
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <SEO
        title={`${mode === "signup" ? "Create Account" : "Sign In"} – Yeti Pep`}
        description="Sign in to your Yeti Pep account to view past orders and track shipments."
        canonical={`https://yetipeptides.com/auth`}
      />
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-24 md:pt-28">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-aurora mb-2">Customer Portal</div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              {mode === "signup" ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {mode === "signup"
                ? "Track future orders, save delivery details and view your order history."
                : "Sign in to view your orders and shipping status."}
            </p>
          </div>

          <div className="frosted-glass rounded-2xl p-6 sm:p-8 glow-border">
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-secondary/30 mb-6">
              <button
                type="button"
                onClick={() => setMode("signin")}
                className={`py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${mode === "signin" ? "bg-[hsl(var(--ice-blue))] text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                <LogIn className="w-3.5 h-3.5 inline mr-1.5" /> Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${mode === "signup" ? "bg-[hsl(var(--ice-blue))] text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                <UserPlus className="w-3.5 h-3.5 inline mr-1.5" /> Sign Up
              </button>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Mail className="w-3 h-3" /> Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  maxLength={255}
                  className="mt-1 bg-secondary/20 border-border/30 focus:border-[hsl(var(--ice-blue))]/50"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Lock className="w-3 h-3" /> Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  required
                  minLength={8}
                  maxLength={128}
                  className="mt-1 bg-secondary/20 border-border/30 focus:border-[hsl(var(--ice-blue))]/50"
                />
                {mode === "signup" && (
                  <p className="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[hsl(var(--ice-blue))]" />
                    8+ characters · checked against breach database
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="w-full bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/80 text-background font-semibold transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--ice-blue)/0.3)]"
              >
                {loading ? "Please wait..." : mode === "signup" ? "Create Account" : "Sign In"}
              </Button>
            </form>

            <p className="text-[10px] text-muted-foreground text-center mt-5 leading-relaxed">
              By continuing you agree to our{" "}
              <Link to="/terms-conditions" className="underline hover:text-foreground">Terms</Link>{" "}
              and{" "}
              <Link to="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
