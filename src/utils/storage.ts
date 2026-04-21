const STORAGE_KEYS = {
  THEME: 'sayac-theme',
  COUNTER_VALUE: 'sayac-counter-value',
  COUNTER_HISTORY: 'sayac-counter-history',
} as const;

export function getStoredTheme(): 'light' | 'dark' | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return null;
  } catch {
    return null;
  }
}

export function setStoredTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch {
    // Storage not available
  }
}

export function getStoredCounterValue(): number | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.COUNTER_VALUE);
    if (stored !== null) {
      const value = parseInt(stored, 10);
      return isNaN(value) ? null : value;
    }
    return null;
  } catch {
    return null;
  }
}

export function setStoredCounterValue(value: number): void {
  try {
    localStorage.setItem(STORAGE_KEYS.COUNTER_VALUE, String(value));
  } catch {
    // Storage not available
  }
}

export function getStoredCounterHistory(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.COUNTER_HISTORY);
  } catch {
    return null;
  }
}

export function setStoredCounterHistory(historyJson: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.COUNTER_HISTORY, historyJson);
  } catch {
    // Storage not available
  }
}
