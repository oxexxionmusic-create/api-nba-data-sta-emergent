import { useCallback, useEffect, useMemo, useState } from "react";

import { DataTableCard } from "@/components/DataTableCard";
import { FilterBar } from "@/components/FilterBar";
import { fetchDataset } from "@/lib/api";


const createDefaultFilters = () => ({
  search: "",
  team: "",
  player: "",
  metric: "",
  status: "",
  limit: 250,
});


export const DatasetPage = ({ apiKey, config, loadingPublicInfo }) => {
  const [filters, setFilters] = useState(createDefaultFilters());
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadDataset = useCallback(async (nextFilters) => {
    if (!apiKey) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetchDataset({
        apiKey,
        category: config.category,
        filters: {
          ...nextFilters,
          limit: Number(nextFilters.limit) || 250,
        },
      });
      setDataset(response.datasets?.[0] || null);
    } catch (requestError) {
      setError("No pude cargar esta tabla ahora mismo.");
    } finally {
      setLoading(false);
    }
  }, [apiKey, config.category]);

  useEffect(() => {
    const initialFilters = createDefaultFilters();
    setFilters(initialFilters);
    if (apiKey) {
      loadDataset(initialFilters);
    }
  }, [apiKey, config.category, loadDataset]);

  const summary = useMemo(() => {
    return [
      { label: "Filtrados", value: dataset?.filtered_count ?? 0, testId: `${config.category}-summary-filtered` },
      { label: "Totales", value: dataset?.item_count ?? 0, testId: `${config.category}-summary-total` },
      { label: "Actualizado", value: dataset?.updated_at ? new Date(dataset.updated_at).toLocaleString() : "—", testId: `${config.category}-summary-updated` },
    ];
  }, [config.category, dataset]);

  const handleChange = (field, value) => {
    setFilters((current) => ({ ...current, [field]: value }));
  };

  const handleClear = () => {
    const cleared = createDefaultFilters();
    setFilters(cleared);
    loadDataset(cleared);
  };

  if (loadingPublicInfo && !dataset) {
    return (
      <div className="panel-card rounded-[28px] p-6 text-sm text-zinc-300" data-testid={`${config.category}-loading-state`}>
        Cargando acceso público y preparando la tabla...
      </div>
    );
  }

  return (
    <div className="space-y-6 page-enter" data-testid={`${config.category}-page`}>
      <section className="panel-card rounded-[28px] p-6" data-testid={`${config.category}-intro-card`}>
        <h2 className="text-2xl font-semibold text-zinc-50" data-testid={`${config.category}-intro-title`}>
          {config.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-zinc-400" data-testid={`${config.category}-intro-description`}>
          {config.description}
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-3" data-testid={`${config.category}-summary-grid`}>
        {summary.map((item) => (
          <div className="panel-card rounded-[24px] p-5" data-testid={item.testId} key={item.testId}>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">{item.label}</p>
            <p className="mt-3 text-xl font-semibold text-zinc-50">{item.value}</p>
          </div>
        ))}
      </div>

      <FilterBar
        category={config.category}
        config={config}
        filters={filters}
        loading={loading}
        onApply={() => loadDataset(filters)}
        onChange={handleChange}
        onClear={handleClear}
      />

      {error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200" data-testid={`${config.category}-error-banner`}>
          {error}
        </div>
      ) : null}

      <DataTableCard dataset={dataset || { dataset_key: config.category, item_count: 0, filtered_count: 0, items: [], label: config.title, meta: {} }} />
    </div>
  );
};