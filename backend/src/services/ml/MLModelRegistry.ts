export interface RegisteredModelItem {
  id: string;
  name: string;
  modelType: 'LSTM' | 'TRANSFORMER' | 'TFT' | 'XGBOOST' | 'CATBOOST' | 'PROPHET';
  version: string;
  status: 'CHAMPION' | 'CHALLENGER' | 'ARCHIVED';
  accuracy: number;
  rmse: number;
  mae: number;
  f1Score: number;
}

export class MLModelRegistry {
  public static getModels(): RegisteredModelItem[] {
    return [
      { id: 'ml-1', name: 'Temporal Fusion Transformer (TFT-v3)', modelType: 'TFT', version: '3.2.0', status: 'CHAMPION', accuracy: 91.4, rmse: 0.95, mae: 0.62, f1Score: 0.90 },
      { id: 'ml-2', name: 'XGBoost Gradient Booster', modelType: 'XGBOOST', version: '2.1.0', status: 'CHALLENGER', accuracy: 89.5, rmse: 1.15, mae: 0.78, f1Score: 0.88 },
      { id: 'ml-3', name: 'Deep LSTM Recurrent Net', modelType: 'LSTM', version: '1.8.4', status: 'CHALLENGER', accuracy: 87.2, rmse: 1.34, mae: 0.92, f1Score: 0.85 },
      { id: 'ml-4', name: 'CatBoost Regressor', modelType: 'CATBOOST', version: '1.4.0', status: 'ARCHIVED', accuracy: 84.1, rmse: 1.52, mae: 1.10, f1Score: 0.82 },
    ];
  }
}
