import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const COLUMN_MAP = {
  teams: [
    { key: "rank", label: "#" },
    { key: "team", label: "Equipo", sticky: true },
    { key: "metric_label", label: "Métrica" },
    { key: "current_value", label: "Actual" },
    { key: "last_3", label: "Last 3" },
    { key: "last_1", label: "Last 1" },
    { key: "home", label: "Home" },
    { key: "away", label: "Away" },
    { key: "previous_value", label: "Previo" },
  ],
  players: [
    { key: "rank", label: "#" },
    { key: "player", label: "Jugador", sticky: true },
    { key: "team", label: "Equipo" },
    { key: "position", label: "Pos" },
    { key: "metric_label", label: "Métrica" },
    { key: "value", label: "Valor" },
  ],
  injuries: [
    { key: "team", label: "Equipo", sticky: true },
    { key: "player_name", label: "Jugador" },
    { key: "position", label: "Pos" },
    { key: "estimated_return", label: "Regreso estimado" },
    { key: "status", label: "Estado" },
  ],
  lineups: [
    { key: "lineup_date", label: "Fecha" },
    { key: "matchup", label: "Matchup", sticky: true },
    { key: "team_abbreviation", label: "Equipo" },
    { key: "player_name", label: "Jugador" },
    { key: "position", label: "Posición" },
    { key: "roster_status", label: "Roster" },
    { key: "lineup_status", label: "Lineup" },
    { key: "game_status_text", label: "Juego" },
  ],
  ats: [
    { key: "team", label: "Equipo", sticky: true },
    { key: "date", label: "Fecha" },
    { key: "venue", label: "H/A/N" },
    { key: "opponent", label: "Rival" },
    { key: "opponent_rank", label: "Rank rival" },
    { key: "line", label: "Línea" },
    { key: "result", label: "Resultado" },
    { key: "diff", label: "Diff" },
    { key: "covered", label: "Cubrió" },
  ],
};


const formatValue = (value) => {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Sí" : "No";
  return value;
};


export const DataTableCard = ({ dataset }) => {
  const columns = COLUMN_MAP[dataset?.dataset_key] || [];
  const items = dataset?.items || [];

  return (
    <Card className="panel-card rounded-[28px] border-zinc-800 bg-transparent" data-testid={`${dataset?.dataset_key || "dataset"}-table-card`}>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
        <div>
          <CardTitle className="text-xl text-zinc-50" data-testid={`${dataset?.dataset_key || "dataset"}-table-title`}>
            {dataset?.label || "Tabla de datos"}
          </CardTitle>
          <p className="mt-2 text-sm text-zinc-400" data-testid={`${dataset?.dataset_key || "dataset"}-table-meta`}>
            {dataset?.filtered_count || 0} filas filtradas de {dataset?.item_count || 0} disponibles.
          </p>
        </div>
        <div className="flex flex-wrap gap-2" data-testid={`${dataset?.dataset_key || "dataset"}-table-badges`}>
          <Badge className="bg-zinc-800 text-zinc-100 hover:bg-zinc-800">Mongo cache</Badge>
          {dataset?.meta?.lineup_date ? <Badge className="bg-blue-500 text-white hover:bg-blue-500">{dataset.meta.lineup_date}</Badge> : null}
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-hidden rounded-3xl border border-zinc-800" data-testid={`${dataset?.dataset_key || "dataset"}-table-wrapper`}>
          <Table className="min-w-[900px] text-sm" data-testid={`${dataset?.dataset_key || "dataset"}-table`}>
            <TableHeader className="bg-zinc-950/90">
              <TableRow className="border-zinc-800 hover:bg-zinc-950/90">
                {columns.map((column, index) => (
                  <TableHead
                    className={`h-11 whitespace-nowrap px-3 text-xs font-bold uppercase tracking-[0.12em] text-zinc-500 ${column.sticky ? "sticky left-0 z-10 bg-zinc-950/95" : ""} ${index === 0 ? "w-16" : ""}`}
                    data-testid={`${dataset?.dataset_key || "dataset"}-header-${column.key}`}
                    key={column.key}
                  >
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {items.length ? items.map((item, rowIndex) => (
                <TableRow
                  className="border-zinc-800 bg-zinc-950/80 hover:bg-zinc-900/80"
                  data-testid={`${dataset.dataset_key}-row-${rowIndex}`}
                  key={`${dataset.dataset_key}-${rowIndex}-${item.team || item.player || item.player_name || item.matchup || item.date}`}
                >
                  {columns.map((column) => (
                    <TableCell
                      className={`${column.sticky ? "sticky left-0 z-[5] bg-zinc-950/95 font-medium text-zinc-100" : "text-zinc-300"} px-3 py-2`}
                      data-testid={`${dataset.dataset_key}-cell-${rowIndex}-${column.key}`}
                      key={column.key}
                    >
                      {formatValue(item[column.key])}
                    </TableCell>
                  ))}
                </TableRow>
              )) : (
                <TableRow className="border-zinc-800 bg-zinc-950/80 hover:bg-zinc-950/80">
                  <TableCell className="px-3 py-6 text-center text-zinc-400" colSpan={columns.length || 1} data-testid={`${dataset?.dataset_key || "dataset"}-empty-state`}>
                    No hay filas para los filtros seleccionados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};