import type { z } from "zod";
import type { databaseHealthResponseSchema, healthResponseSchema } from "../schemas/health.js";

export type HealthResponse = z.infer<typeof healthResponseSchema>;
export type DatabaseHealthResponse = z.infer<typeof databaseHealthResponseSchema>;
