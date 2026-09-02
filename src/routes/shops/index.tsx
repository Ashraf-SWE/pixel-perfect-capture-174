import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Plus, MapPin } from "lucide-react";
import { useState } from "react";
import { AppBar, MobileFrame } from "@/components/mobile-shell";
import { shops, taka } from "@/data/mock";

export const Route = createFileRoute("/shops/")({
  head: () => ({
    meta: [
      { title: "আমার দোকান — DealerPro" },
      { name: "description", content: "SR-এর অ্যাসাইন করা দোকানের তালিকা, বাকি স্ট্যাটাস ও দ্রুত অর্ডার নেওয়ার সুবিধা।" },
      { property: "og:title", content: "আমার দোকান — DealerPro" },
      { property: "og:description", content: "দোকান খুঁজুন, বাকি দেখুন এবং এক ট্যাপে অর্ডার নিন।" },
    ],
  }),
  component: ShopList,
});

const filters = ["সব", "আজ দেখা হয়েছে", "বাকি আছে", "অর্ডার হয়নি"] as const;

function ShopList() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("সব");

  const list = shops.filter((s) => {
    const matchQ = (s.name + s.area + s.owner).toLowerCase().includes(q.toLowerCase());
    const matchF =
      filter === "সব" ||
      (filter === "আজ দেখা হয়েছে" && s.visitedToday) ||
      (filter === "বাকি আছে" && s.due > 0) ||
      (filter === "অর্ডার হয়নি" && !s.orderedToday);
    return matchQ && matchF;
  });

  return (
    <MobileFrame>
      <AppBar
        title="আমার দোকান"
        subtitle={`${shops.length}টি দোকান`}
        right={
          <Link
            to="/shops/new"
            className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label="দোকান যোগ করুন"
          >
            <Plus className="size-5" />
          </Link>
        }
      />

      <div className="sticky top-[65px] z-10 space-y-3 border-b border-border bg-card px-4 pb-3">
        <div className="flex items-center gap-2 rounded-xl bg-muted px-3">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="দোকান খুঁজুন..."
            className="min-h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium transition-colors ${
                filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <main className="flex flex-1 flex-col gap-3 p-4">
        {list.length === 0 ? (
          <div className="card-surface flex flex-col items-center gap-3 p-8 text-center">
            <p className="text-sm font-semibold">এখনও কোনো দোকান নেই</p>
            <p className="label-sm">সার্চ বা ফিল্টার বদলে দেখুন</p>
            <Link to="/shops/new" className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
              দোকান যোগ করুন
            </Link>
          </div>
        ) : null}

        {list.map((s) => (
          <article key={s.id} className="card-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Link to="/shops/$shopId" params={{ shopId: s.id }} className="font-semibold">
                  {s.name}
                </Link>
                <p className="label-sm flex items-center gap-1">
                  <MapPin className="size-3.5" /> {s.area}
                </p>
              </div>
              <div className="text-right">
                <p className="label-sm">বাকি</p>
                <p className={`font-bold ${s.due > 5000 ? "text-destructive" : s.due > 0 ? "text-warning-foreground" : "text-success"}`}>
                  {taka(s.due)}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <p className="label-sm">শেষ অর্ডার: {s.lastOrder}</p>
              <Link
                to="/orders/new"
                className="min-h-11 rounded-xl bg-primary-soft px-4 py-2.5 text-sm font-semibold text-accent-foreground"
              >
                অর্ডার নিন
              </Link>
            </div>
          </article>
        ))}
      </main>
    </MobileFrame>
  );
}
