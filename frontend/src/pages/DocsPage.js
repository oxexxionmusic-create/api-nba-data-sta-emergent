import { ArrowUpRight, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

import { ApiKeyPanel } from "@/components/ApiKeyPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/lib/constants";
import { BACKEND_DOCS_URL } from "@/lib/api";


const endpointCards = [
  {
    method: "GET",
    title: "/api/datos",
    description: "Lee los datos ya guardados en MongoDB con filtros por categoría, equipo, jugador, métrica y estado.",
    example: 'curl -H "x-api-key: SPORTOX-NBA-GLOBAL-2026" "$BACKEND_URL/api/datos?category=teams&metric=points_per_game&limit=10"',
    methodClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  },
  {
    method: "POST",
    title: "/api/funcion",
    description: "Ejecuta consultas avanzadas o fuerza la actualización oficial cuando entra el administrador.",
    example: '{ "action": "query", "category": "players", "metric": "points", "limit": 10, "api_key": "SPORTOX-NBA-GLOBAL-2026" }',
    methodClass: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  },
];


export const DocsPage = ({ loading, onOpenAdmin, publicInfo }) => {
  return (
    <div className="space-y-6 page-enter" data-testid="docs-page">
      <section className="panel-card rounded-[28px] p-6" data-testid="docs-hero-card">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-500" data-testid="docs-hero-kicker">
              Swagger-style guide
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl" data-testid="docs-hero-title">
              Aprende a usar la API pública en minutos
            </h2>
            <p className="text-sm text-zinc-400 sm:text-base" data-testid="docs-hero-description">
              Toda la información viene de scraping periódico hacia MongoDB. La API solo consulta lo ya guardado para responder rápido y de forma estable.
            </p>
          </div>

          <div className="flex flex-wrap gap-3" data-testid="docs-hero-actions">
            <a href={BACKEND_DOCS_URL} rel="noreferrer" target="_blank">
              <Button className="rounded-full bg-zinc-900 text-zinc-100 hover:bg-zinc-800" data-testid="open-native-docs-button" type="button" variant="outline">
                OpenAPI nativo
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <Button className="rounded-full bg-blue-500 text-white hover:bg-blue-400" data-testid="open-admin-from-docs-button" onClick={onOpenAdmin} type="button">
              <RefreshCw className="mr-2 h-4 w-4" />
              Actualización manual
            </Button>
          </div>
        </div>
      </section>

      <ApiKeyPanel apiKey={publicInfo?.api_key} lastRefreshAt={publicInfo?.last_refresh_at} />

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]" data-testid="docs-main-grid">
        <div className="space-y-6">
          {endpointCards.map((endpoint) => (
            <article className="panel-card rounded-[28px] p-6" data-testid={`endpoint-card-${endpoint.method.toLowerCase()}`} key={endpoint.title}>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className={`${endpoint.methodClass} border`} data-testid={`endpoint-badge-${endpoint.method.toLowerCase()}`}>
                  {endpoint.method}
                </Badge>
                <h3 className="text-xl font-semibold text-zinc-50" data-testid={`endpoint-title-${endpoint.method.toLowerCase()}`}>
                  {endpoint.title}
                </h3>
              </div>
              <p className="mt-3 text-sm text-zinc-400" data-testid={`endpoint-description-${endpoint.method.toLowerCase()}`}>
                {endpoint.description}
              </p>
              <pre className="code-surface mt-4 overflow-x-auto rounded-3xl p-4 text-sm text-zinc-200" data-testid={`endpoint-example-${endpoint.method.toLowerCase()}`}>
                <code>{endpoint.example}</code>
              </pre>
            </article>
          ))}
        </div>

        <div className="space-y-6">
          <section className="panel-card rounded-[28px] p-6" data-testid="docs-how-to-use-card">
            <h3 className="text-xl font-semibold text-zinc-50" data-testid="docs-how-to-use-title">
              Cómo usarla
            </h3>
            <ol className="mt-4 space-y-3 text-sm text-zinc-300" data-testid="docs-how-to-use-steps">
              <li>1. Copia la API key global mostrada arriba.</li>
              <li>2. Envíala como <code>x-api-key</code> en tus requests.</li>
              <li>3. Usa <code>category</code> para elegir entre teams, players, injuries, lineups o ats.</li>
              <li>4. Agrega filtros como <code>team</code>, <code>player</code>, <code>metric</code> o <code>status</code>.</li>
            </ol>
          </section>

          <section className="panel-card rounded-[28px] p-6" data-testid="docs-categories-card">
            <h3 className="text-xl font-semibold text-zinc-50" data-testid="docs-categories-title">
              Secciones del sitio
            </h3>
            <div className="mt-4 grid gap-3">
              {APP_ROUTES.filter((route) => route.href !== "/").map((route) => (
                <Link
                  className="rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-4 transition duration-200 hover:border-zinc-700 hover:bg-zinc-900"
                  data-testid={`docs-route-link-${route.shortLabel.toLowerCase()}`}
                  key={route.href}
                  to={route.href}
                >
                  <div className="text-sm font-medium text-zinc-100">{route.label}</div>
                  <div className="mt-1 text-sm text-zinc-400">{route.description}</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="panel-card rounded-[28px] p-6" data-testid="docs-service-status-card">
            <h3 className="text-xl font-semibold text-zinc-50" data-testid="docs-service-status-title">
              Estado del servicio
            </h3>
            <div className="mt-4 grid gap-3 text-sm text-zinc-300">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-3" data-testid="docs-auto-refresh-info">
                Refresco automático: {publicInfo?.auto_refresh || (loading ? "cargando..." : "no disponible")}
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-3" data-testid="docs-last-refresh-info">
                Última actualización: {publicInfo?.last_refresh_at ? new Date(publicInfo.last_refresh_at).toLocaleString() : "sin fecha todavía"}
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};