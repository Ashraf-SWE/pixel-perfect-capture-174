import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { AppBar, MobileFrame } from "@/components/mobile-shell";
import { shops, taka } from "@/data/mock";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "কালেকশন — DealerPro" },
      { name: "description", content: "দোকানের বাকি থেকে Cash, bKash বা Bank-এ পেমেন্ট কালেকশন রেকর্ড করুন।" },
      { property: "og:title", content: "কালেকশন — DealerPro" },
      { property: "og:description", content: "বাকি আদায় ও পেমেন্ট রেকর্ড এক স্ক্রিনে।" },
    ],
  }),
  component: Collection,
});

const methods = ["Cash", "bKash", "Bank"];
const presets = [500, 1000, 2000, 5000];

function Collection() {
  const [shopId, setShopId] = useState(shops[0]!.id);
  const [amount, setAmount] = useState(2000);
  const [method, setMethod] = useState(methods[0]);
  const [saved, setSaved] = useState(false);

  const shop = shops.find((s) => s.id === shopId)!;
  const remaining = Math.max(0, shop.due - amount);

  if (saved) {
    return (
      <MobileFrame>
        <main className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-success-soft">
            <Check className="size-10 text-success" />
          </div>
          <h1 className="text-xl font-bold">কালেকশন সফল হয়েছে</h1>
          <p className="num-hero text-success">{taka(amount)}</p>
          <div className="card-surface mt-2 w-full p-4 text-left text-sm">
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">দোকান</span>
              <span className="font-semibold">{shop.name}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">আগের বাকি</span>
              <span className="font-semibold">{taka(shop.due)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">এখনকার বাকি</span>
              <span className="font-semibold text-destructive">{taka(remaining)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">মাধ্যম</span>
              <span className="font-semibold">{method}</span>
            </div>
          </div>
          <div className="mt-4 grid w-full grid-cols-2 gap-3">
            <Link to="/accounts" className="flex min-h-14 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
              হিসাব দেখুন
            </Link>
            <button onClick={() => setSaved(false)} className="min-h-14 rounded-xl bg-muted text-sm font-semibold">
              আরেকটি কালেকশন
            </button>
          </div>
        </main>
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      <AppBar title="কালেকশন" subtitle={`বর্তমান বাকি ${taka(shop.due)}`} back="/" />

      <main className="flex flex-1 flex-col gap-4 p-4">
        <section className="flex flex-col gap-2">
          <p className="text-sm font-medium">দোকান</p>
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
        </section>

        <section className="card-surface p-4">
          <p className="label-sm">কালেকশন পরিমাণ</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="num-hero text-primary">৳</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="num-hero w-full bg-transparent outline-none"
            />
          </div>
          <div className="mt-3 flex gap-2">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                className="min-h-11 flex-1 rounded-xl bg-muted text-sm font-semibold"
              >
                {p}
              </button>
            ))}
          </div>
          <p className="label-sm mt-3">কালেকশনের পর বাকি: {taka(remaining)}</p>
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-sm font-medium">পেমেন্ট মাধ্যম</p>
          <div className="grid grid-cols-3 gap-2">
            {methods.map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`min-h-12 rounded-xl text-sm font-semibold ${
                  method === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </section>

        <input
          placeholder="রেফারেন্স নম্বর (optional)"
          className="min-h-12 rounded-xl border border-input bg-card px-3.5 text-sm outline-none focus:border-primary"
        />
        <textarea
          rows={2}
          placeholder="নোট"
          className="rounded-xl border border-input bg-card p-3.5 text-sm outline-none focus:border-primary"
        />

        <button
          onClick={() => setSaved(true)}
          className="mt-auto min-h-14 rounded-xl bg-success text-base font-semibold text-success-foreground"
        >
          কালেকশন সেভ করুন
        </button>
      </main>
    </MobileFrame>
  );
}
