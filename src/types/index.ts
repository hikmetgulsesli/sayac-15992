// Counter types
export interface CounterChange {
  id: string;
  timestamp: Date;
  previousValue: number;
  newValue: number;
  type: 'increment' | 'decrement' | 'reset';
}

export interface CounterState {
  count: number;
  history: CounterChange[];
}

// Theme types
export type ThemeMode = 'light' | 'dark';

// Tab navigation types
export type TabType = 'counter' | 'history';
