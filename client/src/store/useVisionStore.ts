import { create } from 'zustand';

interface VisionState {
  activeProvider: string; // 'MockNeuralVision' | 'OpenAI' | 'Gemini' | 'Claude'
  zoomLevel: number;
  rotation: number;
  setActiveProvider: (provider: string) => void;
  setZoomLevel: (zoom: number) => void;
  setRotation: (rotation: number) => void;
  resetControls: () => void;
}

export const useVisionStore = create<VisionState>((set) => ({
  activeProvider: 'MockNeuralVision',
  zoomLevel: 1,
  rotation: 0,

  setActiveProvider: (activeProvider) => set({ activeProvider }),
  setZoomLevel: (zoomLevel) => set({ zoomLevel: Math.max(0.5, Math.min(3, zoomLevel)) }),
  setRotation: (rotation) => set({ rotation }),
  resetControls: () => set({ zoomLevel: 1, rotation: 0 }),
}));
