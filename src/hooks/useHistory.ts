import { CounterChange } from '../types';
import {
  getStoredCounterHistory,
  setStoredCounterHistory,
} from '../utils/storage';

const MAX_HISTORY = 10;

export function useHistory() {
  const loadHistory = (): CounterChange[] => {
    const stored = getStoredCounterHistory();
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((h: CounterChange) => ({
          ...h,
          timestamp: new Date(h.timestamp),
        }));
      } catch {
        return [];
      }
    }
    return [];
  };

  const saveHistory = (history: CounterChange[]) => {
    const trimmed = history.slice(0, MAX_HISTORY);
    setStoredCounterHistory(JSON.stringify(trimmed));
  };

  return { loadHistory, saveHistory, MAX_HISTORY };
}
