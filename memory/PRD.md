# PRD - Sportox NBA Data API Dashboard

## Fecha de actualización
- 2026-04-08 UTC

## Problema original
Construir una aplicación full-stack con API REST pública en JSON para extraer y consultar datos NBA desde TeamRankings, ESPN Deportes y NBA Lineups, usando MongoDB como caché rápido, API key global visible, actualización automática y dashboard visual con documentación estilo Swagger.

## Decisiones de arquitectura
- Backend: FastAPI con endpoints públicos `/api/datos`, `/api/funcion` y `/api/public-info`
- Base de datos: MongoDB como caché principal de datasets ya procesados
- Ingesta: scraping periódico hacia MongoDB, consulta de API solo desde datos cacheados
- Scheduler: actualización automática cada 12 horas (2 veces por día)
- Actualización manual: protegida con credenciales de administrador
- Frontend: React con layout tipo dashboard oscuro, sidebar fijo y tablas filtrables
- Compatibilidad: se eliminaron dependencias específicas de Emergent del código del proyecto para dejarlo más portable

## User personas
- Usuario consumidor de API que necesita copiar la API key y hacer consultas rápido
- Analista deportivo que quiere explorar tablas NBA con filtros
- Administrador que necesita forzar actualización manual cuando lo desee

## Requisitos core
- API REST pública con respuesta JSON
- GET /datos para consulta de datasets
- POST /funcion para query avanzada y refresh manual
- API key global visible en el sitio
- Documentación clara de uso
- Dashboard con tablas y filtros
- Datos de equipos, jugadores, lesiones, lineups y ATS
- Guardado periódico en MongoDB

## Implementado
- Backend FastAPI con validación por API key global pública
- Endpoint `GET /api/public-info` para documentación y configuración pública
- Endpoint `GET /api/datos` con filtros por category, team, player, metric, status y limit
- Endpoint `POST /api/funcion` con `action=query` y `action=refresh`
- Scrapers para métricas de equipos, jugadores, lesiones, lineups diarios y ATS
- Persistencia de datasets cacheados en MongoDB y logs de actualización
- Scheduler automático cada 12 horas
- Dashboard oscuro con navegación para Docs, Equipos, Jugadores, Lesiones, Lineups y ATS
- Página principal de documentación estilo Swagger con API key visible y botón de copiar
- Filtros visuales en tablas y diálogo de actualización manual de admin
- Corrección UX del copiado para fallback manual si el portapapeles falla
- Dependencias específicas de Emergent removidas de frontend y backend
- Credenciales guardadas en `/app/memory/test_credentials.md`

## Backlog priorizado
### P0
- Añadir paginación real por dataset grande
- Añadir resumen visual global por cards o charts para la portada
- Mejorar estados de carga de refresh largo con progreso más claro

### P1
- Historial de snapshots por fecha para comparar cambios entre actualizaciones
- Exportación CSV/JSON desde cada tabla
- Filtros avanzados combinados con presets guardados

### P2
- Alertas por cambios de lesiones o lineups
- Tendencias y comparativas históricas
- Gestión de múltiples API keys si el producto evoluciona

## Próximas tareas recomendadas
- Añadir exportación directa desde tablas
- Crear resumen ejecutivo en home con contadores y últimos cambios
- Preparar archivo breve de despliegue y variables para entorno externo si se requiere
