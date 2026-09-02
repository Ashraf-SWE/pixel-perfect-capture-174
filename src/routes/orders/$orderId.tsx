import { createFileRoute, notFound } from "@tanstack/react-router";
import { Check, Circle } from "lucide-react";
import { AppBar, MobileFrame, StatusBadge } from "@/components/mobile-shell";
import { orders, taka } from "@/data/mock";

export const Route = createFileRoute("/orders/$orderId")({
  loader: ({ params }) => {
    const order = orders.find((o) => o.id === params.orderId);
    if (!order) throw notFound();
    return { order };
  },
  head: ({ loaderData }) => {
    const id = loaderData?.order.id ?? "";
    return {
      meta: [
        { title: `অর্ডার #${id} — DealerPro` },
        { name: "description", content: `অর্ডার #${id}-এর পণ্য, পরিমাণ, ডিসকাউন্ট ও ডেলিভারি স্ট্যাটাস।` },
        { property: "og:title", content: `অর্ডার #${id} — DealerPro` },
        { property: "og:description", content: "অর্ডারের বিস্তারিত ও স্ট্যাটাস টাইমলাইন।" },
      ],
    };
  },
  component: OrderDetails,
});

const steps = ["Order Created", "Confirmed", "Delivered"];

function OrderDetails() {
  const { order } = Route.useLoaderData();
  const subtotal = order.lines.reduce((s, l) => s + l.qty * l.price, 0);
  const doneIndex = order.status === "Delivered" ? 2 : order.status === "Confirmed" ? 1 : 0;

  return (
    <MobileFrame>
      <AppBar title={`অর্ডার #${order.id}`} subtitle={order.shop} back="/orders" right={<StatusBadge status={order.status} />} />

      <main className="flex flex-1 flex-col gap-4 p-4">
        <section className="card-surface divide-y divide-border">
          {order.lines.map((l) => (
            <div key={l.name} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-semibold">{l.name}</p>
                <p className="label-sm">
                  {l.qty} × ৳{l.price}
                </p>
              </div>
              <p className="text-sm font-bold">{taka(l.qty * l.price)}</p>
            </div>
          ))}
          <div className="space-y-1.5 px-4 py-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{taka(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Discount</span>
              <span className="text-success">-{taka(Math.max(0, subtotal - order.amount))}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 font-bold">
              <span>Total</span>
              <span className="text-primary">{taka(order.amount)}</span>
            </div>
          </div>
        </section>

        <section className="card-surface p-4">
          <p className="text-sm font-semibold">স্ট্যাটাস</p>
          <ol className="mt-3 space-y-3">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                {i <= doneIndex ? (
                  <span className="flex size-7 items-center justify-center rounded-full bg-success text-success-foreground">
                    <Check className="size-4" />
                  </span>
                ) : (
                  <span className="flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Circle className="size-3" />
                  </span>
                )}
                <span className={`text-sm ${i <= doneIndex ? "font-semibold" : "text-muted-foreground"}`}>{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <p className="label-sm text-center">চূড়ান্ত অর্ডার এডিট করা যাবে না</p>
      </main>
    </MobileFrame>
  );
}
