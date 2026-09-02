import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, BarChart3, ClipboardCheck } from "lucide-react";
import { AppBar, MobileFrame } from "@/components/mobile-shell";
import { collections, shops, taka, today, ledger } from "@/data/mock";

export const Route = createFileRoute("/accounts")({
  head: () => ({
    meta: [
      { title: "হিসাব — বাকি ও কালেকশন | DealerPro" },
      { name: "description", content: "আজকের কালেকশন, মোট বাকি, দোকানভিত্তিক বাকির তালিকা ও লেজার এক জায়গায়।" },
      { property: "og:title", content: "হিসাব — DealerPro" },
      { property: "og:description", content: "বাকি, কালেকশন ও লেজারের পূর্ণ হিসাব।" },
    ],
  }),
  component: Accounts;
});

function Accounts() {
  const totalDue = shops.reduce((s, x) => s + x.due, 0);
  const dueShops = shops.filter((s) => s.due > 0).sort((a, b) => b.due - a.due);

  return (
    <MobileFrame>
      <AppBar title="হিসাব" subtitle="বাকি, কালেকশন ও লেজার" />

      <main className="flex flex-1 flex-col gap-4 p-4">
        <section className="grid grid-cols-3 gap-2">
          <div className="card-surface p-3">
            <p className="label-sm">আজকের কালেকশন</p>
            <p className="num-lg text-success">{taka(today.collection)}</p>
          </div>
          <div className="card-surface p-3">
            <p className="label-sm">মোট বাকি</p>
            <p className="num-lg text-destructive">{taka(totalDue)}</p>
          </div>
          <div className="card-surface p-3">
            <p className="label-sm">বাকি দোকান</p>
            <p className="num-lg">{dueShops.length}টি</p>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3">
          <Link to="/settlement" className="card-surface flex min-h-16 items-center gap-2 px-4 text-sm font-semibold">
            <ClipboardCheck className="size-5 text-primary" /> সেটেলমেন্ট
          </Link>
          <Link to="/performance" className="card-surface flex min-h-16 items-center gap-2 px-4 text-sm font-semibold">
            <BarChart3 className="size-5 text-primary" /> পারফরম্যান্স
          </Link>
        </div>

        <section className="card-surface divide-y divide-border">
          <p className="px-4 py-3 text-sm font-semibold">দোকানভিত্তিক বাকি</p>
          {dueShops.map((s) => (
            <Link
              key={s.id}
              to="/shops/$shopId"
              params={{ shopId: s.id }}
              className="flex items-center justify-between px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold">{s.name}</p>
                <p className="label-sm">{s.area}</p>
              </div>
              <div className="flex items-center gap-1">
                <p className={`font-bold ${s.due > 5000 ? "text-destructive" : "text-warning-foreground"}`}>{taka(s.due)}</p>
                <ChevronRight className="size-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </section>

        <section className="card-surface divide-y divide-border">
          <p className="px-4 py-3 text-sm font-semibold">আজকের কালেকশন</p>
          {collections.map((c) => (
            <div key={c.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-semibold">{c.shop}</p>
                <p className="label-sm">
                  {c.method} • {c.time}
                </p>
              </div>
              <p className="font-bold text-success">+{taka(c.amount)}</p>
            </div>
          ))}
        </section>

        <section className="card-surface divide-y divide-border">
          <p className="px-4 py-3 text-sm font-semibold">লেজার</p>
          {ledger.map((l, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium">{l.label}</p>
                <p className="label-sm">{l.date}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${l.amount < 0 ? "text-success" : "text-destructive"}`}>
                  {l.amount < 0 ? "-" : "+"}
                  {taka(Math.abs(l.amount))}
                </p>
                <p className="label-sm">Balance {taka(l.balance)}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </MobileFrame>
  );
}
