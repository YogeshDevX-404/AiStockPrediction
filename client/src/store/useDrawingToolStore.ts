import { create } from 'zustand';

export type DrawingToolType =
  | 'CURSOR'
  | 'TRENDLINE'
  | 'HORIZONTAL'
  | 'VERTICAL'
  | 'RAY'
  | 'RECTANGLE'
  | 'CIRCLE'
  | 'TEXT'
  | 'ARROW'
  | 'FIBONACCI';

interface DrawingToolState {
  activeTool: DrawingToolType;
  setActiveTool: (tool: DrawingToolType) => void;
  drawingsCount: number;
  clearDrawings: () => void;
}

export const useDrawingToolStore = create<DrawingToolState>((set) => ({
  activeTool: 'CURSOR',
  setActiveTool: (activeTool) => set({ activeTool }),
  drawingsCount: 0,
  clearDrawings: () => set({ drawingsCount: 0 }),
}));
