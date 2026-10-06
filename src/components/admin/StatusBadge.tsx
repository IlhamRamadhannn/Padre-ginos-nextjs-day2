import { STATUS_LABELS } from "@/lib/orders";
import type { OrderStatus } from "@/lib/orders";

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  preparing: "bg-blue-100 text-blue-800",
  ready: "bg-green-100 text-green-800",
  delivered: "bg-stone-100 text-stone-700",
  cancelled: "bg-red-100 text-red-800",
};

export default function StatusBadge({
  status,
}: {
  status: OrderStatus;
}) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_COLORS[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}