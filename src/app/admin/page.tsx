import { Suspense } from "react";
import LatestDayWidget from "@/components/admin/LatestDayWidget";
import StatusCountsWidget from "@/components/admin/StatusCountsWidget";
import TopPizzasWidget from "@/components/admin/TopPizzasWidget";
import OverviewErrorBoundary from "./OverviewErrorBoundary";
import Link from "next/link";

export default function AdminHome() {
  return (
    <section>
      <h1 className="text-3xl font-black">Overview</h1>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="min-w-0">
          <Suspense fallback={<p>Memuat hari terakhir...</p>}>
            <LatestDayWidget />
          </Suspense>
        </div>

        <div className="min-w-0">
          <OverviewErrorBoundary>
            <Suspense fallback={<p>Memuat status order...</p>}>
              <StatusCountsWidget />
            </Suspense>
          </OverviewErrorBoundary>
        </div>

        <div className="min-w-0">
          <Suspense fallback={<p>Memuat pizza terlaris...</p>}>
            <TopPizzasWidget />
          </Suspense>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <Link
          href="/admin/products"
          className="rounded-xl bg-white px-5 py-4 font-semibold shadow-sm"
        >
          Kelola produk →
        </Link>

        <Link
          href="/admin/orders"
          className="rounded-xl bg-white px-5 py-4 font-semibold shadow-sm"
        >
          Lihat order →
        </Link>
      </div>
    </section>
  );
}