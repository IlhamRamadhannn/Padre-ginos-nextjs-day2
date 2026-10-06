import Form from "next/form";
import Link from "next/link";
import { getOrders } from "@/lib/admin-data";
// import { STATUS_LABELS } from "@/lib/orders";
import { formatPrice } from "@/lib/format";
import StatusBadge from "@/components/admin/StatusBadge";


function parsePage(value: unknown): number {
  const page = Number(value);

  return Number.isInteger(page) && page >= 1 ? page : 1;
}

function parseDate(value: unknown): string | null {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? value
    : null;
}

export default async function OrdersPage({
  searchParams,
}: PageProps<"/admin/orders">) {
  const params = await searchParams;

  const page = parsePage(params.page);
  const date = parseDate(params.date);

  const { orders, totalPages } = await getOrders({
    page,
    date,
  });

  return (
    <section>
      <h1 className="text-3xl font-black">Order</h1>

      <p className="mt-1 text-ink/70">
        {date ? `Order tanggal ${date}` : "Semua order"}
      </p>

      <Form action="/admin/orders" className="mt-6 flex items-end gap-3">
        <label>
          <span className="block text-sm font-semibold">Filter tanggal</span>
          <input
            type="date"
            name="date"
            defaultValue={date ?? ""}
            className="mt-1 rounded-lg border border-black/10 bg-white px-3 py-2"
          />
        </label>

        <button
          type="submit"
          className="rounded-lg bg-brand px-4 py-2 font-semibold text-white"
        >
          Filter
        </button>
      </Form>

      <table className="mt-6 w-full overflow-hidden rounded-xl bg-white text-left text-sm shadow-sm">
        <thead className="bg-stone-50 text-xs uppercase text-ink/60">
          <tr>
            <th className="px-4 py-3">Order</th>
            <th className="px-4 py-3">Waktu</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Item</th>
            <th className="px-4 py-3 text-right">Total</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-black/5">
              <td className="px-4 py-3 font-medium">
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="text-brand hover:underline"
                >
                  #{order.id}
                </Link>
              </td>

              <td className="px-4 py-3">
                {order.date} {order.time}
              </td>

              <td className="px-4 py-3">
                <StatusBadge status={order.status} />
              </td>

              <td className="px-4 py-3 text-right">
                {order.items.toLocaleString("en-US")}
              </td>

              <td className="px-4 py-3 text-right font-semibold">
                {formatPrice(order.total)}
              </td>
              <td className="px-4 py-3 text-right">
                <Link href={`/admin/orders/${order.id}`} className="font-semibold text-brand hover:underline">
                  Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex items-center justify-between">
        {page > 1 ? (
          <Link
            href={`/admin/orders?${new URLSearchParams({
              page: String(page - 1),
              ...(date ? { date } : {}),
            })}`}
            className="font-semibold text-brand hover:underline"
          >
            ← Sebelumnya
          </Link>
        ) : (
          <span />
        )}

        <span className="text-sm text-ink/60">
          Halaman {page} dari {totalPages}
        </span>

        {page < totalPages ? (
          <Link
            href={`/admin/orders?${new URLSearchParams({
              page: String(page + 1),
              ...(date ? { date } : {}),
            })}`}
            className="font-semibold text-brand hover:underline"
          >
            Berikutnya →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </section>
  );
}