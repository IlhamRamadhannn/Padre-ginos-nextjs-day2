import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder } from "@/lib/admin-data";
import { formatPrice } from "@/lib/format";
import StatusBadge from "@/components/admin/StatusBadge";
import StatusActions from "@/components/admin/StatusActions";


export default async function OrderDetailPage({
  params,
}: PageProps<"/admin/orders/[id]">) {
  const { id } = await params;
  const orderId = Number(id);

  if (!Number.isInteger(orderId)) {
    notFound();
  }

  const order = await getOrder(orderId);

  if (!order) {
    notFound();
  }

  return (
    <section className="max-w-3xl">
      <Link
        href="/admin/orders"
        className="text-sm text-brand hover:underline"
      >
        ← Semua order
      </Link>

        <div className="mt-4 flex items-center gap-3">
        <h1 className="text-3xl font-black">
            Order #{order.id}
        </h1>

        <StatusBadge status={order.status} />
        </div>

      <p className="mt-2 text-ink/70">
        {order.date} {order.time}
      </p>

      <StatusActions
        orderId={order.id}
        status={order.status}
        />
      <h2 className="mt-8 text-lg font-bold">Pesanan</h2>

      <ul className="mt-2 divide-y rounded-xl bg-white shadow-sm">
        {order.lines.map((line, index) => (
          <li
            key={`${line.pizzaId}-${line.size}-${index}`}
            className="flex items-center justify-between px-4 py-3"
          >
            <div>
              <Link
                href={`/admin/products/${line.pizzaId}`}
                className="font-semibold text-brand hover:underline"
              >
                {line.name}
              </Link>

              <p className="text-sm text-ink/60">
                Size {line.size} × {line.quantity}
              </p>
            </div>

            <span className="font-semibold">
              {formatPrice(line.price * line.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-end text-xl font-black">
        Total: {formatPrice(order.total)}
      </div>
    </section>
  );
}