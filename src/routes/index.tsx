import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Wallet, Store, FileBarChart, Bell, ChevronRight } from "lucide-react";
import { MobileFrame, SyncBadge } from "@/components/mobile-shell";
import { taka, sr, today, recentActivity } from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DealerPro — SR হোম ড্যাশবোর্ড" },
      {
        name: "description",
        content:
          "DealerPro: FMCG সেলস রিপ্রেজেন্টেটিভদের জন্য অর্ডার, কালেকশন, বাকি ও দৈনিক সেটেলমেন্ট এক অ্যাপে।",
      },
      { property: "og:title", content: "DealerPro — SR হোম ড্যাশবোর্ড" },
      { property: "og:description", content: "অর্ডার ও হিসাব, এক জায়গায় — SR-দের জন্য দ্রুত মোবাইল ওয়ার্কফ্লো।" },
    ],
  }),
  component: HomeScreen,
});

const quickActions = [
  { to: "/orders/new", label: "নতুন অর্ডার", icon: Plus },
  { to: "/collection", label: "কালেকশন", icon: Wallet },
  { to: "/shops/new", label: "দোকান যোগ", icon: Store },
  { to: "/accounts", label: "আজকের রিপোর্ট", icon: FileBarChart },
];

function HomeScreen() {
  const pct = Math.round((today.sales / today.target) * 100);

  return (
    <MobileFrame>
      <header className="bg-primary px-4 pb-8 pt-5 text-primary-foreground">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm opacity-90">সুপ্রভাত, করিম 👋</p>
            <p className="text-lg font-semibold">{sr.dealer}</p>
          </div>
          <div className="flex items-center gap-2">
            <SyncBadge />
            <Link
              to="/notifications"
              className="relative flex size-11 items-center justify-center rounded-full bg-primary-foreground/15"
              aria-label="নোটিফিকেশন"
            >
              <Bell className="size-5" />
              <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-warning" />
            </Link>
          </div>
        </div>
      </header>

      <main className="-mt-5 flex flex-col gap-4 px-4 pb-6">
        <section className="card-surface p-4">
          <p className="label-sm">মোট বিক্রি</p>
          <p className="num-hero text-primary">{taka(today.sales)}</p>
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-3">
            <div>
              <p className="label-sm">অর্ডার</p>
              <p className="num-lg">{today.orders}</p>
            </div>
            <div>
              <p className="label-sm">কালেকশন</p>
              <p className="num-lg text-success">{taka(today.collection)}</p>
            </div>
            <div>
              <p className="label-sm">মোট বাকি</p>
              <p className="num-lg text-destructive">{taka(today.due)}</p>
            </div>
          </div>
        </section>

        <Link
          to="/orders/new"
          className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-card transition-opacity active:opacity-90"
        >
          <Plus className="size-5" /> নতুন অর্ডার
        </Link>

        <div className="grid grid-cols-4 gap-2">
          {quickActions.map((a) => (
            <Link
              key={a.label}
              to={a.to}
              className="card-surface flex min-h-20 flex-col items-center justify-center gap-1.5 px-1 text-center text-[11px] font-medium"
            >
              <a.icon className="size-5 text-primary" />
              {a.label}
            </Link>
          ))}
        </div>

        <section className="card-surface p-4">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-semibold">আজকের Target</p>
            <p className="label-sm">{taka(today.target)}</p>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-success" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-success">{taka(today.sales)}</span>
            <span className="font-semibold">{pct}%</span>
          </div>
        </section>

        <section className="card-surface p-4">
          <p className="text-sm font-semibold">আজকের কাজ</p>
          <ul className="mt-3 grid grid-cols-3 gap-2 text-center">
            <li className="rounded-lg bg-muted p-2.5">
              <p className="num-lg">{today.shops}টি</p>
              <p className="label-sm">দোকান</p>
            </li>
            <li className="rounded-lg bg-success-soft p-2.5">
              <p className="num-lg text-success">{today.orders}টি</p>
              <p className="label-sm">অর্ডার</p>
            </li>
            <li className="rounded-lg bg-warning-soft p-2.5">
              <p className="num-lg text-warning-foreground">{today.pendingShops}টি</p>
              <p className="label-sm">বাকি দোকান</p>
            </li>
          </ul>
        </section>

        <section className="card-surface divide-y divide-border">
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-sm font-semibold">সাম্প্রতিক কাজ</p>
            <Link to="/orders" className="flex items-center text-xs font-medium text-primary">
              সব <ChevronRight className="size-4" />
            </Link>
          </div>
          {recentActivity.map((r) => (
            <div key={r.text} className="flex items-center justify-between px-4 py-3">
              <p className="text-sm">{r.text}</p>
              <p className="label-sm">{r.time}</p>
            </div>
          ))}
        </section>
      </main>
    </MobileFrame>
  );
}
