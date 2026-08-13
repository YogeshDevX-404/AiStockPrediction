import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { CompanyProfileResponse } from '@/services/api/stocksApi';
import { Building2, DollarSign, ExternalLink } from 'lucide-react';
import { formatCurrency } from '@/utils/cn';

export interface StockProfileDividendProps {
  profile: CompanyProfileResponse;
}

export const StockProfileDividend: React.FC<StockProfileDividendProps> = ({ profile }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Company Profile Card */}
      <GlassCard className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
          <Building2 className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold font-display text-white">Company Profile</h2>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">{profile.about}</p>

        <div className="grid grid-cols-2 gap-3 text-xs pt-2">
          <div className="p-2.5 rounded-xl bg-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold">CEO</span>
            <div className="font-bold text-white">{profile.ceo}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Founded</span>
            <div className="font-bold text-white">{profile.founded}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Employees</span>
            <div className="font-bold text-white">{profile.employees}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Headquarters</span>
            <div className="font-bold text-white truncate">{profile.headquarters}</div>
          </div>
        </div>
      </GlassCard>

      {/* Dividend History Card */}
      <GlassCard className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
          <DollarSign className="w-5 h-5 text-purple-400" />
          <h2 className="text-base font-bold font-display text-white">Dividend History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-slate-400 uppercase">
              <tr>
                <th className="pb-3 font-semibold">Ex-Date</th>
                <th className="pb-3 font-semibold">Record Date</th>
                <th className="pb-3 font-semibold">Dividend ($)</th>
                <th className="pb-3 font-semibold text-right">Yield (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {profile.dividendHistory.map((div, idx) => (
                <tr key={idx} className="hover:bg-white/5 font-mono">
                  <td className="py-3 font-bold text-white">{div.exDate}</td>
                  <td className="py-3 text-slate-300">{div.recordDate}</td>
                  <td className="py-3 text-emerald-400 font-bold">${div.dividend}</td>
                  <td className="py-3 text-right text-purple-400 font-bold">{div.yield}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
