/**
 * Physical keys, named with the `KeyboardEvent.code` vocabulary.
 *
 * `code` identifies the key position on the keyboard and does not change with the active
 * layout, whereas `KeyboardEvent.key` is the produced character and does. Layouts map a physical
 * key code to the characters it produces.
 *
 * Only character-producing keys are listed. `IntlBackslash` is the extra key next to left Shift
 * on ISO keyboards, which AZERTY and QWERTZ rely on.
 */

// prettier-ignore
const LETTER_KEY_CODES = [
  "KeyA", "KeyB", "KeyC", "KeyD", "KeyE", "KeyF", "KeyG", "KeyH", "KeyI",
  "KeyJ", "KeyK", "KeyL", "KeyM", "KeyN", "KeyO", "KeyP", "KeyQ", "KeyR",
  "KeyS", "KeyT", "KeyU", "KeyV", "KeyW", "KeyX", "KeyY", "KeyZ",
] as const;

// prettier-ignore
const DIGIT_KEY_CODES = [
  "Digit0", "Digit1", "Digit2", "Digit3", "Digit4",
  "Digit5", "Digit6", "Digit7", "Digit8", "Digit9",
] as const;

// prettier-ignore
const PUNCTUATION_KEY_CODES = [
  "Backquote", "Minus", "Equal", "BracketLeft", "BracketRight", "Backslash",
  "Semicolon", "Quote", "Comma", "Period", "Slash", "IntlBackslash",
] as const;

export const PHYSICAL_KEY_CODES = [
  ...LETTER_KEY_CODES,
  ...DIGIT_KEY_CODES,
  ...PUNCTUATION_KEY_CODES,
  "Space",
] as const;

export type PhysicalKeyCode = (typeof PHYSICAL_KEY_CODES)[number];

const PHYSICAL_KEY_CODE_SET: ReadonlySet<string> = new Set(PHYSICAL_KEY_CODES);

export function isPhysicalKeyCode(value: unknown): value is PhysicalKeyCode {
  return typeof value === "string" && PHYSICAL_KEY_CODE_SET.has(value);
}
