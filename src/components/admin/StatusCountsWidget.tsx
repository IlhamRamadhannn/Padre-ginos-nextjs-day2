import { getStatusCounts } from "@/lib/admin-data";
import { STATUS_LABELS } from "@/lib/orders";

export default async function StatusCountsWidget() {
  const counts = await getStatusCounts();

  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">Status order</h2>

      <div className="mt-4 space-y-2">
        {Object.entries(counts).map(([status, count]) => (
          <div
            key={status}
            className="flex items-center justify-between"
          >
            <span>{STATUS_LABELS[status as keyof typeof STATUS_LABELS]}</span>
            <span className="font-bold">{count}</span>
          </div>
        ))}
      </div>
    </article>
  );
}