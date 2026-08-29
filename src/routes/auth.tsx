import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import logoAsset from "@/assets/uploads/IMG-20260708-WA0087.jpg.asset.json";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — Maboko Sports Wear" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/admin", replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        if (!data.session) {
          setError("Account created — check your email to confirm, then sign in.");
          setMode("signin");
          return;
        }
      }
      navigate({ to: "/admin", replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-secondary px-4 text-secondary-foreground">
      <div className="w-full max-w-md rounded-2xl bg-background p-8 text-foreground shadow-[var(--shadow-elevated)]">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-xl bg-white ring-1 ring-border">
            <img src={logoAsset.url} alt="" className="h-full w-full object-contain p-1" />
          </span>
          <div>
            <h1 className="text-xl font-bold">Admin sign in</h1>
            <p className="text-xs text-muted-foreground">Maboko Sports Wear staff only</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Password</label>
            <input
              required
              type="password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
            />
          </div>
          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-60"
          >
            {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
          className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-primary"
        >
          {mode === "signin" ? "Create an admin account" : "I already have an account"}
        </button>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          After creating your first account, ask us to grant it admin access.
        </p>
      </div>
    </div>
  );
}
