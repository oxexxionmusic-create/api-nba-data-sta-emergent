import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export const FilterBar = ({ category, config, filters, loading, onApply, onChange, onClear }) => {
  return (
    <section className="panel-card rounded-[28px] p-4" data-testid={`${category}-filter-bar`}>
      <div className="flex flex-wrap gap-3">
        {config.filters.search ? (
          <Input
            className="max-w-xs border-zinc-800 bg-zinc-950 text-zinc-50"
            data-testid={`${category}-search-input`}
            onChange={(event) => onChange("search", event.target.value)}
            placeholder="Buscar"
            value={filters.search}
          />
        ) : null}

        {config.filters.team ? (
          <Input
            className="max-w-xs border-zinc-800 bg-zinc-950 text-zinc-50"
            data-testid={`${category}-team-input`}
            onChange={(event) => onChange("team", event.target.value)}
            placeholder="Equipo"
            value={filters.team}
          />
        ) : null}

        {config.filters.player ? (
          <Input
            className="max-w-xs border-zinc-800 bg-zinc-950 text-zinc-50"
            data-testid={`${category}-player-input`}
            onChange={(event) => onChange("player", event.target.value)}
            placeholder="Jugador"
            value={filters.player}
          />
        ) : null}

        {config.filters.metric ? (
          <Select onValueChange={(value) => onChange("metric", value === "all" ? "" : value)} value={filters.metric || "all"}>
            <SelectTrigger className="w-[240px] border-zinc-800 bg-zinc-950 text-zinc-50" data-testid={`${category}-metric-select`}>
              <SelectValue placeholder="Todas las métricas" />
            </SelectTrigger>
            <SelectContent className="border-zinc-800 bg-zinc-950 text-zinc-50">
              <SelectItem value="all">Todas las métricas</SelectItem>
              {(config.metricOptions || []).map((option) => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}

        {config.filters.status ? (
          <Select onValueChange={(value) => onChange("status", value === "all" ? "" : value)} value={filters.status || "all"}>
            <SelectTrigger className="w-[220px] border-zinc-800 bg-zinc-950 text-zinc-50" data-testid={`${category}-status-select`}>
              <SelectValue placeholder="Todos los estados" />
            </SelectTrigger>
            <SelectContent className="border-zinc-800 bg-zinc-950 text-zinc-50">
              <SelectItem value="all">Todos los estados</SelectItem>
              {(config.statusOptions || []).map((option) => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}

        <Input
          className="w-[120px] border-zinc-800 bg-zinc-950 text-zinc-50"
          data-testid={`${category}-limit-input`}
          onChange={(event) => onChange("limit", event.target.value)}
          placeholder="Límite"
          type="number"
          value={filters.limit}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          className="rounded-full bg-blue-500 text-white hover:bg-blue-400"
          data-testid={`${category}-apply-filters-button`}
          disabled={loading}
          onClick={onApply}
          type="button"
        >
          {loading ? "Cargando..." : "Aplicar filtros"}
        </Button>
        <Button
          className="rounded-full border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
          data-testid={`${category}-clear-filters-button`}
          onClick={onClear}
          type="button"
          variant="outline"
        >
          Limpiar
        </Button>
      </div>
    </section>
  );
};