import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AVAILABLE_VARIABLES } from "@/lib/emailTemplates";
import { Save } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Template = Database["public"]["Tables"]["email_templates"]["Row"];

const TEMPLATE_LABELS: Record<string, string> = {
  order_confirmation: "Order Confirmation",
  payment_confirmation: "Payment Confirmation",
  shipping_update: "Shipping Update",
};

export default function AdminTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [drafts, setDrafts] = useState<Record<string, { subject: string; body: string }>>({});

  const load = async () => {
    const { data } = await supabase.from("email_templates").select("*").order("template_key");
    const list = (data ?? []) as Template[];
    setTemplates(list);
    const d: typeof drafts = {};
    list.forEach((t) => (d[t.id] = { subject: t.subject, body: t.body }));
    setDrafts(d);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (t: Template) => {
    const draft = drafts[t.id];
    const { error } = await supabase
      .from("email_templates")
      .update({ subject: draft.subject, body: draft.body })
      .eq("id", t.id);
    if (error) toast.error(error.message);
    else toast.success("Template saved");
  };

  const insertVar = (id: string, v: string) => {
    setDrafts((prev) => ({
      ...prev,
      [id]: { subject: prev[id].subject, body: prev[id].body + " " + v },
    }));
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-2">Email Templates</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Edit the body and subject of the emails sent from order detail pages.
        Variables in <code className="text-[hsl(var(--ice-blue))]">{"{curly_braces}"}</code> are replaced automatically per order.
      </p>

      <div className="frosted-glass rounded-xl p-4 mb-6">
        <div className="text-xs text-muted-foreground mb-2">Available variables — click to insert</div>
        <div className="flex flex-wrap gap-1.5">
          {AVAILABLE_VARIABLES.map((v) => (
            <code key={v} className="text-[11px] px-2 py-0.5 rounded bg-secondary/30 text-[hsl(var(--ice-blue))]">
              {v}
            </code>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {templates.map((t) => (
          <div key={t.id} className="frosted-glass rounded-xl p-5">
            <h2 className="font-semibold mb-4">
              {TEMPLATE_LABELS[t.template_key] || t.template_key}
            </h2>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">Subject</Label>
                <Input
                  value={drafts[t.id]?.subject ?? ""}
                  onChange={(e) =>
                    setDrafts((p) => ({ ...p, [t.id]: { ...p[t.id], subject: e.target.value } }))
                  }
                  className="mt-1 bg-secondary/20 border-border/30"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Body</Label>
                <Textarea
                  value={drafts[t.id]?.body ?? ""}
                  onChange={(e) =>
                    setDrafts((p) => ({ ...p, [t.id]: { ...p[t.id], body: e.target.value } }))
                  }
                  className="mt-1 min-h-[260px] bg-secondary/20 border-border/30 font-mono text-xs"
                />
              </div>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {AVAILABLE_VARIABLES.slice(0, 8).map((v) => (
                  <button
                    key={v}
                    onClick={() => insertVar(t.id, v)}
                    className="px-2 py-0.5 rounded bg-secondary/20 hover:bg-secondary/40 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    + {v}
                  </button>
                ))}
              </div>
              <Button onClick={() => save(t)} size="sm" className="gap-2">
                <Save className="w-3 h-3" /> Save
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
