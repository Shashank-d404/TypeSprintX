import type { z } from "zod";
import type {
  keyMappingSchema,
  keyOutputsSchema,
  keyboardLayoutDefinitionSchema,
} from "../schemas/keyboard-layout.js";

export type KeyOutputs = z.infer<typeof keyOutputsSchema>;
export type KeyMapping = z.infer<typeof keyMappingSchema>;
export type KeyboardLayoutDefinition = z.infer<typeof keyboardLayoutDefinitionSchema>;
