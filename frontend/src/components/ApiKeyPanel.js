import { useMemo, useState } from "react";
import { Copy } from "lucide-react";


export const ApiKeyPanel = ({ apiKey, lastRefreshAt }) => {
  const [copied, setCopied] = useState(false);

  const refreshText = useMemo(() => {
    if (!lastRefreshAt) {
      return "Sin carga inicial todavía";
    }
    return new Date(lastRefreshAt).toLocaleString();
  }, [lastRefreshAt]);

  const handleCopy = async () => {
    if (!apiKey) return;
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="panel-card page-enter rounded-[28px] p-6" data-testid="api-key-panel">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.28em] text-zinc-500" data-testid="api-key-panel-kicker">
            API Key global pública
          </p>
          <h2 className="text-2xl font-semibold text-zinc-50" data-testid="api-key-panel-title">
            Copia la clave y úsala en todas las consultas
          </h2>
          <p className="max-w-2xl text-sm text-zinc-400" data-testid="api-key-panel-description">
            Esta clave se muestra al entrar al sitio, se reutiliza en todos los ejemplos y se envía en el header <code>x-api-key</code>.
          </p>
        </div>

        <button
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-4 text-sm font-medium text-zinc-50 transition duration-200 hover:bg-zinc-800"
          data-testid="copy-global-api-key-button"
          onClick={handleCopy}
          type="button"
        >
          <Copy className="h-4 w-4" />
          {copied ? "Copiada" : "Copiar clave"}
        </button>
      </div>

      <div className="code-surface mt-5 overflow-x-auto rounded-3xl p-4" data-testid="global-api-key-value-block">
        <code className="block whitespace-pre-wrap break-all text-sm text-blue-200" data-testid="global-api-key-value">
          {apiKey || "Cargando clave..."}
        </code>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-zinc-400" data-testid="api-key-panel-meta">
        <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5" data-testid="api-key-public-badge">
          Clave visible para todos los usuarios
        </span>
        <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5" data-testid="api-key-last-refresh-badge">
          Última actualización: {refreshText}
        </span>
      </div>
    </section>
  );
};