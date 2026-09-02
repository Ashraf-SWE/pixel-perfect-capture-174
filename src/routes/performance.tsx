import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppBar, MobileFrame } from "@/components/mobile-shell";
import { performance, taka, today } from "@/data/mock";

export const Route = createFileRoute("/performance")({
  head: () => ({
    meta: [
      { title: "আমার পারফরম্যান্স — DealerPro" },
      { name: "description", content: "দৈনিক বিক্রি, অর্ডার সংখ্যা, কালেকশন ও টার্গেট অ্যাচিভমেন্ট সহজ চার্টে দেখুন।" },
      { property: "og:title", content: "আমার পারফরম্যান্স — DealerPro" },
      { property: "og:description", content: "SR-এর সাপ্তাহিক ও মাসিক পারফরম্যান্স রিপোর্ট।" },
    ],
  }),
  component: Performance,
});

const ranges = ["আজ", "এই সপ্তাহ", "এই মাস"] as const;

function Performance() {
  const [range, setRange] = useState<(typeof ranges)[number]>("এই সপ্তাহ");
  const max = Math.max(...performance.map((p) => p.sales));
  const weekTotal = performance.reduce((s, p) => s + p.sales, 0);

  return (
    <MobileFrame>
      <AppBar title="আমার পারফরম্যান্স" subtitle="Karim Ahmed • ABC Distribution" back="/accounts" />

      <main className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex gap-2">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`min-h-11 flex-1 rounded-xl text-sm font-medium ${
                range === r ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <section className="card-surface p-4">
          <p className="label-sm">{range} বিক্রি</p>
          <p className="num-hero text-primary">{taka(range === "আজ" ? today.sales : weekTotal)}</p>
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-3 text-center">
            <div>
              <p className="label-sm">অর্ডার</p>
              <p className="num-lg">{range === "আজ" ? today.orders : 112}</p>
            </div>
            <div>
              <p className="label-sm">কালেকশন</p>
              <p className="num-lg text-success">{taka(range === "আজ" ? today.collection : 168000)}</p>
            </div>
            <div>
              <p className="label-sm">Target</p>
              <p className="num-lg">{range === "আজ" ? "71%" : "84%"}</p>
            </div>
          </div>
        </section>

        <section className="card-surface p-4">
          <p className="text-sm font-semibold">দৈনিক বিক্রি</p>
          <div className="mt-4 flex h-40 items-end gap-2">
            {performance.map((p) => (
              <div key={p.day} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-primary"
                  style={{ height: `${(p.sales / max) * 100}%` }}
                  title={taka(p.sales)}
                />
                <span className="label-sm">{p.day}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card-surface p-4">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-semibold">মাসিক Target</p>
            <p className="label-sm">{taka(1200000)}</p>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-success" style={{ width: "84%" }} />
          </div>
          <p className="mt-2 text-sm font-semibold text-success">{taka(1008000)} • 84%</p>
        </section>
      </main>
    </MobileFrame>
  );
}
