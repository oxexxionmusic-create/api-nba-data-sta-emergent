import { useCallback, useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, NavLink, Route, Routes, useLocation } from "react-router-dom";

import { AdminDialog } from "@/components/AdminDialog";
import { SidebarNav } from "@/components/SidebarNav";
import { DocsPage } from "@/pages/DocsPage";
import { DatasetPage } from "@/pages/DatasetPage";
import { APP_ROUTES, DATASET_PAGE_CONFIG } from "@/lib/constants";
import { fetchPublicInfo } from "@/lib/api";


const Shell = ({ publicInfo, loading, error, reloadPublicInfo }) => {
  const location = useLocation();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const routeMeta = APP_ROUTES.find((route) => route.href === location.pathname) || APP_ROUTES[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="app-noise" />
      <div className="app-grid" />
      <div className="relative z-10 flex min-h-screen">
        <SidebarNav routes={APP_ROUTES} />

        <main className="flex min-w-0 flex-1 flex-col" data-testid="main-app-shell">
          <header className="sticky top-0 z-20 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2" data-testid="page-header-block">
                  <p className="text-xs uppercase tracking-[0.28em] text-zinc-500" data-testid="page-header-kicker">
                    Sportox NBA Hub
                  </p>
                  <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl" data-testid="page-header-title">
                    {routeMeta.label}
                  </h1>
                  <p className="max-w-3xl text-sm text-zinc-400 sm:text-base" data-testid="page-header-description">
                    {routeMeta.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3" data-testid="page-header-actions">
                  <div className="rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-xs text-zinc-300" data-testid="page-last-refresh-pill">
                    Última carga: {publicInfo?.last_refresh_at ? new Date(publicInfo.last_refresh_at).toLocaleString() : "pendiente"}
                  </div>
                  <button
                    className="inline-flex h-10 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500 px-4 text-sm font-medium text-white transition duration-200 hover:bg-blue-400"
                    data-testid="open-admin-refresh-dialog-button"
                    onClick={() => setIsAdminOpen(true)}
                    type="button"
                  >
                    Actualizar datos
                  </button>
                </div>
              </div>

              {error ? (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200" data-testid="public-info-error-banner">
                  {error}
                </div>
              ) : null}

              <div className="flex gap-2 overflow-x-auto pb-1 md:hidden" data-testid="mobile-route-links">
                {APP_ROUTES.map((route) => (
                  <NavLink
                    key={route.href}
                    className={({ isActive }) => `whitespace-nowrap rounded-full border px-4 py-2 text-sm transition duration-200 ${isActive ? "border-zinc-700 bg-zinc-900 text-zinc-50" : "border-zinc-800 bg-zinc-950 text-zinc-400"}`}
                    data-testid={`mobile-route-link-${route.shortLabel.toLowerCase()}`}
                    to={route.href}
                  >
                    {route.shortLabel}
                  </NavLink>
                ))}
              </div>
            </div>
          </header>

          <div className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <Routes>
              <Route
                path="/"
                element={<DocsPage loading={loading} onOpenAdmin={() => setIsAdminOpen(true)} publicInfo={publicInfo} />}
              />
              {Object.entries(DATASET_PAGE_CONFIG).map(([key, config]) => (
                <Route
                  key={key}
                  path={config.href}
                  element={<DatasetPage apiKey={publicInfo?.api_key} config={config} loadingPublicInfo={loading} />}
                />
              ))}
            </Routes>
          </div>
        </main>
      </div>

      <AdminDialog
        apiKey={publicInfo?.api_key}
        onCompleted={reloadPublicInfo}
        onOpenChange={setIsAdminOpen}
        open={isAdminOpen}
      />
    </div>
  );
};

function App() {
  const [publicInfo, setPublicInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPublicInfo = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchPublicInfo();
      setPublicInfo(data);
    } catch (requestError) {
      setError("No pude cargar la información pública de la API.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPublicInfo();
  }, [loadPublicInfo]);

  return (
    <div className="App">
      <BrowserRouter>
        <Shell error={error} loading={loading} publicInfo={publicInfo} reloadPublicInfo={loadPublicInfo} />
      </BrowserRouter>
    </div>
  );
}

export default App;
