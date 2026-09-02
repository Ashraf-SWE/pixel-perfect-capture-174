import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { AppBar, MobileFrame } from "@/components/mobile-shell";
import { notifications } from "@/data/mock";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "নোটিফিকেশন — DealerPro" },
      { name: "description", content: "অর্ডার কনফার্মেশন, বাকির সতর্কতা ও সেটেলমেন্ট রিমাইন্ডার নোটিফিকেশন।" },
      { property: "og:title", content: "নোটিফিকেশন — DealerPro" },
      { property: "og:description", content: "আপনার সব আপডেট এক জায়গায়।" },
    ],
  }),
  component: Notifications,
});

const icons = { success: CheckCircle2, warning: AlertTriangle, info: Info };
const tones = {
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning-foreground",
  info: "bg-primary-soft text-accent-foreground",
};

function Notifications() {
  return (
    <MobileFrame>
      <AppBar title="নোটিফিকেশন" back="/" />
      <main className="flex flex-1 flex-col gap-3 p-4">
        {notifications.map((n) => {
          const Icon = icons[n.type];
          return (
            <article key={n.id} className="card-surface flex items-start gap-3 p-4">
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${tones[n.type]}`}>
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-medium">{n.text}</p>
                <p className="label-sm mt-0.5">{n.time}</p>
              </div>
            </article>
          );
        })}
      </main>
    </MobileFrame>
  );
}
