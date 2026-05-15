import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { products } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface Override {
  product_id: string;
  variant_specification: string | null;
  out_of_stock: boolean;
}

export default function AdminInventory() {
  const [overrides, setOverrides] = useState<Map<string, boolean>>(new Map());
  const [search, setSearch] = useState("");

  const load = async () => {
    const { data } = await supabase.from("product_stock_overrides").select("*");
    const map = new Map<string, boolean>();
    (data ?? []).forEach((r: Override) => {
      const key = `${r.product_id}::${r.variant_specification ?? ""}`;
      map.set(key, r.out_of_stock);
    });
    setOverrides(map);
  };

  useEffect(() => {
    load();
  }, []);

  const isOOS = (productId: string, spec: string) => {
    const variantOverride = overrides.get(`${productId}::${spec}`);
    if (variantOverride !== undefined) return variantOverride;
    const productOverride = overrides.get(`${productId}::`);
    if (productOverride !== undefined) return productOverride;
    const product = products.find((p) => p.id === productId);
    const variant = product?.variants.find((v) => v.specification === spec);
    return product?.outOfStock || variant?.outOfStock || false;
  };

  const toggle = async (productId: string, spec: string, value: boolean) => {
    const key = `${productId}::${spec}`;
    const next = new Map(overrides);
    next.set(key, value);
    setOverrides(next);

    const { error } = await supabase
      .from("product_stock_overrides")
      .upsert(
        {
          product_id: productId,
          variant_specification: spec,
          out_of_stock: value,
        },
        { onConflict: "product_id,variant_specification" },
      );
    if (error) {
      toast.error(error.message);
      load();
    }
  };

  const filtered = products.filter((p) =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Inventory</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Toggle products in/out of stock without code changes. Overrides apply across the whole site.
      </p>

      <Input
        placeholder="Search products…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md mb-5 bg-secondary/20 border-border/30"
      />

      <div className="space-y-2">
        {filtered.map((p) => (
          <div key={p.id} className="frosted-glass rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">
                  {p.category} {p.region === "UK Domestic" && "· UK Domestic"}
                </div>
              </div>
            </div>
            <div className="space-y-1.5 mt-2">
              {p.variants.map((v) => {
                const oos = isOOS(p.id, v.specification);
                return (
                  <div
                    key={v.specification}
                    className="flex items-center justify-between text-sm px-3 py-2 rounded bg-secondary/15"
                  >
                    <div>
                      <span>{v.specification}</span>
                      <span className="text-muted-foreground ml-2">
                        {p.currency === "GBP" ? "£" : "$"}{v.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs ${oos ? "text-red-400" : "text-emerald-400"}`}>
                        {oos ? "Out of stock" : "In stock"}
                      </span>
                      <Switch
                        checked={!oos}
                        onCheckedChange={(checked) => toggle(p.id, v.specification, !checked)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
