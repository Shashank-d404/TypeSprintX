/**
 * The modifier state that selects which character a key produces.
 *
 * - `base`: no modifier
 * - `shift`: Shift
 * - `altGr`: AltGr (AltGraph), which AZERTY and QWERTZ use for characters such as `@` and `\`
 * - `shiftAltGr`: Shift and AltGr together
 *
 * Deciding which layer is active from live keyboard events is the typing engine job.
 */
export const KEY_LAYERS = ["base", "shift", "altGr", "shiftAltGr"] as const;

export type KeyLayer = (typeof KEY_LAYERS)[number];
