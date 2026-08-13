import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { useOrderStore } from '@/store/useOrderStore';
import { ShoppingCart, ArrowLeft, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PaperOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { orders, fetchOrders, cancelOrder } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">Simulated Order Book</h1>
          </div>
          <p className="text-xs text-slate-400">Order queue status displaying Pending, Executed, and Cancelled virtual orders.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/paper-trading')}>
          Trading Hub
        </Button>
      </div>

      <GlassCard className="p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-white/10 text-slate-400 uppercase font-sans">
              <tr>
                <th className="pb-3 font-semibold">Symbol</th>
                <th className="pb-3 font-semibold">Side</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Quantity</th>
                <th className="pb-3 font-semibold">Price ($)</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right font-sans">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-white/5">
                  <td className="py-3 font-bold text-white">${ord.symbol}</td>
                  <td className="py-3 font-sans">
                    <Badge variant={ord.side === 'BUY' ? 'emerald' : 'red'}>{ord.side}</Badge>
                  </td>
                  <td className="py-3 text-slate-300 font-bold">{ord.orderType}</td>
                  <td className="py-3 text-slate-300">{ord.quantity}</td>
                  <td className="py-3 text-white font-bold">${ord.price}</td>
                  <td className="py-3 font-sans">
                    <Badge variant={ord.status === 'EXECUTED' ? 'emerald' : ord.status === 'PENDING' ? 'purple' : 'red'}>
                      {ord.status}
                    </Badge>
                  </td>
                  <td className="py-3 text-right font-sans">
                    {ord.status === 'PENDING' && (
                      <button
                        onClick={() => cancelOrder(ord.id)}
                        className="p-1 text-slate-400 hover:text-red-400 cursor-pointer"
                        title="Cancel Order"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
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
