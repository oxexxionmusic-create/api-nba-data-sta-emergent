import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { triggerManualRefresh } from "@/lib/api";


export const AdminDialog = ({ apiKey, onCompleted, onOpenChange, open }) => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) {
      setMessage("");
      setSubmitting(false);
      setAdminPassword("");
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!apiKey) {
      setMessage("La API key pública todavía no está lista.");
      return;
    }

    setSubmitting(true);
    setMessage("");
    try {
      const response = await triggerManualRefresh({ apiKey, adminEmail, adminPassword });
      const totals = response.summary
        ? Object.entries(response.summary).map(([key, value]) => `${key}: ${value}`).join(" · ")
        : response.message;
      setMessage(`Actualización completada: ${totals}`);
      onCompleted?.();
      window.setTimeout(() => onOpenChange(false), 1100);
    } catch (error) {
      const detail = error?.response?.data?.detail || "No se pudo ejecutar la actualización manual.";
      setMessage(detail);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="border-zinc-800 bg-zinc-950 text-zinc-50 sm:max-w-lg" data-testid="admin-refresh-dialog">
        <DialogHeader>
          <DialogTitle data-testid="admin-refresh-dialog-title">Actualización oficial manual</DialogTitle>
          <DialogDescription className="text-zinc-400" data-testid="admin-refresh-dialog-description">
            Solo el administrador puede lanzar una recarga inmediata. El proceso diario automático sigue activo dos veces por día.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2" data-testid="admin-refresh-form">
          <div className="grid gap-2">
            <label className="text-sm text-zinc-300" data-testid="admin-email-label">Correo administrador</label>
            <Input
              className="border-zinc-800 bg-zinc-900 text-zinc-50"
              data-testid="admin-email-input"
              onChange={(event) => setAdminEmail(event.target.value)}
              placeholder="correo@admin.com"
              type="email"
              value={adminEmail}
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm text-zinc-300" data-testid="admin-password-label">Contraseña</label>
            <Input
              className="border-zinc-800 bg-zinc-900 text-zinc-50"
              data-testid="admin-password-input"
              onChange={(event) => setAdminPassword(event.target.value)}
              placeholder="••••••••"
              type="password"
              value={adminPassword}
            />
          </div>

          {message ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 px-4 py-3 text-sm text-zinc-200" data-testid="admin-refresh-feedback">
              {message}
            </div>
          ) : null}
        </div>

        <DialogFooter>
          <Button
            className="rounded-full bg-blue-500 text-white hover:bg-blue-400"
            data-testid="admin-refresh-submit-button"
            disabled={submitting}
            onClick={handleSubmit}
            type="button"
          >
            {submitting ? "Actualizando..." : "Ejecutar actualización"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};