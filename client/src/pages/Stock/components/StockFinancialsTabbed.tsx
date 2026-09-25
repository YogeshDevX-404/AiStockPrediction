import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { useFinancialsStore } from '@/store/useFinancialsStore';
import { formatCurrency } from '@/utils/cn';
import { FileText, ArrowUpRight } from 'lucide-react';

export interface StockFinancialsTabbedProps {
  symbol: string;
}

export const StockFinancialsTabbed: React.FC<StockFinancialsTabbedProps> = ({ symbol }) => {
  const { activeTab, setActiveTab, financials } = useFinancialsStore();

  const data = financials || {
    incomeStatement: [],
    balanceSheet: [],
    cashFlow: [],
    quarterlyResults: [],
  };

  return (
    <GlassCard className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/50 pb-3">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-base font-bold font-display text-foreground">Financial Statements & Quarterly Performance</h2>
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
                activeTab === tab.id ? 'bg-emerald-500 text-foreground shadow' : 'text-muted-foreground hover:text-foreground'
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
            <thead className="border-b border-border/50 text-muted-foreground uppercase">
              <tr>
                <th className="pb-3 font-semibold">Fiscal Period</th>
                <th className="pb-3 font-semibold">Revenue ($M)</th>
                <th className="pb-3 font-semibold">EBITDA ($M)</th>
                <th className="pb-3 font-semibold">Net Income ($M)</th>
                <th className="pb-3 font-semibold text-right">Net Margin (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.incomeStatement.length > 0 ? (
                data.incomeStatement.map((row) => (
                  <tr key={row.period} className="hover:bg-foreground/5 font-mono">
                    <td className="py-3 font-bold text-foreground">{row.period}</td>
                    <td className="py-3 text-slate-200">${row.revenue.toLocaleString()}</td>
                    <td className="py-3 text-purple-600 dark:text-purple-400">${row.ebitda.toLocaleString()}</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400 font-bold">${row.netIncome.toLocaleString()}</td>
                    <td className="py-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">{row.margin}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-muted-foreground">Financial data currently unavailable for {symbol}.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'balance' && (
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/50 text-muted-foreground uppercase">
              <tr>
                <th className="pb-3 font-semibold">Fiscal Period</th>
                <th className="pb-3 font-semibold">Total Assets ($M)</th>
                <th className="pb-3 font-semibold">Total Liabilities ($M)</th>
                <th className="pb-3 font-semibold text-right">Stockholders Equity ($M)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.balanceSheet.length > 0 ? (
                data.balanceSheet.map((row) => (
                  <tr key={row.period} className="hover:bg-foreground/5 font-mono">
                    <td className="py-3 font-bold text-foreground">{row.period}</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400 font-bold">${row.assets.toLocaleString()}</td>
                    <td className="py-3 text-red-600 dark:text-red-400">${row.liabilities.toLocaleString()}</td>
                    <td className="py-3 text-right text-purple-600 dark:text-purple-400 font-bold">${row.equity.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-muted-foreground">Balance sheet data unavailable for {symbol}.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'cashflow' && (
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/50 text-muted-foreground uppercase">
              <tr>
                <th className="pb-3 font-semibold">Fiscal Period</th>
                <th className="pb-3 font-semibold">Operating Cash Flow ($M)</th>
                <th className="pb-3 font-semibold text-right">Free Cash Flow ($M)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.cashFlow.length > 0 ? (
                data.cashFlow.map((row) => (
                  <tr key={row.period} className="hover:bg-foreground/5 font-mono">
                    <td className="py-3 font-bold text-foreground">{row.period}</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400 font-bold">${row.operatingCashFlow.toLocaleString()}</td>
                    <td className="py-3 text-right text-purple-600 dark:text-purple-400 font-bold">${row.freeCashFlow.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-muted-foreground">Cash flow data unavailable for {symbol}.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'quarterly' && (
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/50 text-muted-foreground uppercase">
              <tr>
                <th className="pb-3 font-semibold">Quarter</th>
                <th className="pb-3 font-semibold">Revenue ($M)</th>
                <th className="pb-3 font-semibold">Net Profit ($M)</th>
                <th className="pb-3 font-semibold">EPS ($)</th>
                <th className="pb-3 font-semibold text-right">YoY Growth (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.quarterlyResults.length > 0 ? (
                data.quarterlyResults.map((row) => (
                  <tr key={row.quarter} className="hover:bg-foreground/5 font-mono">
                    <td className="py-3 font-bold text-foreground">{row.quarter}</td>
                    <td className="py-3 text-slate-200">${row.revenue.toLocaleString()}</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400 font-bold">${row.profit.toLocaleString()}</td>
                    <td className="py-3 text-purple-600 dark:text-purple-400">${row.eps}</td>
                    <td className="py-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">+{row.growth}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-muted-foreground">Quarterly results unavailable for {symbol}.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </GlassCard>
  );
};
