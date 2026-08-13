import { create } from 'zustand';
import { TrainingRunOutput, MLApi } from '@/services/api/mlApi';
import { toast } from 'react-hot-toast';

interface TrainingStoreState {
  runs: TrainingRunOutput[];
  isTraining: boolean;
  triggerTraining: (modelId: string, datasetVersion: string) => Promise<void>;
}

export const useTrainingStore = create<TrainingStoreState>((set, get) => ({
  runs: [
    { runId: 'run-101', modelId: 'ml-1', datasetVersion: 'v2.4', epochs: 50, loss: 0.012, durationSeconds: 180, status: 'COMPLETED' },
    { runId: 'run-102', modelId: 'ml-2', datasetVersion: 'v2.4', epochs: 50, loss: 0.018, durationSeconds: 120, status: 'COMPLETED' },
  ],
  isTraining: false,

  triggerTraining: async (modelId, datasetVersion) => {
    try {
      set({ isTraining: true });
      const newRun = await MLApi.trainModel(modelId, datasetVersion);
      set((state) => ({ runs: [newRun, ...state.runs], isTraining: false }));
      toast.success('Training pipeline run completed!');
    } catch {
      set({ isTraining: false });
      toast.error('Training pipeline run failed.');
    }
  },
}));
