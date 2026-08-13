import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Check, X } from 'lucide-react';

export const PermissionMatrixTable: React.FC = () => {
  const roles = ['SUPER_ADMIN', 'ADMIN', 'MODERATOR', 'SUPPORT', 'VIEWER'];
  const permissions = [
    { name: 'User Management (Create/Edit/Delete)', access: [true, true, false, false, false] },
    { name: 'Role Assignment & RBAC Configuration', access: [true, true, false, false, false] },
    { name: 'API Provider Failover Controls', access: [true, true, false, false, false] },
    { name: 'System Health & Security Audit Logs', access: [true, true, true, true, true] },
    { name: 'Feature Flag Toggles & Announcements', access: [true, true, true, false, false] },
  ];

  return (
    <GlassCard className="p-5 space-y-4">
      <h2 className="text-base font-bold text-white font-display border-b border-white/10 pb-3">RBAC Permission Matrix Grid</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="border-b border-white/10 text-slate-400 uppercase font-sans">
            <tr>
              <th className="pb-3 font-semibold">Permission Capability</th>
              {roles.map((r) => (
                <th key={r} className="pb-3 font-semibold text-center">{r}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {permissions.map((p) => (
              <tr key={p.name} className="hover:bg-white/5">
                <td className="py-3 font-bold text-white font-sans">{p.name}</td>
                {p.access.map((hasAccess, idx) => (
                  <td key={idx} className="py-3 text-center">
                    {hasAccess ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-500/20 text-slate-500">
                        <X className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};
