import { BookOpen, HeartPulse, LayoutDashboard, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";


const iconMap = {
  "/": BookOpen,
  "/equipos": LayoutDashboard,
  "/jugadores": Users,
  "/lesiones": HeartPulse,
  "/lineups": ShieldCheck,
  "/ats": TrendingUp,
};


export const SidebarNav = ({ routes }) => {
  return (
    <aside className="hidden w-64 flex-col border-r border-zinc-800 bg-zinc-950/80 px-4 py-6 backdrop-blur-xl md:flex" data-testid="sidebar-navigation">
      <div className="mb-8 space-y-3 border-b border-zinc-800 pb-6" data-testid="sidebar-brand-block">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300" data-testid="sidebar-brand-logo">
          <TrendingUp className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-50" data-testid="sidebar-brand-title">
            Sportox NBA
          </h2>
          <p className="mt-1 text-sm text-zinc-400" data-testid="sidebar-brand-description">
            Dashboard, API key global y documentación lista para usar.
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2" data-testid="sidebar-links-group">
        {routes.map((route) => {
          const Icon = iconMap[route.href] || BookOpen;
          return (
            <NavLink
              key={route.href}
              className={({ isActive }) => cn(
                "group flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm text-zinc-400 transition duration-200 hover:border-zinc-800 hover:bg-zinc-900/80 hover:text-zinc-100",
                isActive && "border-zinc-700 bg-zinc-900 text-zinc-50 shadow-lg shadow-black/10",
              )}
              data-testid={`sidebar-link-${route.shortLabel.toLowerCase()}`}
              to={route.href}
            >
              <Icon className="h-4 w-4" />
              <span>{route.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="panel-card rounded-3xl p-4" data-testid="sidebar-footer-card">
        <p className="text-xs uppercase tracking-[0.28em] text-zinc-500" data-testid="sidebar-footer-kicker">
          Estado
        </p>
        <p className="mt-2 text-sm text-zinc-200" data-testid="sidebar-footer-text">
          Datos guardados en MongoDB y servidos desde la API pública.
        </p>
      </div>
    </aside>
  );
};