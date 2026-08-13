import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { useFinancialsStore } from '@/store/useFinancialsStore';
import { formatCurrency } from '@/utils/cn';
import { FileText, ArrowUpRight } from 'lucide-react';

export interface StockFinancialsTabbedProps {
  symbol: string;
}

export const StockFinancialsTabbed: React.FC<StockFinancialsTabbedProps> = () => {
  const { activeTab, setActiveTab, financials } = useFinancialsStore();

  const data = financials || {
    incomeStatement: [
      { period: '2023', revenue: 60922, netIncome: 29760, ebitda: 34200, margin: 48.8 },
      { period: '2024', revenue: 96310, netIncome: 53040, ebitda: 58900, margin: 55.0 },
      { period: '2025 (TTM)', revenue: 124500, netIncome: 68900, ebitda: 74200, margin: 55.3 },
    ],
    balanceSheet: [
      { period: '2023', assets: 65728, liabilities: 22745, equity: 42983 },
      { period: '2024', assets: 85200, liabilities: 26100, equity: 59100 },
      { period: '2025', assets: 112400, liabilities: 31200, equity: 81200 },
    ],
    cashFlow: [
      { period: '2023', operatingCashFlow: 28090, freeCashFlow: 26800 },
      { period: '2024', operatingCashFlow: 45200, freeCashFlow: 42100 },
      { period: '2025', operatingCashFlow: 58400, freeCashFlow: 54900 },
    ],
    quarterlyResults: [
      { quarter: 'Q1 2025', revenue: 26044, profit: 14881, eps: 0.60, margin: 57.1, growth: 262 },
      { quarter: 'Q2 2025', revenue: 30040, profit: 16599, eps: 0.68, margin: 55.2, growth: 122 },
      { quarter: 'Q3 2025', revenue: 35080, profit: 19300, eps: 0.78, margin: 55.0, growth: 94 },
      { quarter: 'Q4 2025', revenue: 39200, profit: 21400, eps: 0.86, margin: 54.5, growth: 78 },
    ],
  };

  return (
    <GlassCard className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold font-display text-white">Financial Statements & Quarterly Performance</h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center space-x-1 glass-panel p-1 rounded-xl text-xs">
          {[
            { id: 'income', label: 'Income Statement' },
            { id: 'balance', label: 'Balance Sheet' },
            { id: 'cashflow', label: 'Cash Flow' },
            { id: 'quarterly', label: 'Quarterly Results' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === tab.id ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Render Financial Table based on Active Tab */}
      <div className="overflow-x-auto">
        {activeTab === 'income' && (
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-slate-400 uppercase">
              <tr>
                <th className="pb-3 font-semibold">Fiscal Period</th>
                <th className="pb-3 font-semibold">Revenue ($M)</th>
                <th className="pb-3 font-semibold">EBITDA ($M)</th>
                <th className="pb-3 font-semibold">Net Income ($M)</th>
                <th className="pb-3 font-semibold text-right">Net Margin (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.incomeStatement.map((row) => (
                <tr key={row.period} className="hover:bg-white/5 font-mono">
                  <td className="py-3 font-bold text-white">{row.period}</td>
                  <td className="py-3 text-slate-200">${row.revenue.toLocaleString()}</td>
                  <td className="py-3 text-purple-400">${row.ebitda.toLocaleString()}</td>
                  <td className="py-3 text-emerald-400 font-bold">${row.netIncome.toLocaleString()}</td>
                  <td className="py-3 text-right text-emerald-400 font-bold">{row.margin}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'balance' && (
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-slate-400 uppercase">
              <tr>
                <th className="pb-3 font-semibold">Fiscal Period</th>
                <th className="pb-3 font-semibold">Total Assets ($M)</th>
                <th className="pb-3 font-semibold">Total Liabilities ($M)</th>
                <th className="pb-3 font-semibold text-right">Stockholders Equity ($M)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.balanceSheet.map((row) => (
                <tr key={row.period} className="hover:bg-white/5 font-mono">
                  <td className="py-3 font-bold text-white">{row.period}</td>
                  <td className="py-3 text-emerald-400 font-bold">${row.assets.toLocaleString()}</td>
                  <td className="py-3 text-red-400">${row.liabilities.toLocaleString()}</td>
                  <td className="py-3 text-right text-purple-400 font-bold">${row.equity.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'cashflow' && (
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-slate-400 uppercase">
              <tr>
                <th className="pb-3 font-semibold">Fiscal Period</th>
                <th className="pb-3 font-semibold">Operating Cash Flow ($M)</th>
                <th className="pb-3 font-semibold text-right">Free Cash Flow ($M)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.cashFlow.map((row) => (
                <tr key={row.period} className="hover:bg-white/5 font-mono">
                  <td className="py-3 font-bold text-white">{row.period}</td>
                  <td className="py-3 text-emerald-400 font-bold">${row.operatingCashFlow.toLocaleString()}</td>
                  <td className="py-3 text-right text-purple-400 font-bold">${row.freeCashFlow.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'quarterly' && (
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-slate-400 uppercase">
              <tr>
                <th className="pb-3 font-semibold">Quarter</th>
                <th className="pb-3 font-semibold">Revenue ($M)</th>
                <th className="pb-3 font-semibold">Net Profit ($M)</th>
                <th className="pb-3 font-semibold">EPS ($)</th>
                <th className="pb-3 font-semibold text-right">YoY Growth (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.quarterlyResults.map((row) => (
                <tr key={row.quarter} className="hover:bg-white/5 font-mono">
                  <td className="py-3 font-bold text-white">{row.quarter}</td>
                  <td className="py-3 text-slate-200">${row.revenue.toLocaleString()}</td>
                  <td className="py-3 text-emerald-400 font-bold">${row.profit.toLocaleString()}</td>
                  <td className="py-3 text-purple-400">${row.eps}</td>
                  <td className="py-3 text-right text-emerald-400 font-bold">+{row.growth}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </GlassCard>
  );
};
