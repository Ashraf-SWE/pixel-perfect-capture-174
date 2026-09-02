import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, MapPin, Building2, Globe, Bell, LogOut, ChevronRight } from "lucide-react";
import { AppBar, MobileFrame, SyncBadge } from "@/components/mobile-shell";
import { sr, taka } from "@/data/mock";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "প্রোফাইল ও সেটিংস — DealerPro" },
      { name: "description", content: "SR প্রোফাইল, টার্গেট, অ্যাসাইন করা এলাকা, ডিলার তথ্য ও অ্যাপ সেটিংস।" },
      { property: "og:title", content: "প্রোফাইল ও সেটিংস — DealerPro" },
      { property: "og:description", content: "আপনার তথ্য ও অ্যাপ প্রেফারেন্স।" },
    ],
  }),
  component: Profile,
});

function Profile() {
  return (
    <MobileFrame>
      <AppBar title="প্রোফাইল" right={<SyncBadge />} />

      <main className="flex flex-1 flex-col gap-4 p-4">
        <section className="card-surface flex items-center gap-4 p-4">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
            KA
          </div>
          <div>
            <p className="font-semibold">{sr.name}</p>
            <p className="label-sm">{sr.role}</p>
            <p className="label-sm">{sr.dealer}</p>
          </div>
        </section>

        <section className="card-surface grid grid-cols-2 divide-x divide-border">
          <div className="p-4">
            <p className="label-sm">মোবাইল</p>
            <p className="text-sm font-semibold">{sr.phone}</p>
          </div>
          <div className="p-4">
            <p className="label-sm">Employee ID</p>
            <p className="text-sm font-semibold">{sr.employeeId}</p>
          </div>
        </section>

        <section className="card-surface divide-y divide-border">
          <Link to="/performance" className="flex items-center gap-3 px-4 py-4">
            <Target className="size-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium">My Target</p>
              <p className="label-sm">{taka(sr.monthlyTarget)} / মাস</p>
            </div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </Link>
          <div className="flex items-center gap-3 px-4 py-4">
            <MapPin className="size-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium">Assigned Area</p>
              <p className="label-sm">{sr.area}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-4">
            <Building2 className="size-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium">Dealer Information</p>
              <p className="label-sm">{sr.dealer} • মিরপুর, ঢাকা</p>
            </div>
          </div>
        </section>

        <section className="card-surface divide-y divide-border">
          <p className="px-4 py-3 text-sm font-semibold">সেটিংস</p>
          <div className="flex items-center gap-3 px-4 py-4">
            <Globe className="size-5 text-primary" />
            <p className="flex-1 text-sm font-medium">ভাষা</p>
            <span className="label-sm">বাংলা</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-4">
            <Bell className="size-5 text-primary" />
            <p className="flex-1 text-sm font-medium">নোটিফিকেশন</p>
            <span className="h-6 w-11 rounded-full bg-success p-0.5">
              <span className="block size-5 translate-x-5 rounded-full bg-card" />
            </span>
          </div>
        </section>

        <Link
          to="/login"
          className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-destructive-soft text-sm font-semibold text-destructive"
        >
          <LogOut className="size-5" /> লগআউট
        </Link>
      </main>
    </MobileFrame>
  );
}
