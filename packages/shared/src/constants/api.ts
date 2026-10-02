/** Prefix under which the API mounts all of its routes. */
export const API_BASE_PATH = "/api" as const;

/** API route paths, relative to {@link API_BASE_PATH}. */
export const API_ROUTES = {
  /** Liveness: the process is up. Never touches the database. */
  health: "/health",
  /** Readiness: the database connection works. */
  healthDb: "/health/db",
} as const;
