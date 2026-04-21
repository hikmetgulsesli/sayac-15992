import { useState, useEffect, useCallback } from 'react';
import { CounterChange } from '../types';
import {
  getStoredCounterValue,
  setStoredCounterValue,
  getStoredCounterHistory,
  setStoredCounterHistory,
} from '../utils/storage';

const MAX_HISTORY = 10;

export function useCounter() {
  const [count, setCount] = useState<number>(() => {
    const stored = getStoredCounterValue();
    return stored ?? 0;
  });
  const [history, setHistory] = useState<CounterChange[]>(() => {
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
  });

  useEffect(() => {
    setStoredCounterValue(count);
  }, [count]);

  useEffect(() => {
    const trimmed = history.slice(0, MAX_HISTORY);
    setStoredCounterHistory(JSON.stringify(trimmed));
  }, [history]);

  const increment = useCallback(() => {
    setCount((prev) => {
      const newValue = prev + 1;
      setHistory((h) => [
        {
          id: crypto.randomUUID(),
          timestamp: new Date(),
          previousValue: prev,
          newValue,
          type: 'increment' as const,
        },
        ...h,
      ].slice(0, MAX_HISTORY));
      return newValue;
    });
  }, []);

  const decrement = useCallback(() => {
    setCount((prev) => {
      const newValue = prev - 1;
      setHistory((h) => [
        {
          id: crypto.randomUUID(),
          timestamp: new Date(),
          previousValue: prev,
          newValue,
          type: 'decrement' as const,
        },
        ...h,
      ].slice(0, MAX_HISTORY));
      return newValue;
    });
  }, []);

  const reset = useCallback(() => {
    setCount(0);
    setHistory((h) => [
      {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        previousValue: h[0]?.newValue ?? 0,
        newValue: 0,
        type: 'reset' as const,
      },
      ...h,
    ].slice(0, MAX_HISTORY));
  }, []);

  const addValue = useCallback((value: number) => {
    if (value === 0) return;
    setCount((prev) => {
      const newValue = prev + value;
      setHistory((h) => [
        {
          id: crypto.randomUUID(),
          timestamp: new Date(),
          previousValue: prev,
          newValue,
          type: value > 0 ? ('increment' as const) : ('decrement' as const),
        },
        ...h,
      ].slice(0, MAX_HISTORY));
      return newValue;
    });
  }, []);

  return { count, history, increment, decrement, reset, addValue };
}
