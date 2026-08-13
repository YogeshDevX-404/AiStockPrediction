export interface QuantSimulationOutput {
  scenarioName: string;
  expectedPortfolioReturn: number; // %
  valueAtRisk95: number;           // %
  confidenceInterval: string;
}

export interface IQuantModelAdapter {
  name: string;
  runMonteCarloSimulation(iterations: number): Promise<QuantSimulationOutput>;
}

export class MockMonteCarloAdapter implements IQuantModelAdapter {
  readonly name = 'MonteCarlo10KSimAdapter';

  async runMonteCarloSimulation(iterations: number): Promise<QuantSimulationOutput> {
    return {
      scenarioName: '10,000 Iteration Monte Carlo Simulation',
      expectedPortfolioReturn: 14.8,
      valueAtRisk95: -3.2,
      confidenceInterval: '95% Confidence Level',
    };
  }
}
