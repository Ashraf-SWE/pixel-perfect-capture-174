import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { AppBar, MobileFrame } from "@/components/mobile-shell";
import { settlementHistory, taka, today } from "@/data/mock";

export const Route = createFileRoute("/settlement")({
  head: () => ({
    meta: [
      { title: "আজকের সেটেলমেন্ট — DealerPro" },
      { name: "description", content: "দিন শেষে ডিলারের সঙ্গে বিক্রি, কালেকশন, রিটার্ন ও ক্যাশ মিলিয়ে সেটেলমেন্ট জমা দিন।" },
      { property: "og:title", content: "আজকের সেটেলমেন্ট — DealerPro" },
      { property: "og:description", content: "Expected cash বনাম submitted cash স্বয়ংক্রিয়ভাবে মিলিয়ে দেখুন।" },
    ],
  }),
  component: Settlement,
});

function Settlement() {
  const cashCollected = 15000;
  const bkash = 3000;
  const returns = 1000;
  const expected = cashCollected;
  const [submitted, setSubmitted] = useState(expected);
  const [done, setDone] = useState(false);
  const diff = submitted - expected;

  if (done) {
    return (
      <MobileFrame>
        <main className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-success-soft">
            <Check className="size-10 text-success" />
          </div>
          <h1 className="text-xl font-bold">সেটেলমেন্ট জমা হয়েছে</h1>
          <p className="label-sm">আজকের হিসাব ডিলারের কাছে পাঠানো হয়েছে</p>
          <Link to="/" className="mt-4 min-h-14 w-full rounded-xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground">
            হোমে ফিরুন
          </Link>
        </main>
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      <AppBar title="আজকের সেটেলমেন্ট" subtitle="দিন শেষের হিসাব" back="/accounts" />

      <main className="flex flex-1 flex-col gap-4 p-4">
        <section className="card-surface divide-y divide-border text-sm">
          {[
            ["মোট বিক্রি", taka(today.sales)],
            ["মোট কালেকশন", taka(today.collection)],
            ["Cash", taka(cashCollected)],
            ["bKash", taka(bkash)],
            ["Returns", taka(returns)],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between px-4 py-3">
              <span className="text-muted-foreground">{k}</span>
              <span className="font-semibold">{v}</span>
            </div>
          ))}
        </section>

        <section className="card-surface p-4">
          <p className="label-sm">Expected Cash</p>
          <p className="num-hero">{taka(expected)}</p>
          <div className="mt-4 border-t border-border pt-3">
            <p className="label-sm">Submitted Cash</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="num-lg">৳</span>
              <input
                type="number"
                value={submitted}
                onChange={(e) => setSubmitted(Number(e.target.value))}
                className="num-lg w-full bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-muted px-3 py-3">
            <span className="text-sm font-medium">Difference</span>
            <span className={`font-bold ${diff === 0 ? "text-success" : "text-destructive"}`}>{taka(diff)}</span>
          </div>
          <p
            className={`mt-2 rounded-xl px-3 py-2.5 text-center text-sm font-semibold ${
              diff === 0 ? "bg-success-soft text-success" : "bg-warning-soft text-warning-foreground"
            }`}
          >
            {diff === 0 ? "✓ হিসাব মিলেছে" : "হিসাব মেলেনি — যাচাই করুন"}
          </p>
        </section>

        <section className="card-surface divide-y divide-border">
          <p className="px-4 py-3 text-sm font-semibold">সেটেলমেন্ট হিস্ট্রি</p>
          {settlementHistory.map((h) => (
            <div key={h.date} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-semibold">{h.date}</p>
                <p className="label-sm">
                  Sales {taka(h.sales)} • Collection {taka(h.collection)}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  h.matched ? "bg-success-soft text-success" : "bg-destructive-soft text-destructive"
                }`}
              >
                {h.matched ? "✓ Matched" : "Mismatch"}
              </span>
            </div>
          ))}
        </section>

        <button
          onClick={() => setDone(true)}
          className="mt-auto min-h-14 rounded-xl bg-primary text-base font-semibold text-primary-foreground"
        >
          সেটেলমেন্ট কনফার্ম করুন
        </button>
      </main>
    </MobileFrame>
  );
}
