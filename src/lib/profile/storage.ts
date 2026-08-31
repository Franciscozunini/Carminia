import type { CostProfile, FactoringInputs } from "@/lib/calc/types";
import { STARTER_PROFILE, STARTER_FACTORING } from "@/lib/data/benchmarks";

/**
 * Per-driver profile persistence. The saved cost profile is what turns this
 * from a one-off calculator into a daily tool: set your truck up once, then
 * evaluate any load in seconds on any visit.
 *
 * Storage is the viewer's own browser only (localStorage). Nothing is sent to a
 * server. Every access is wrapped so private windows / blocked storage degrade
 * to sensible defaults instead of throwing.
 */

const KEY = "haulwise.profile.v1";

export interface SavedState {
  profile: CostProfile;
  factoring: FactoringInputs;
  savedAt: string; // ISO timestamp
}

export function defaultState(): SavedState {
  return {
    profile: { ...STARTER_PROFILE },
    factoring: { ...STARTER_FACTORING },
    savedAt: "",
  };
}

export function loadState(): SavedState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as Partial<SavedState>;
    // Merge over defaults so a schema addition never breaks an old save.
    const base = defaultState();
    return {
      profile: { ...base.profile, ...(parsed.profile ?? {}) },
      factoring: { ...base.factoring, ...(parsed.factoring ?? {}) },
      savedAt: parsed.savedAt ?? "",
    };
  } catch {
    return defaultState();
  }
}

export function saveState(state: Omit<SavedState, "savedAt">): SavedState {
  const toSave: SavedState = { ...state, savedAt: new Date().toISOString() };
  if (typeof window === "undefined") return toSave;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(toSave));
  } catch {
    // Storage blocked — the app still works for this session, just no persistence.
  }
  return toSave;
}

export function clearState(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
