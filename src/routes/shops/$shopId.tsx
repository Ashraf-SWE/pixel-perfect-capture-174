import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Phone, MapPin, Plus, Wallet } from "lucide-react";
import { AppBar, MobileFrame, StatusBadge } from "@/components/mobile-shell";
import { shops, orders, taka, ledger } from "@/data/mock";

export const Route = createFileRoute("/shops/$shopId")({
  loader: ({ params }) => {
    const shop = shops.find((s) => s.id === params.shopId);
    if (!shop) throw notFound();
    return { shop };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.shop.name ?? "দোকান";
    return {
      meta: [
        { title: `${name} — দোকানের বিবরণ | DealerPro` },
        { name: "description", content: `${name}-এর বাকি, শেষ অর্ডার, পেমেন্ট ও লেজার এক জায়গায় দেখুন।` },
        { property: "og:title", content: `${name} — DealerPro` },
        { property: "og:description", content: `${name}-এর অর্ডার ও বাকির হিসাব।` },
      ],
    };
  },
  component: ShopDetails,
});

function ShopDetails() {
  const { shop } = Route.useLoaderData();
  const shopOrders = orders.filter((o) => o.shopId === shop.id);

  return (
    <MobileFrame>
      <AppBar title={shop.name} subtitle={shop.owner} back="/shops" />

      <main className="flex flex-1 flex-col gap-4 p-4">
        <section className="card-surface p-4">
          <div className="flex flex-col gap-2 text-sm">
            <p className="flex items-center gap-2">
              <Phone className="size-4 text-primary" /> {shop.phone}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" /> {shop.area}
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-3">
            <div>
              <p className="label-sm">মোট বাকি</p>
              <p className="num-lg text-destructive">{taka(shop.due)}</p>
            </div>
            <div>
              <p className="label-sm">ক্রেডিট লিমিট</p>
              <p className="num-lg">{taka(shop.creditLimit)}</p>
            </div>
            <div>
              <p className="label-sm">শেষ অর্ডার</p>
              <p className="text-sm font-semibold">{shop.lastOrder}</p>
            </div>
            <div>
              <p className="label-sm">শেষ পেমেন্ট</p>
              <p className="text-sm font-semibold">{shop.lastPayment}</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/orders/new"
            className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
          >
            <Plus className="size-5" /> নতুন অর্ডার
          </Link>
          <Link
            to="/collection"
            className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-success text-sm font-semibold text-success-foreground"
          >
            <Wallet className="size-5" /> কালেকশন
          </Link>
        </div>

        <section className="card-surface divide-y divide-border">
          <p className="px-4 py-3 text-sm font-semibold">সাম্প্রতিক অর্ডার</p>
          {shopOrders.length === 0 ? (
            <p className="label-sm px-4 py-4">কোনো অর্ডার নেই</p>
          ) : (
            shopOrders.map((o) => (
              <Link
                key={o.id}
                to="/orders/$orderId"
                params={{ orderId: o.id }}
                className="flex items-center justify-between px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold">Order #{o.id}</p>
                  <p className="label-sm">{o.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={o.status} />
                  <p className="text-sm font-bold">{taka(o.amount)}</p>
                </div>
              </Link>
            ))
          )}
        </section>

        <section className="card-surface divide-y divide-border">
          <p className="px-4 py-3 text-sm font-semibold">লেজার</p>
          {ledger.slice(0, 4).map((l, i) => (
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
