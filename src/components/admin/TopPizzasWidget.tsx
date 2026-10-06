import { getTopPizzas } from "@/lib/admin-data";
import { formatPrice } from "@/lib/format";

export default async function TopPizzasWidget() {
  const pizzas = await getTopPizzas();

  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">Terlaris sepanjang masa</h2>

      <div className="mt-4 space-y-3">
        {pizzas.map((pizza, index) => (
          <div
            key={pizza.id}
            className="flex items-center justify-between"
          >
            <div>
              <p className="font-semibold">
                {index + 1}. {pizza.name}
              </p>
              <p className="text-sm text-ink/60">
                {pizza.sold.toLocaleString("en-US")} terjual
              </p>
            </div>

            <span className="font-semibold">
              {formatPrice(pizza.revenue)}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}