"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type RegisterResponse = {
  user?: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "RESELLER" | "GUEST";
  };
  error?: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = (await response.json()) as RegisterResponse;

      if (!response.ok) {
        setError(data.error || "Register gagal");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-black/90">Register Akun</h1>
        <p className="mt-2 text-sm text-black/60">
          Daftar akun reseller untuk mulai akses produk premium.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-black/70">
              Nama
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-accent-strong"
              placeholder="Nama lengkap"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-black/70">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-accent-strong"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-black/70">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-accent-strong"
              placeholder="Minimal 6 karakter"
            />
          </div>

          {error ? <p className="text-sm text-red-500">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-accent-strong px-4 py-3 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Mendaftar..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-black/60">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold text-accent-strong hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
