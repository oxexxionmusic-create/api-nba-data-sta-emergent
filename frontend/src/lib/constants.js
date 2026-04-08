export const APP_ROUTES = [
  {
    href: "/",
    label: "Documentación API",
    shortLabel: "Docs",
    description: "Tu API key global, ejemplos de uso y acceso rápido a cada extracción.",
  },
  {
    href: "/equipos",
    label: "Equipos",
    shortLabel: "Equipos",
    description: "Métricas ofensivas y defensivas de equipos con filtros rápidos.",
  },
  {
    href: "/jugadores",
    label: "Jugadores",
    shortLabel: "Jugadores",
    description: "Puntos, asistencias, rebotes, robos, bloqueos y faltas personales.",
  },
  {
    href: "/lesiones",
    label: "Lesiones",
    shortLabel: "Lesiones",
    description: "Estado actual de lesionados por equipo desde ESPN Deportes.",
  },
  {
    href: "/lineups",
    label: "Lineups diarios",
    shortLabel: "Lineups",
    description: "Jugadores activos e inactivos del archivo diario de lineups NBA.",
  },
  {
    href: "/ats",
    label: "Rendimiento ATS",
    shortLabel: "ATS",
    description: "Resultados ATS por equipo para consulta y filtrado rápido.",
  },
];


export const TEAM_METRIC_OPTIONS = [
  { value: "points_per_game", label: "Points per Game" },
  { value: "first_quarter_points_per_game", label: "1Q Points per Game" },
  { value: "second_quarter_points_per_game", label: "2Q Points per Game" },
  { value: "first_half_points_per_game", label: "1st Half Points per Game" },
  { value: "average_scoring_margin", label: "Average Scoring Margin" },
  { value: "average_first_quarter_margin", label: "Average 1Q Margin" },
  { value: "average_second_quarter_margin", label: "Average 2Q Margin" },
  { value: "average_first_half_margin", label: "Average 1st Half Margin" },
  { value: "points_from_two_pointers", label: "Points from 2 Pointers" },
  { value: "points_from_three_pointers", label: "Points from 3 Pointers" },
  { value: "offensive_efficiency", label: "Offensive Efficiency" },
  { value: "fastbreak_efficiency", label: "Fastbreak Efficiency" },
  { value: "average_biggest_lead", label: "Average Biggest Lead" },
  { value: "opponent_points_per_game", label: "Opponent Points per Game" },
  { value: "opponent_first_quarter_points_per_game", label: "Opponent 1Q Points" },
  { value: "opponent_second_quarter_points_per_game", label: "Opponent 2Q Points" },
  { value: "opponent_first_half_points_per_game", label: "Opponent 1st Half Points" },
  { value: "defensive_efficiency", label: "Defensive Efficiency" },
  { value: "opponent_fastbreak_efficiency", label: "Opponent Fastbreak Efficiency" },
  { value: "opponent_average_biggest_lead", label: "Opponent Avg Biggest Lead" },
];


export const PLAYER_METRIC_OPTIONS = [
  { value: "points", label: "Points" },
  { value: "assists", label: "Assists" },
  { value: "offensive_rebounds", label: "Offensive Rebounds" },
  { value: "defensive_rebounds", label: "Defensive Rebounds" },
  { value: "steals", label: "Steals" },
  { value: "blocks", label: "Blocks" },
  { value: "personal_fouls", label: "Personal Fouls" },
];


export const STATUS_OPTIONS = {
  injuries: [
    { value: "Al día", label: "Al día" },
    { value: "Fuera", label: "Fuera" },
  ],
  lineups: [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "Confirmed", label: "Confirmed" },
    { value: "Expected", label: "Expected" },
  ],
};


export const DATASET_PAGE_CONFIG = {
  teams: {
    href: "/equipos",
    category: "teams",
    title: "Datos de equipos",
    description: "Consulta métricas de equipos desde TeamRankings, ya guardadas en MongoDB para respuesta rápida.",
    metricOptions: TEAM_METRIC_OPTIONS,
    filters: { search: true, team: true, metric: true },
  },
  players: {
    href: "/jugadores",
    category: "players",
    title: "Datos de jugadores",
    description: "Explora rankings por puntos, asistencias, rebotes, robos, bloqueos y faltas personales.",
    metricOptions: PLAYER_METRIC_OPTIONS,
    filters: { search: true, team: true, player: true, metric: true },
  },
  injuries: {
    href: "/lesiones",
    category: "injuries",
    title: "Lesiones NBA",
    description: "Lista de lesionados por equipo con estado y fecha estimada de regreso.",
    statusOptions: STATUS_OPTIONS.injuries,
    filters: { search: true, team: true, player: true, status: true },
  },
  lineups: {
    href: "/lineups",
    category: "lineups",
    title: "Lineups y ausencias del día",
    description: "Activos, inactivos y titulares detectados desde el feed diario de NBA.",
    statusOptions: STATUS_OPTIONS.lineups,
    filters: { search: true, team: true, player: true, status: true },
  },
  ats: {
    href: "/ats",
    category: "ats",
    title: "Resultados ATS",
    description: "Rendimiento ATS por equipo con rival, línea, resultado y diferencia.",
    filters: { search: true, team: true },
  },
};