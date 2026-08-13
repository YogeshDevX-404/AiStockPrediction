import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { useUserManagementStore } from '@/store/useUserManagementStore';
import { Users, ArrowLeft, ShieldCheck, UserX, UserCheck, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { users, fetchUsers, updateUserStatus, deleteUser } = useUserManagementStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">Platform User Management</h1>
          </div>
          <p className="text-xs text-slate-400">View user credentials, RBAC roles, subscription plans, and manage account statuses.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/admin')}>
          Console Dashboard
        </Button>
      </div>

      <GlassCard className="p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-white/10 text-slate-400 uppercase font-sans">
              <tr>
                <th className="pb-3 font-semibold">User Details</th>
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold">Plan</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right font-sans">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/5">
                  <td className="py-3 font-sans">
                    <div className="font-bold text-white">{u.fullName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{u.email} • {u.country}</div>
                  </td>
                  <td className="py-3 font-sans">
                    <Badge variant={u.role.includes('ADMIN') ? 'purple' : 'emerald'}>{u.role}</Badge>
                  </td>
                  <td className="py-3 font-sans">
                    <Badge variant={u.subscriptionPlan === 'ENTERPRISE' ? 'purple' : 'emerald'}>{u.subscriptionPlan}</Badge>
                  </td>
                  <td className="py-3 font-sans">
                    <Badge variant={u.status === 'ACTIVE' ? 'emerald' : 'red'}>{u.status}</Badge>
                  </td>
                  <td className="py-3 text-right font-sans space-x-2">
                    {u.status === 'ACTIVE' ? (
                      <button
                        onClick={() => updateUserStatus(u.id, 'SUSPENDED')}
                        className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors cursor-pointer"
                        title="Suspend User"
                      >
                        <UserX className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => updateUserStatus(u.id, 'ACTIVE')}
                        className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-colors cursor-pointer"
                        title="Activate User"
                      >
                        <UserCheck className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteUser(u.id)}
                      className="p-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors cursor-pointer"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
