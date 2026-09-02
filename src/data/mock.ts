export const taka = (n: number) => `৳ ${n.toLocaleString("en-US")}`;

export const sr = {
  name: "Karim Ahmed",
  role: "Sales Representative",
  dealer: "ABC Distribution",
  phone: "01711-223344",
  employeeId: "SR-1042",
  area: "মিরপুর ১০, মিরপুর ১১",
  monthlyTarget: 1200000,
};

export const today = {
  sales: 35500,
  orders: 18,
  collection: 12000,
  due: 8500,
  target: 50000,
  shops: 24,
  pendingShops: 6,
};

export type Shop = {
  id: string;
  name: string;
  owner: string;
  phone: string;
  area: string;
  due: number;
  creditLimit: number;
  lastOrder: string;
  lastPayment: string;
  visitedToday: boolean;
  orderedToday: boolean;
};

export const shops: Shop[] = [
  {
    id: "rahim-store",
    name: "Rahim Store",
    owner: "মোঃ রহিম উদ্দিন",
    phone: "01712-556677",
    area: "মিরপুর ১০",
    due: 4500,
    creditLimit: 10000,
    lastOrder: "২ দিন আগে",
    lastPayment: "৫ দিন আগে",
    visitedToday: true,
    orderedToday: true,
  },
  {
    id: "karim-enterprise",
    name: "Karim Enterprise",
    owner: "করিম মিয়া",
    phone: "01812-334455",
    area: "মিরপুর ১১",
    due: 2100,
    creditLimit: 8000,
    lastOrder: "আজ",
    lastPayment: "২ দিন আগে",
    visitedToday: true,
    orderedToday: true,
  },
  {
    id: "maa-traders",
    name: "Maa Traders",
    owner: "সালমা বেগম",
    phone: "01913-778899",
    area: "কাজীপাড়া",
    due: 8700,
    creditLimit: 8000,
    lastOrder: "৬ দিন আগে",
    lastPayment: "১২ দিন আগে",
    visitedToday: false,
    orderedToday: false,
  },
  {
    id: "bismillah-store",
    name: "Bismillah Store",
    owner: "আব্দুল হক",
    phone: "01611-445566",
    area: "শেওড়াপাড়া",
    due: 0,
    creditLimit: 6000,
    lastOrder: "১ দিন আগে",
    lastPayment: "১ দিন আগে",
    visitedToday: false,
    orderedToday: false,
  },
  {
    id: "new-bazar-store",
    name: "New Bazar Store",
    owner: "জাহাঙ্গীর আলম",
    phone: "01511-990011",
    area: "মিরপুর ১",
    due: 1500,
    creditLimit: 5000,
    lastOrder: "৩ দিন আগে",
    lastPayment: "৭ দিন আগে",
    visitedToday: false,
    orderedToday: false,
  },
];

export type Product = {
  id: string;
  name: string;
  sku: string;
  unit: string;
  price: number;
  stock: number;
  frequent: boolean;
};

export const products: Product[] = [
  { id: "speed-250", name: "Speed 250ml", sku: "SPD250", unit: "কেস (২৪ পিস)", price: 25, stock: 420, frequent: true },
  { id: "speed-500", name: "Speed 500ml", sku: "SPD500", unit: "কেস (১২ পিস)", price: 40, stock: 260, frequent: true },
  { id: "canacur", name: "Canacur", sku: "CNC100", unit: "বক্স", price: 120, stock: 85, frequent: true },
  { id: "mojo-250", name: "Mojo 250ml", sku: "MJO250", unit: "কেস (২৪ পিস)", price: 22, stock: 310, frequent: true },
  { id: "clemon-500", name: "Clemon 500ml", sku: "CLM500", unit: "কেস (১২ পিস)", price: 38, stock: 140, frequent: false },
  { id: "pran-chips", name: "Pran Chips", sku: "PRC050", unit: "প্যাকেট", price: 10, stock: 900, frequent: false },
  { id: "fresh-tea", name: "Fresh Tea 200g", sku: "FRT200", unit: "প্যাকেট", price: 95, stock: 120, frequent: false },
];

export type OrderStatus = "Pending" | "Confirmed" | "Delivered" | "Cancelled";

