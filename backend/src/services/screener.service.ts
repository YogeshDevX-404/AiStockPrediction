import { FilterEngine, ScreenerFilterCriteria, StockCandidate } from './screener/FilterEngine';
import { AIOpportunityEngine, RadarCategory } from './screener/AIOpportunityEngine';

export interface SavedScreenerRecord {
  id: string;
  name: string;
  description: string;
  filtersJson: string;
  isPinned: boolean;
  createdAt: string;
}

export interface ScannerHistoryRecord {
  id: string;
  scanType: string;
  matchedCount: number;
  timestamp: string;
}

const mockSavedScreeners: SavedScreenerRecord[] = [
  { id: 'ss1', name: 'Golden Cross AI Momentum', description: 'EMA 50 > EMA 200 with RSI between 40 and 65.', filtersJson: '{"minRsi":40,"maxRsi":65,"goldenCrossOnly":true}', isPinned: true, createdAt: '2026-03-20' },
  { id: 'ss2', name: 'High Yield Tech Value', description: 'Low P/E tech stocks with P/E < 30.', filtersJson: '{"maxPe":30,"sector":"Technology"}', isPinned: false, createdAt: '2026-03-18' },
];

const mockScanHistory: ScannerHistoryRecord[] = [
  { id: 'sh1', scanType: 'Golden Cross Breakout', matchedCount: 8, timestamp: '2026-03-25T12:00:00Z' },
  { id: 'sh2', scanType: 'Oversold RSI Dip Buy', matchedCount: 4, timestamp: '2026-03-24T16:30:00Z' },
];

export const getMarketScannerRadarsService = async (): Promise<RadarCategory[]> => {
  return AIOpportunityEngine.getMarketRadars();
};

export const screenStocksService = async (criteria: ScreenerFilterCriteria): Promise<StockCandidate[]> => {
  return FilterEngine.filterUniverse(criteria || {});
};

export const getSavedScreenersService = async (): Promise<SavedScreenerRecord[]> => {
  return mockSavedScreeners;
};

export const saveScreenerPresetService = async (name: string, description: string, filtersJson: string): Promise<SavedScreenerRecord> => {
  const newPreset: SavedScreenerRecord = {
    id: `ss_${Date.now()}`,
    name,
    description: description || '',
    filtersJson: filtersJson || '{}',
    isPinned: false,
    createdAt: new Date().toISOString().split('T')[0],
  };
  mockSavedScreeners.push(newPreset);
  return newPreset;
};

export const deleteSavedScreenerService = async (id: string): Promise<boolean> => {
  const idx = mockSavedScreeners.findIndex((s) => s.id === id);
  if (idx !== -1) mockSavedScreeners.splice(idx, 1);
  return true;
};

export const getScannerHistoryService = async (): Promise<ScannerHistoryRecord[]> => {
  return mockScanHistory;
};
