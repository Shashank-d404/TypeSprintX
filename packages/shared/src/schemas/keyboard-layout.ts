import { z } from "zod";
import { PHYSICAL_KEY_CODES } from "../keyboard/key-code.js";
import { KEYBOARD_LAYOUT_IDS } from "../keyboard/layout-id.js";

const producedText = z.string().min(1).optional();

// One optional entry per layer in KEY_LAYERS (keep the two in sync).
const keyOutputsShape = z.object({
  base: producedText,
  shift: producedText,
  altGr: producedText,
  shiftAltGr: producedText,
});

function hasAtLeastOneLayer(outputs: Record<string, string | undefined>): boolean {
  return Object.values(outputs).some((value) => value !== undefined);
}

function hasUniqueKeyCodes(layout: { keys: ReadonlyArray<{ code: string }> }): boolean {
  const codes = layout.keys.map((key) => key.code);
  return new Set(codes).size === codes.length;
}

/** The text a single physical key produces, per modifier layer. */
export const keyOutputsSchema = keyOutputsShape.refine(hasAtLeastOneLayer, {
  message: "A key must produce text on at least one layer",
});

/** One physical key (by `KeyboardEvent.code`) and what it produces. */
export const keyMappingSchema = z.object({
  code: z.enum(PHYSICAL_KEY_CODES),
  outputs: keyOutputsSchema,
});

const keyboardLayoutShape = z.object({
  id: z.enum(KEYBOARD_LAYOUT_IDS),
  displayName: z.string().min(1),
  keys: z.array(keyMappingSchema).min(1),
});

/** A complete keyboard layout expressed as data. */
export const keyboardLayoutDefinitionSchema = keyboardLayoutShape.refine(hasUniqueKeyCodes, {
  message: "A layout must not define the same physical key twice",
  path: ["keys"],
});