export type Order = {
  id: string;
  shop: string;
  shopId: string;
  amount: number;
  items: number;
  status: OrderStatus;
  time: string;
  lines: { name: string; qty: number; price: number }[];
};

export const orders: Order[] = [
  {
    id: "1025",
    shop: "Rahim Store",
    shopId: "rahim-store",
    amount: 3200,
    items: 3,
    status: "Confirmed",
    time: "আজ, ১১:২০",
    lines: [
      { name: "Speed 250ml", qty: 20, price: 25 },
      { name: "Speed 500ml", qty: 10, price: 40 },
      { name: "Canacur", qty: 18, price: 120 },
    ],
  },
  {
    id: "1024",
    shop: "Karim Enterprise",
    shopId: "karim-enterprise",
    amount: 1450,
    items: 3,
    status: "Pending",
    time: "আজ, ১০:০৫",
    lines: [
      { name: "Speed 250ml", qty: 20, price: 25 },
      { name: "Speed 500ml", qty: 10, price: 40 },
      { name: "Canacur", qty: 5, price: 120 },
    ],
  },
  {
    id: "1023",
    shop: "New Bazar Store",
    shopId: "new-bazar-store",
    amount: 2750,
    items: 2,
    status: "Delivered",
    time: "গতকাল, ০৪:৪০",
    lines: [
      { name: "Mojo 250ml", qty: 50, price: 22 },
      { name: "Clemon 500ml", qty: 42, price: 38 },
    ],
  },
  {
    id: "1021",
    shop: "Maa Traders",
    shopId: "maa-traders",
    amount: 4800,
    items: 4,
    status: "Cancelled",
    time: "৩০ আগস্ট",
    lines: [
      { name: "Speed 500ml", qty: 60, price: 40 },
      { name: "Fresh Tea 200g", qty: 24, price: 95 },
    ],
  },
];

export const collections = [
  { id: "c1", shop: "Rahim Store", amount: 3000, method: "Cash", time: "আজ, ১১:২৫" },
  { id: "c2", shop: "Karim Enterprise", amount: 5000, method: "bKash", time: "আজ, ১০:১০" },
  { id: "c3", shop: "New Bazar Store", amount: 4000, method: "Cash", time: "আজ, ০৯:৩০" },
];

export const ledger = [
  { date: "Sep 2", label: "Order", amount: 3200, balance: 4500 },
  { date: "Sep 1", label: "Payment", amount: -3000, balance: 1300 },
  { date: "Aug 31", label: "Order", amount: 1500, balance: 4300 },
  { date: "Aug 30", label: "Payment", amount: -3000, balance: 2800 },
  { date: "Aug 30", label: "Order", amount: 4000, balance: 5800 },
];

export const settlementHistory = [
  { date: "Sep 1", sales: 42000, collection: 20000, matched: true },
  { date: "Aug 31", sales: 38500, collection: 18500, matched: true },
  { date: "Aug 30", sales: 31000, collection: 14000, matched: false },
];

export const performance = [
  { day: "সোম", sales: 28000 },
  { day: "মঙ্গল", sales: 42000 },
  { day: "বুধ", sales: 35500 },
  { day: "বৃহঃ", sales: 39000 },
  { day: "শুক্র", sales: 21000 },
  { day: "শনি", sales: 46000 },
  { day: "রবি", sales: 33000 },
];

export const notifications = [
  { id: "n1", text: "Rahim Store-এর অর্ডার confirmed হয়েছে", time: "১০ মিনিট আগে", type: "success" as const },
  { id: "n2", text: "Maa Traders-এর বাকি ৭ দিনের বেশি পুরনো", time: "১ ঘণ্টা আগে", type: "warning" as const },
  { id: "n3", text: "আজকের সেটেলমেন্ট এখনো জমা হয়নি", time: "২ ঘণ্টা আগে", type: "info" as const },
];

export const recentActivity = [
  { text: "Rahim Store — নতুন অর্ডার ৳3,200", time: "১১:২০" },
  { text: "Karim Enterprise — কালেকশন ৳5,000", time: "১০:১০" },
  { text: "New Bazar Store — অর্ডার delivered", time: "০৯:৩০" },
];
