/**
 * Every keyboard layout the product is designed to support.
 * Adding a layout starts here: the display-name map below stops compiling until it is filled in.
 */
export const KEYBOARD_LAYOUT_IDS = ["qwerty", "azerty", "qwertz"] as const;

export type KeyboardLayoutId = (typeof KEYBOARD_LAYOUT_IDS)[number];

export const KEYBOARD_LAYOUT_DISPLAY_NAMES = {
  qwerty: "QWERTY",
  azerty: "AZERTY",
  qwertz: "QWERTZ",
} as const satisfies Record<KeyboardLayoutId, string>;

/** The layout available at launch. AZERTY and QWERTZ are planned, not yet shipped. */
export const INITIAL_KEYBOARD_LAYOUT_ID = "qwerty" as const satisfies KeyboardLayoutId;

export function isKeyboardLayoutId(value: unknown): value is KeyboardLayoutId {
  return typeof value === "string" && (KEYBOARD_LAYOUT_IDS as readonly string[]).includes(value);
}
