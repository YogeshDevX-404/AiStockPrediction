import { HistoricalPoint } from '@/services/api/marketApi';

export const calculateEMA = (data: number[], period: number): number | null => {
  if (data.length < period) return null;
  const k = 2 / (period + 1);
  let ema = data.slice(0, period).reduce((a, b) => a + b, 0) / period;
  for (let i = period; i < data.length; i++) {
    ema = (data[i] - ema) * k + ema;
  }
  return ema;
};

export const calculateSMA = (data: number[], period: number): number | null => {
  if (data.length < period) return null;
  const slice = data.slice(data.length - period);
  return slice.reduce((a, b) => a + b, 0) / period;
};

export const calculateRSI = (data: number[], period: number = 14): { value: number; signal: 'OVERBOUGHT' | 'OVERSOLD' | 'NEUTRAL' } | null => {
  if (data.length <= period) return null;
  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const change = data[i] - data[i - 1];
    if (change > 0) gains += change;
    else losses -= change;
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  for (let i = period + 1; i < data.length; i++) {
    const change = data[i] - data[i - 1];
    let gain = 0;
    let loss = 0;
    if (change > 0) gain = change;
    else loss = -change;

    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;
  }

  if (avgLoss === 0) return { value: 100, signal: 'OVERBOUGHT' };
  
  const rs = avgGain / avgLoss;
  const rsi = 100 - (100 / (1 + rs));
  
  let signal: 'OVERBOUGHT' | 'OVERSOLD' | 'NEUTRAL' = 'NEUTRAL';
  if (rsi > 70) signal = 'OVERBOUGHT';
  else if (rsi < 30) signal = 'OVERSOLD';
  
  return { value: rsi, signal };
};

export const calculateMACD = (data: number[]): { value: number; signalLine: number; histogram: number; signal: 'BULLISH_CROSS' | 'BEARISH_CROSS' | 'NEUTRAL' } | null => {
  if (data.length < 26) return null;
  
  const ema12 = [];
  let currentEma12 = data.slice(0, 12).reduce((a, b) => a + b, 0) / 12;
  ema12.push(currentEma12);
  const k12 = 2 / 13;
  for (let i = 12; i < data.length; i++) {
    currentEma12 = (data[i] - currentEma12) * k12 + currentEma12;
    ema12.push(currentEma12);
  }

  const ema26 = [];
  let currentEma26 = data.slice(0, 26).reduce((a, b) => a + b, 0) / 26;
  ema26.push(currentEma26);
  const k26 = 2 / 27;
  for (let i = 26; i < data.length; i++) {
    currentEma26 = (data[i] - currentEma26) * k26 + currentEma26;
    ema26.push(currentEma26);
  }

  // Align arrays: ema12 starts at index 11, ema26 starts at index 25
  const macdLine = [];
  for (let i = 0; i < ema26.length; i++) {
    // ema26[i] corresponds to data[i + 25]
    // ema12 for data[i + 25] is at ema12[i + 25 - 11] = ema12[i + 14]
    macdLine.push(ema12[i + 14] - ema26[i]);
  }

  if (macdLine.length < 9) return null;

  let signalEma = macdLine.slice(0, 9).reduce((a, b) => a + b, 0) / 9;
  const k9 = 2 / 10;
  for (let i = 9; i < macdLine.length; i++) {
    signalEma = (macdLine[i] - signalEma) * k9 + signalEma;
  }

  const lastMacd = macdLine[macdLine.length - 1];
  const prevMacd = macdLine[macdLine.length - 2];
  
  const lastSignal = signalEma;
  // approximate previous signal by unrolling one step, or just keep it simple:
  // if MACD is above signal now, but wasn't before? We'll just look at current difference
  const histogram = lastMacd - lastSignal;
  let signal: 'BULLISH_CROSS' | 'BEARISH_CROSS' | 'NEUTRAL' = 'NEUTRAL';
  if (histogram > 0) signal = 'BULLISH_CROSS';
  else if (histogram < 0) signal = 'BEARISH_CROSS';

  return { value: lastMacd, signalLine: lastSignal, histogram, signal };
};

export const calculateBollingerBands = (data: number[], period: number = 20, stdDevMult: number = 2) => {
  if (data.length < period) return null;
  const slice = data.slice(data.length - period);
  const middle = slice.reduce((a, b) => a + b, 0) / period;
  const variance = slice.reduce((acc, val) => acc + Math.pow(val - middle, 2), 0) / period;
  const stdDev = Math.sqrt(variance);
  
  return {
    middle,
    upper: middle + stdDev * stdDevMult,
    lower: middle - stdDev * stdDevMult,
  };
};

export const calculateVWAP = (data: HistoricalPoint[]): number | null => {
  if (data.length === 0) return null;
  // Usually VWAP is anchored to a session (e.g. intraday). 
  // For daily data over 30 days, we'll calculate an anchored VWAP over the visible period.
  let sumPv = 0;
  let sumV = 0;
  for (const point of data) {
    const typicalPrice = (point.high + point.low + point.close) / 3;
    sumPv += typicalPrice * point.volume;
    sumV += point.volume;
  }
  if (sumV === 0) return null;
  return sumPv / sumV;
};

export const calculateSupportResistance = (data: HistoricalPoint[]) => {
  if (data.length < 20) return { supportLevels: [], resistanceLevels: [] };
  
  // Pivot points based on recent high/low (simplified for 3 levels)
  const recentData = data.slice(data.length - 20); // last 20 periods
  let high = -Infinity;
  let low = Infinity;
  let close = recentData[recentData.length - 1].close;

  for (const point of recentData) {
    if (point.high > high) high = point.high;
    if (point.low < low) low = point.low;
  }

  const pivot = (high + low + close) / 3;
  
  const r1 = (2 * pivot) - low;
  const s1 = (2 * pivot) - high;
  
  const r2 = pivot + (high - low);
  const s2 = pivot - (high - low);
  
  const r3 = high + 2 * (pivot - low);
  const s3 = low - 2 * (high - pivot);

  return {
    supportLevels: [s1, s2, s3].sort((a, b) => b - a), // descending: highest support first
    resistanceLevels: [r1, r2, r3].sort((a, b) => a - b), // ascending: lowest resistance first
  };
};

export const determineOverallTrend = (close: number, ema20: number | null, ema50: number | null, ema200: number | null) => {
  let score = 0;
  if (ema20 && close > ema20) score++;
  else if (ema20) score--;

  if (ema50 && close > ema50) score++;
  else if (ema50) score--;

  if (ema200 && close > ema200) score += 2;
  else if (ema200) score -= 2;
  
  if (ema20 && ema50 && ema20 > ema50) score++;
  else if (ema20 && ema50) score--;

  if (score >= 4) return 'STRONG_BULLISH';
  if (score > 0) return 'BULLISH';
  if (score === 0) return 'NEUTRAL';
  if (score > -4) return 'BEARISH';
  return 'STRONG_BEARISH';
};
