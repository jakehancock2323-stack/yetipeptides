import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Star, Trash2, Plus, Eye, EyeOff } from 'lucide-react';

interface ReviewRow {
  id: string;
  product_id: string;
  customer_name: string;
  rating: number;
  title: string | null;
  body: string;
  verified_purchase: boolean;
  published: boolean;
  created_at: string;
}

export default function AdminReviews() {
  const [rows, setRows] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(
    products[0] ? [products[0].id] : []
  );
  const [form, setForm] = useState({
    customer_name: '',
    rating: 5,
    title: '',
    body: '',
    verified_purchase: true,
    published: true,
  });
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('product_reviews' as never)
      .select('*')
      .order('created_at', { ascending: false });
    if (error) toast.error(error.message);
    setRows((data ?? []) as unknown as ReviewRow[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    if (!form.customer_name.trim() || !form.body.trim()) {
      toast.error('Customer name and review body are required');
      return;
    }
    if (selectedProductIds.length === 0) {
      toast.error('Select at least one product');
      return;
    }
    setSubmitting(true);
    const payload = selectedProductIds.map((pid) => ({ ...form, product_id: pid }));
    const { error } = await supabase
      .from('product_reviews' as never)
      .insert(payload as never);
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(
      `Review added to ${selectedProductIds.length} product${selectedProductIds.length > 1 ? 's' : ''}`
    );
    setForm({
      ...form,
      customer_name: '',
      title: '',
      body: '',
      rating: 5,
    });
    load();
  };

  const toggleProduct = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const togglePublish = async (row: ReviewRow) => {
    const { error } = await supabase
      .from('product_reviews' as never)
      .update({ published: !row.published } as never)
      .eq('id', row.id);
    if (error) return toast.error(error.message);
    load();
  };

  const remove = async (row: ReviewRow) => {
    if (!confirm(`Delete review by ${row.customer_name}?`)) return;
    const { error } = await supabase
      .from('product_reviews' as never)
      .delete()
      .eq('id', row.id);
    if (error) return toast.error(error.message);
    toast.success('Deleted');
    load();
  };

  const productLabel = (id: string) =>
    products.find((p) => p.id === id)?.name ?? id;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Product Reviews</h1>
        <p className="text-sm text-muted-foreground">
          Add real customer reviews you've received. They appear on the product page with star
          ratings and feed Google's rich-snippet stars in search results.
        </p>
      </div>

      {/* Add form */}
      <section className="rounded-xl border border-border/30 bg-card/30 p-5 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4 text-ice-blue" /> Add a review
        </h2>

        <div>
          <Label className="text-xs text-muted-foreground">
            Products ({selectedProductIds.length} selected)
          </Label>
          <p className="text-[11px] text-muted-foreground mt-0.5 mb-2">
            Tick every product this review should appear on — customers often buy several.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-56 overflow-y-auto rounded-lg border border-border/30 p-3 bg-background/40">
            {products.map((p) => (
              <label
                key={p.id}
                className="flex items-center gap-2 text-sm cursor-pointer hover:text-ice-blue"
              >
                <Checkbox
                  checked={selectedProductIds.includes(p.id)}
                  onCheckedChange={() => toggleProduct(p.id)}
                />
                <span className="truncate">{p.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Customer name</Label>
          <Input
            value={form.customer_name}
            onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
            placeholder="e.g. James M."
            className="mt-1"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-muted-foreground">Rating</Label>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm({ ...form, rating: n })}
                  aria-label={`Rate ${n} stars`}
                >
                  <Star
                    className={`w-6 h-6 ${
                      n <= form.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs text-muted-foreground ml-2">{form.rating} / 5</span>
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Title (optional)</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Excellent quality"
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Review body</Label>
          <Textarea
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            rows={4}
            placeholder="Paste the customer's feedback verbatim..."
            className="mt-1"
          />
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <Switch
              checked={form.verified_purchase}
              onCheckedChange={(v) => setForm({ ...form, verified_purchase: v })}
            />
            Verified purchase
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Switch
              checked={form.published}
              onCheckedChange={(v) => setForm({ ...form, published: v })}
            />
            Publish immediately
          </label>

          <Button
            onClick={submit}
            disabled={submitting}
            className="ml-auto bg-ice-blue text-background hover:bg-ice-blue/90"
          >
            {submitting ? 'Saving…' : 'Save review'}
          </Button>
        </div>
      </section>

      {/* Existing list */}
      <section className="space-y-3">
        <h2 className="font-semibold">All reviews ({rows.length})</h2>
        {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {!loading && rows.length === 0 && (
          <p className="text-sm text-muted-foreground">No reviews yet.</p>
        )}
        {rows.map((r) => (
          <div
            key={r.id}
            className="rounded-xl border border-border/30 bg-card/30 p-4 flex gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-1">
                <span className="font-semibold text-foreground">{productLabel(r.product_id)}</span>
                <span>·</span>
                <span>{r.customer_name}</span>
                <span>·</span>
                <span>{new Date(r.created_at).toLocaleDateString('en-GB')}</span>
                {!r.published && (
                  <span className="text-amber-400">· Hidden</span>
                )}
              </div>
              <div className="flex items-center gap-0.5 mb-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    className={`w-3.5 h-3.5 ${
                      n <= r.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
              {r.title && <p className="text-sm font-semibold">{r.title}</p>}
              <p className="text-sm text-muted-foreground whitespace-pre-line">{r.body}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => togglePublish(r)}
                title={r.published ? 'Hide' : 'Publish'}
              >
                {r.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => remove(r)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
