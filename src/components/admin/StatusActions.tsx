"use client";

import { useActionState } from "react";
import { updateOrderStatusAction } from "@/app/admin/actions";
import {
  nextStatuses,
  STATUS_LABELS,
} from "@/lib/orders";
import type { OrderStatus } from "@/lib/orders";
import StatusBadge from "./StatusBadge";

export default function StatusActions({
  orderId,
  status,
}: {
  orderId: number;
  status: OrderStatus;
}) {
  const [state, formAction, isPending] = useActionState(
    updateOrderStatusAction,
    null,
  );

  const next = nextStatuses(status);

  return (
    <div className="mt-6">
      {next.length === 0 ? (
        <p className="text-sm text-ink/60">
          Status tidak dapat diubah.
        </p>
      ) : (
        <div className="flex gap-3">
          {next.map((nextStatus) => (
            <form key={nextStatus} action={formAction}>
              <input
                type="hidden"
                name="id"
                value={orderId}
              />

              <button
                type="submit"
                name="status"
                value={nextStatus}
                disabled={isPending}
                className="rounded-lg bg-brand px-4 py-2 font-semibold text-white disabled:opacity-50"
              >
                {isPending ? (
                "Menyimpan…"
                ) : (
                <>
                    Ubah Status ke{" "}
                    <StatusBadge status={nextStatus} />
                </>
                )}
                </button>
            </form>
          ))}
        </div>
      )}

      {state?.error && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {state.error}
        </p>
      )}
    </div>
  );
}