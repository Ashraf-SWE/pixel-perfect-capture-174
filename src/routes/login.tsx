import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { MobileFrame } from "@/components/mobile-shell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "লগইন — DealerPro" },
      { name: "description", content: "মোবাইল নম্বর ও PIN দিয়ে DealerPro-তে লগইন করে দিনের অর্ডার ও কালেকশন শুরু করুন।" },
      { property: "og:title", content: "লগইন — DealerPro" },
      { property: "og:description", content: "অর্ডার ও হিসাব, এক জায়গায়।" },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("01711223344");
  const [pin, setPin] = useState("1234");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  return (
    <MobileFrame nav={false}>
      <main className="flex flex-1 flex-col justify-center gap-6 px-6 py-10">
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <ShoppingBag className="size-8" />
          </div>
          <h1 className="text-2xl font-bold">DealerPro</h1>
          <p className="label-sm">অর্ডার ও হিসাব, এক জায়গায়</p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (phone.length !== 11) {
              setError("মোবাইল নম্বর সঠিক নয়");
              return;
            }
            setError("");
            navigate({ to: "/" });
          }}
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">মোবাইল নম্বর</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="numeric"
              className={`min-h-12 rounded-xl border bg-card px-3.5 text-sm outline-none focus:border-primary ${
                error ? "border-destructive" : "border-input"
              }`}
            />
            {error ? <span className="text-xs font-medium text-destructive">{error}</span> : null}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">পাসওয়ার্ড / PIN</span>
            <div className="flex items-center rounded-xl border border-input bg-card pr-2">
              <input
                type={show ? "text" : "password"}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="min-h-12 flex-1 bg-transparent px-3.5 text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="flex size-11 items-center justify-center text-muted-foreground"
                aria-label="পাসওয়ার্ড দেখান"
              >
                {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </label>

          <span className="self-end text-xs font-medium text-primary">পাসওয়ার্ড ভুলে গেছেন?</span>

          <button type="submit" className="min-h-14 rounded-xl bg-primary text-base font-semibold text-primary-foreground">
            লগইন করুন
          </button>
        </form>

        <Link to="/" className="text-center text-xs font-medium text-muted-foreground">
          ডেমো হিসেবে অ্যাপ দেখুন
        </Link>
      </main>
    </MobileFrame>
  );
}
