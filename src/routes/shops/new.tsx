import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppBar, MobileFrame } from "@/components/mobile-shell";

export const Route = createFileRoute("/shops/new")({
  head: () => ({
    meta: [
      { title: "নতুন দোকান যোগ করুন — DealerPro" },
      { name: "description", content: "দোকানের নাম, মালিক, মোবাইল ও এলাকা দিয়ে দ্রুত নতুন দোকান যোগ করুন।" },
      { property: "og:title", content: "নতুন দোকান যোগ করুন — DealerPro" },
      { property: "og:description", content: "ছোট ফর্মে নতুন দোকান রেজিস্টার করুন।" },
    ],
  }),
  component: AddShop,
});

const fields = [
  { label: "দোকানের নাম", placeholder: "যেমন: Rahim Store", required: true },
  { label: "মালিকের নাম", placeholder: "যেমন: মোঃ রহিম উদ্দিন", required: true },
  { label: "মোবাইল নম্বর", placeholder: "01XXXXXXXXX", required: true },
  { label: "ঠিকানা", placeholder: "দোকানের ঠিকানা" },
  { label: "এলাকা", placeholder: "যেমন: মিরপুর ১০" },
];

const types = ["মুদি দোকান", "ফার্মেসি", "সুপার শপ", "হোলসেল"];

function AddShop() {
  const navigate = useNavigate();
  const [type, setType] = useState(types[0]);

  return (
    <MobileFrame>
      <AppBar title="নতুন দোকান" back="/shops" />
      <form
        className="flex flex-1 flex-col gap-4 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/shops" });
        }}
      >
        {fields.map((f) => (
          <label key={f.label} className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">
              {f.label} {f.required ? <span className="text-destructive">*</span> : null}
            </span>
            <input
              required={f.required}
              placeholder={f.placeholder}
              className="min-h-12 rounded-xl border border-input bg-card px-3.5 text-sm outline-none focus:border-primary"
            />
          </label>
        ))}

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">দোকানের ধরন</span>
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`min-h-11 rounded-xl px-3.5 text-sm font-medium ${
                  type === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">নোট (optional)</span>
          <textarea
            rows={3}
            className="rounded-xl border border-input bg-card p-3.5 text-sm outline-none focus:border-primary"
          />
        </label>

        <button
          type="submit"
          className="mt-auto min-h-14 rounded-xl bg-primary text-base font-semibold text-primary-foreground"
        >
          দোকান যোগ করুন
        </button>
      </form>
    </MobileFrame>
  );
}
