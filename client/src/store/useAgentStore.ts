import { create } from 'zustand';

export interface SpecializedAgentItem {
  id: string;
  name: string;
  category: 'RESEARCH' | 'TECHNICAL' | 'RISK' | 'VISION' | 'STRATEGY' | 'COACH';
  enabled: boolean;
  confidence: number;
}

interface AgentStoreState {
  agents: SpecializedAgentItem[];
  toggleAgent: (id: string) => void;
}

export const useAgentStore = create<AgentStoreState>((set) => ({
  agents: [
    { id: 'ag-1', name: 'Market Research Agent', category: 'RESEARCH', enabled: true, confidence: 95.0 },
    { id: 'ag-2', name: 'Technical Analysis Agent', category: 'TECHNICAL', enabled: true, confidence: 92.0 },
    { id: 'ag-3', name: 'News Intelligence Agent', category: 'RESEARCH', enabled: true, confidence: 88.0 },
    { id: 'ag-4', name: 'Risk Analysis Agent', category: 'RISK', enabled: true, confidence: 91.0 },
    { id: 'ag-5', name: 'Prediction Explanation Agent', category: 'RESEARCH', enabled: true, confidence: 89.0 },
    { id: 'ag-6', name: 'Screenshot Vision Agent', category: 'VISION', enabled: true, confidence: 94.0 },
    { id: 'ag-7', name: 'Strategy Agent', category: 'STRATEGY', enabled: true, confidence: 87.0 },
    { id: 'ag-8', name: 'Paper Trading Coach', category: 'COACH', enabled: true, confidence: 90.0 },
  ],

  toggleAgent: (id) =>
    set((state) => ({
      agents: state.agents.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)),
    })),
}));
