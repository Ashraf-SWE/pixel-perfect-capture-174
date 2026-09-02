import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AppBar, MobileFrame, StatusBadge } from "@/components/mobile-shell";
import { orders, taka } from "@/data/mock";

export const Route = createFileRoute("/orders/")({
  head: () => ({
    meta: [
      { title: "অর্ডার তালিকা — DealerPro" },
      { name: "description", content: "Pending, confirmed, delivered ও cancelled অর্ডার ট্যাব করে দেখুন।" },
      { property: "og:title", content: "অর্ডার তালিকা — DealerPro" },
      { property: "og:description", content: "আজকের সব অর্ডারের স্ট্যাটাস এক নজরে।" },
    ],
  }),
  component: OrderList,
});

const tabs = ["সব", "Pending", "Confirmed", "Delivered", "Cancelled"] as const;

function OrderList() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("সব");
  const list = orders.filter((o) => tab === "সব" || o.status === tab);

  return (
    <MobileFrame>
      <AppBar
        title="অর্ডার"
        subtitle={`${orders.length}টি অর্ডার`}
        right={
          <Link
            to="/orders/new"
            className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label="নতুন অর্ডার"
          >
            <Plus className="size-5" />
          </Link>
        }
      />
      <div className="sticky top-[65px] z-10 flex gap-2 overflow-x-auto border-b border-border bg-card px-4 pb-3">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium ${
              tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <main className="flex flex-1 flex-col gap-3 p-4">
        {list.length === 0 ? (
          <div className="card-surface p-8 text-center">
            <p className="text-sm font-semibold">আজ কোনো অর্ডার নেই</p>
            <p className="label-sm mt-1">নতুন অর্ডার নিয়ে শুরু করুন</p>
          </div>
        ) : null}
        {list.map((o) => (
          <Link key={o.id} to="/orders/$orderId" params={{ orderId: o.id }} className="card-surface p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold">#{o.id}</p>
                <p className="text-sm font-semibold">{o.shop}</p>
                <p className="label-sm">
                  {o.items}টি পণ্য • {o.time}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <StatusBadge status={o.status} />
                <p className="num-lg">{taka(o.amount)}</p>
              </div>
            </div>
          </Link>
        ))}
      </main>
    </MobileFrame>
  );
}
