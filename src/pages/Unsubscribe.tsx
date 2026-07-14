import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State =
  | { kind: 'loading' }
  | { kind: 'ready' }
  | { kind: 'already' }
  | { kind: 'invalid' }
  | { kind: 'success' }
  | { kind: 'error'; message: string };

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const [state, setState] = useState<State>({ kind: 'loading' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setState({ kind: 'invalid' });
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON } },
        );
        const data = await res.json();
        if (data.valid === true) setState({ kind: 'ready' });
        else if (data.reason === 'already_unsubscribed') setState({ kind: 'already' });
        else setState({ kind: 'invalid' });
      } catch (e: any) {
        setState({ kind: 'error', message: e?.message ?? 'Unknown error' });
      }
    })();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('handle-email-unsubscribe', {
        body: { token },
      });
      if (error) throw error;
      if ((data as any)?.success || (data as any)?.reason === 'already_unsubscribed') {
        setState({ kind: 'success' });
      } else {
        setState({ kind: 'error', message: 'Could not process unsubscribe.' });
      }
    } catch (e: any) {
      setState({ kind: 'error', message: e?.message ?? 'Unknown error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="max-w-md w-full border border-border rounded-lg p-8 bg-card text-center">
        <h1 className="text-2xl font-bold mb-2 text-foreground" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          YETI PEP
        </h1>
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Email Preferences</p>

        {state.kind === 'loading' && <p className="text-muted-foreground">Checking your link…</p>}

        {state.kind === 'ready' && (
          <>
            <h2 className="text-lg font-semibold mb-3 text-foreground">Unsubscribe from emails</h2>
            <p className="text-sm text-muted-foreground mb-6">
              You'll stop receiving order and notification emails from Yeti Pep.
            </p>
            <Button onClick={confirm} disabled={submitting} className="w-full">
              {submitting ? 'Processing…' : 'Confirm Unsubscribe'}
            </Button>
          </>
        )}

        {state.kind === 'already' && (
          <p className="text-foreground">You're already unsubscribed.</p>
        )}

        {state.kind === 'success' && (
          <p className="text-foreground">You've been unsubscribed. We're sorry to see you go.</p>
        )}

        {state.kind === 'invalid' && (
          <p className="text-destructive">This unsubscribe link is invalid or has expired.</p>
        )}

        {state.kind === 'error' && (
          <p className="text-destructive">Something went wrong: {state.message}</p>
        )}
      </div>
    </div>
  );
}
