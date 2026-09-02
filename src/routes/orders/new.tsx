import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Minus, Plus, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { AppBar, MobileFrame } from "@/components/mobile-shell";
import { products, shops, taka } from "@/data/mock";

export const Route = createFileRoute("/orders/new")({
  head: () => ({
    meta: [
      { title: "নতুন অর্ডার নিন — DealerPro" },
      { name: "description", content: "দোকান বাছুন, পণ্য খুঁজুন, + / - দিয়ে পরিমাণ দিন এবং ১৫ সেকেন্ডে অর্ডার সাবমিট করুন।" },
      { property: "og:title", content: "নতুন অর্ডার নিন — DealerPro" },
      { property: "og:description", content: "টাইপ ছাড়াই দ্রুত অর্ডার এন্ট্রি।" },
    ],
  }),
  component: NewOrder,
});

function NewOrder() {
  const [shopId, setShopId] = useState(shops[0]!.id);
  const [q, setQ] = useState("");
  const [qty, setQty] = useState<Record<string, number>>({ "speed-250": 20, "speed-500": 10, canacur: 5 });
  const [submitted, setSubmitted] = useState(false);

  const shop = shops.find((s) => s.id === shopId)!;
  const list = useMemo(() => {
    const filtered = products.filter((p) => (p.name + p.sku).toLowerCase().includes(q.toLowerCase()));
    return [...filtered].sort((a, b) => Number(b.frequent) - Number(a.frequent));
  }, [q]);

  const lines = products.filter((p) => (qty[p.id] ?? 0) > 0);
  const subtotal = lines.reduce((s, p) => s + p.price * qty[p.id]!, 0);
  const discount = subtotal > 1000 ? 50 : 0;
  const total = subtotal - discount;

  const set = (id: string, delta: number) =>
    setQty((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) }));

  if (submitted) {
    return (
      <MobileFrame>
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-success-soft">
            <Check className="size-10 text-success" />
          </div>
          <h1 className="text-xl font-bold">অর্ডার সফল হয়েছে</h1>
          <p className="label-sm">
            {shop.name} • Order #1026
          </p>
          <p className="num-hero text-success">{taka(total)}</p>
          <div className="mt-4 grid w-full grid-cols-2 gap-3">
            <Link
              to="/orders"
              className="flex min-h-14 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
            >
              অর্ডার দেখুন
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setQty({});
              }}
              className="min-h-14 rounded-xl bg-muted text-sm font-semibold"
            >
              আরেকটি অর্ডার নিন
            </button>
          </div>
        </main>
      </MobileFrame>
    );
  }

  return (
    <MobileFrame nav={false}>
      <AppBar title="নতুন অর্ডার" subtitle={`${shop.name} • বাকি ${taka(shop.due)}`} back="/orders" />

      <div className="space-y-3 border-b border-border bg-card px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto">
          {shops.map((s) => (
            <button
              key={s.id}
              onClick={() => setShopId(s.id)}
              className={`min-h-11 whitespace-nowrap rounded-full px-3.5 text-xs font-medium ${
                shopId === s.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-muted px-3">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="পণ্য খুঁজুন..."
            className="min-h-11 flex-1 bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <main className="flex flex-1 flex-col gap-2.5 p-4 pb-2">
        <p className="label-sm">{q ? "সার্চ ফলাফল" : "নিয়মিত পণ্য"}</p>
        {list.map((p) => (
          <article key={p.id} className="card-surface flex items-center gap-3 p-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-xs font-bold text-accent-foreground">
              {p.sku.slice(0, 3)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{p.name}</p>
              <p className="label-sm">
                ৳{p.price} • {p.unit} • স্টক {p.stock}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => set(p.id, -1)}
                className="flex size-11 items-center justify-center rounded-lg bg-muted"
                aria-label="কমান"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center text-sm font-bold">{qty[p.id] ?? 0}</span>
              <button
                onClick={() => set(p.id, 1)}
                className="flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                aria-label="বাড়ান"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </article>
        ))}
      </main>

      <div className="sticky bottom-0 border-t border-border bg-card p-4 shadow-[var(--shadow-sheet)]">
        <div className="mb-3 space-y-1 text-sm">
          {lines.slice(0, 3).map((p) => (
            <div key={p.id} className="flex justify-between">
              <span className="text-muted-foreground">
                {p.name} — {qty[p.id]!} × ৳{p.price}
              </span>
              <span className="font-medium">{taka(p.price * qty[p.id]!)}</span>
            </div>
          ))}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Discount</span>
            <span className="font-medium text-success">-{taka(discount)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div>
            <p className="label-sm">Total ({lines.length}টি পণ্য)</p>
            <p className="num-lg text-primary">{taka(total)}</p>
          </div>
          <button
            disabled={lines.length === 0}
            onClick={() => setSubmitted(true)}
            className="min-h-14 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            অর্ডার সাবমিট করুন
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}
