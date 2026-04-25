import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STORAGE_KEY = "us-shipping-notice-dismissed-v1";

export default function USShippingNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      const t = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleDismiss(); }}>
      <DialogContent className="frosted-glass border-amber-500/30 max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-amber-500/15 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-500 font-semibold">
              Shipping Notice
            </span>
          </div>
          <DialogTitle className="text-xl bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--frost))] bg-clip-text text-transparent">
            US Shipments Temporarily Paused
          </DialogTitle>
          <DialogDescription className="space-y-3 pt-2 text-sm leading-relaxed">
            <span className="block text-foreground/90">
              International orders to the <span className="font-semibold text-amber-500">United States</span> are currently on hold.
            </span>
            <span className="block">
              This isn't a local courier or port issue — Chinese peptide shipments are being blocked at every US entry point right now. Every vendor sourcing from overseas is in the same position.
            </span>
            <span className="block p-3 rounded-xl border border-[hsl(var(--ice-blue))]/20 bg-[hsl(var(--ice-blue))]/[0.04] text-foreground/90">
              <span className="font-semibold text-[hsl(var(--ice-blue))]">All other destinations ship as normal</span> — EU, UK, Canada, Australia, Asia, South America are completely unaffected.
            </span>
            <span className="block text-xs text-muted-foreground">
              We'll resume US shipping as soon as the situation clears. Thank you for your patience.
            </span>
          </DialogDescription>
        </DialogHeader>
        <Button
          onClick={handleDismiss}
          className="w-full bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/80 text-background font-semibold mt-2"
          size="lg"
        >
          I Understand
        </Button>
      </DialogContent>
    </Dialog>
  );
}
