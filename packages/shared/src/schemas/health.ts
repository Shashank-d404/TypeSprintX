import { z } from "zod";

/** Response of the liveness endpoint. `timestamp` is an ISO 8601 UTC string. */
export const healthResponseSchema = z.object({
  status: z.literal("ok"),
  service: z.string().min(1),
  version: z.string().min(1),
  timestamp: z.string().min(1),
});

/** Response of the database readiness endpoint. Carries no error details on purpose. */
export const databaseHealthResponseSchema = z.object({
  status: z.enum(["ok", "unavailable"]),
  timestamp: z.string().min(1),
});
