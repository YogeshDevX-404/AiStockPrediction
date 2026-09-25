import { AgentOrchestrator, MultiAgentCopilotResponse } from './AgentOrchestrator';

export class AgentRouter {
  public static async routeQuery(query: string, symbol?: string, userId?: string): Promise<MultiAgentCopilotResponse> {
    return AgentOrchestrator.executeQuery(query, symbol, userId);
  }
}
