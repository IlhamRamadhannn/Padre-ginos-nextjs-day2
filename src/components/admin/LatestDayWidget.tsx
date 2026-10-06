import { getLatestDay } from "@/lib/admin-data";
import { formatPrice } from "@/lib/format";

export default async function LatestDayWidget() {
  const day = await getLatestDay();

  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">Hari terakhir</h2>

      <p className="mt-2 text-sm text-ink/60">{day.date}</p>

      <p className="mt-4 text-3xl font-black">
        {formatPrice(day.revenue)}
      </p>

      <p className="mt-2 text-ink/70">
        {day.orders.toLocaleString("en-US")} order
      </p>
    </article>
  );
}