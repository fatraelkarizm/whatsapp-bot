"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  CircleCheck,
  Leaf,
  Rocket,
  ShoppingCart,
  Star,
} from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  downloadUrl: string;
}

interface BotStatus {
  isLive: boolean;
  lastSeen: string | null;
}

const StatusIndicator = ({ isLive }: { isLive: boolean | null }) => {
  if (isLive === null) return null;
  return (
    <div
      className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        isLive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isLive ? "bg-emerald-500 animate-pulse" : "bg-red-500"
        }`}
      ></span>
      {isLive ? "LIVE" : "OFFLINE"}
    </div>
  );
};

export default function LandingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [botStatus, setBotStatus] = useState<BotStatus>({
    isLive: false,
    lastSeen: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, statusRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/bot-status"),
        ]);
        const prodData = await prodRes.json();
        const statusData = await statusRes.json();
        setProducts(prodData);
        setBotStatus(statusData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 border-b border-black/5 bg-(--background)/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-strong text-white">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Digicy<span className="text-primary">Store</span>
            </span>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium text-black/60 md:flex">
            <Link href="#home" className="transition-colors hover:text-black">
              Home
            </Link>
            <Link href="#about" className="transition-colors hover:text-black">
              About
            </Link>
            <Link
              href="#products"
              className="transition-colors hover:text-black"
            >
              Services
            </Link>
            <Link
              href="#contact"
              className="transition-colors hover:text-black"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="rounded-full bg-accent-strong px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </nav>

      <main id="home" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_18%,rgba(13,78,69,0.16),transparent_34%),radial-gradient(circle_at_84%_14%,rgba(132,204,22,0.18),transparent_28%)]"></div>
        <div className="pointer-events-none absolute inset-x-0 top-14 -z-10 mx-auto h-56 max-w-4xl rounded-full bg-emerald-200/30 blur-3xl"></div>

        <section className="mx-auto flex min-h-[calc(100vh-74px)] w-full max-w-7xl flex-col justify-center px-6 pb-8 pt-8 md:pb-10 md:pt-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-2 text-xs font-semibold text-black/70 backdrop-blur">
              <StatusIndicator isLive={botStatus.isLive} />
              <span>Paket aplikasi premium paling dicari market</span>
            </div>

            <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-[3.5rem] xl:text-[3.8rem]">
              Jualan Aplikasi Premium
              <br />
              <span className="text-accent-strong">Netflix, CapCut, Canva & More</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-black/60 sm:text-lg">
              Mulai dari akun Netflix, CapCut Pro, Canva Pro, sampai tools
              premium lainnya. Cocok buat dipakai sendiri atau dijual ulang
              dengan margin aman dan supply yang stabil.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-full bg-accent-strong px-7 py-3 font-semibold text-white transition hover:brightness-110"
              >
                Beli Sekarang
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <a
                href="https://wa.me/yournumber"
                className="rounded-full border border-black/10 bg-white px-7 py-3 font-semibold text-black/85 transition hover:border-accent-strong"
              >
                Gabung Reseller
              </a>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 text-sm text-black/60">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <span className="font-semibold text-black/80">5.0</span>
              <span className="text-black/50">from 120+ reviews</span>
            </div>
          </div>

          <div className="relative mt-7 md:mt-8">
            <div className="pointer-events-none absolute -left-7 top-1/2 hidden -translate-y-1/2 lg:flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black/70 shadow-sm">
              <ArrowUpRight className="h-4 w-4" />
            </div>
            <div className="pointer-events-none absolute -right-7 top-1/2 hidden -translate-y-1/2 lg:flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black/70 shadow-sm">
              <BarChart3 className="h-4 w-4" />
            </div>

            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 lg:flex-row lg:items-stretch">
              <div className="hero-card-enter hero-card-delay-1 rounded-4xl border border-white/10 bg-[linear-gradient(165deg,#0f4a53,#0c3840)] p-6 text-white shadow-[0_14px_35px_rgba(8,35,40,0.32)] transition lg:h-56 lg:w-[18%] lg:hover:-translate-y-1">
                <div className="flex h-full flex-col">
                  <h3 className="text-[3rem] font-semibold leading-none">100+</h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-white/85">
                  Klien aktif dan creator yang langganan produk Digicy.
                  </p>
                </div>
              </div>

              <div className="hero-card-enter hero-card-delay-2 relative rounded-4xl border border-black/5 bg-white p-6 shadow-[0_16px_40px_rgba(20,33,52,0.08)] transition lg:h-56 lg:w-[33%] lg:hover:-translate-y-1">
                <div className="flex h-full flex-col">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#eaf8ef] px-2.5 py-1 text-xs text-[#20693f]">
                    <CircleCheck className="h-3.5 w-3.5" />
                    Project Completed
                  </div>
                  <h3 className="text-[3rem] font-semibold leading-none text-black/90">
                    1951+
                  </h3>
                  <p className="mt-3 text-[1.05rem] text-black/55">
                    Naik 126 transaksi digital sukses bulan ini.
                  </p>
                </div>
                <div className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full bg-emerald-400"></div>
              </div>

              <div className="hero-card-enter hero-card-delay-3 rounded-4xl border border-[#cbe7a7] bg-linear-to-b from-[#dff6be] to-[#c7eaa2] p-6 text-[#1f3b2e] shadow-[0_12px_30px_rgba(126,172,90,0.18)] transition lg:h-56 lg:w-[18%] lg:hover:-translate-y-1">
                <div className="flex h-full flex-col">
                  <h3 className="text-[3rem] font-semibold leading-none">6+</h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-[#2f5a46]">
                  Tahun pengalaman deliver produk premium.
                  </p>
                </div>
              </div>

              <div className="hero-card-enter hero-card-delay-4 rounded-4xl border border-white/10 bg-[radial-gradient(circle_at_88%_5%,rgba(110,255,211,0.2),transparent_38%),linear-gradient(165deg,#12373d,#0a252a)] p-7 text-white shadow-[0_16px_42px_rgba(7,29,32,0.35)] transition lg:h-56 lg:w-[31%] lg:hover:-translate-y-1">
                <div className="flex h-full flex-col">
                  <Rocket className="h-6 w-6 text-emerald-300" />
                  <p className="mt-auto text-[1.85rem] font-semibold leading-[1.06] text-white/95">
                    Mulai reseller
                    <br />
                    lebih produktif
                  </p>
                  <p className="mt-3 text-[1rem] text-white/78">
                    Optimalkan alur jualan digital pakai automasi yang stabil.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="mx-auto w-full max-w-7xl px-6 pb-16 pt-8"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-black/5 bg-white p-8">
              <p className="text-4xl font-semibold text-black/90">6jt+</p>
              <p className="mt-3 text-black/60">
                Pengguna aktif yang pernah pakai produk Digicy Store.
              </p>
            </div>
            <div className="rounded-3xl border border-black/5 bg-white p-8">
              <p className="text-4xl font-semibold text-black/90">31%</p>
              <p className="mt-3 text-black/60">
                Rata-rata peningkatan efisiensi operasional bisnis.
              </p>
            </div>
            <div className="rounded-3xl border border-black/5 bg-white p-8">
              <p className="text-4xl font-semibold text-black/90">29jt+</p>
              <p className="mt-3 text-black/60">
                Transaksi diproses lewat bot dan automasi kami.
              </p>
            </div>
          </div>
        </section>

        <section
          id="products"
          className="mx-auto w-full max-w-7xl px-6 pb-24 pt-6"
        >
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Product Showcase
              </h2>
              <p className="mt-2 max-w-xl text-black/60">
                Katalog aplikasi premium, script bot WhatsApp, dan source code
                siap deploy buat kebutuhan usaha digital.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-90 animate-pulse rounded-3xl border border-black/5 bg-white"
                ></div>
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <article
                  key={product.id}
                  className="group rounded-3xl border border-black/5 bg-white p-5 transition hover:-translate-y-1 hover:border-accent-soft hover:shadow-lg"
                >
                  <div className="relative mb-5 aspect-4/3 overflow-hidden rounded-2xl bg-[#edf3f1]">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Rocket className="h-12 w-12 text-black/25" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-black/90">
                    {product.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-black/60">
                    {product.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4">
                    <span className="text-xl font-semibold text-black/90">
                      Rp {product.price.toLocaleString()}
                    </span>
                    <Link
                      href={product.downloadUrl || "#"}
                      className="inline-flex items-center gap-2 rounded-full bg-accent-strong px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                    >
                      Buy
                      <ShoppingCart className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full rounded-3xl border border-dashed border-black/15 bg-white px-6 py-16 text-center">
                <ShoppingCart className="mx-auto h-12 w-12 text-black/25" />
                <h3 className="mt-4 text-lg font-semibold text-black/70">
                  Belum ada produk
                </h3>
              </div>
            )}
          </div>
        </section>

        <footer
          id="contact"
          className="border-t border-black/5 bg-white/90 py-10"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-black/60 md:flex-row">
            <p>© 2026 Digicy Store. Built for modern digital commerce.</p>
            <div className="flex items-center gap-5">
              <Link href="#home" className="transition hover:text-black">
                Home
              </Link>
              <Link href="#products" className="transition hover:text-black">
                Products
              </Link>
              <Link href="/admin" className="transition hover:text-black">
                Admin
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
