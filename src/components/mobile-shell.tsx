import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Store, ClipboardList, Wallet, User, ChevronLeft, Wifi } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "হোম", icon: Home },
  { to: "/shops", label: "দোকান", icon: Store },
  { to: "/orders", label: "অর্ডার", icon: ClipboardList },
  { to: "/accounts", label: "হিসাব", icon: Wallet },
  { to: "/profile", label: "প্রোফাইল", icon: User },
];

export function AppBar({
  title,
  subtitle,
  back,
  right,
}: {
  title: string;
  subtitle?: string;
  back?: string;
  right?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-card px-4 py-3">
      {back ? (
        <Link
          to={back}
          className="-ml-2 flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
          aria-label="পিছনে"
        >
          <ChevronLeft className="size-5" />
        </Link>
      ) : null}
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-base font-semibold">{title}</h1>
        {subtitle ? <p className="label-sm truncate">{subtitle}</p> : null}
      </div>
      {right}
    </header>
  );
}

export function SyncBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-medium text-success">
      <Wifi className="size-3.5" />
      Sync হয়েছে
    </span>
  );
}

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="sticky bottom-0 z-20 grid grid-cols-5 border-t border-border bg-card pb-1 pt-1.5 shadow-[var(--shadow-sheet)]">
      {nav.map((item) => {
        const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`flex min-h-11 flex-col items-center justify-center gap-1 rounded-lg py-1 text-[11px] font-medium transition-colors ${
              active ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon className={`size-5 ${active ? "" : "opacity-80"}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileFrame({ children, nav = true }: { children: ReactNode; nav?: boolean }) {
  return (
    <div className="flex min-h-screen justify-center">
      <div className="flex w-full max-w-[420px] flex-col bg-background shadow-card">
        <div className="flex flex-1 flex-col">{children}</div>
        {nav ? <BottomNav /> : null}
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Pending: "bg-warning-soft text-warning-foreground",
    Confirmed: "bg-primary-soft text-accent-foreground",
    Delivered: "bg-success-soft text-success",
    Cancelled: "bg-destructive-soft text-destructive",
  };
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${map[status] ?? "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
}
