import React, { useState } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/inputs/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
import { useAuthStore } from '@/store/useAuthStore';
import { User, Mail, Phone, Globe, Lock, Trash2, Camera, ShieldCheck, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const ProfilePage: React.FC = () => {
  const { user, updateUser, logout } = useAuthStore();
  const [fullName, setFullName] = useState(user?.fullName || 'Alex Mercer');
  const [username, setUsername] = useState(user?.username || 'alexmercer');
  const [phone, setPhone] = useState(user?.phone || '+1 555 019 2834');
  const [country, setCountry] = useState(user?.country || 'United States');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Change Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Delete Account Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);

    setTimeout(() => {
      updateUser({ fullName, username, phone, country });
      setIsUpdatingProfile(false);
      toast.success('Profile details updated successfully!');
    }, 600);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    setIsChangingPassword(true);

    setTimeout(() => {
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success('Password changed successfully!');
    }, 800);
  };

  const handleDeleteAccount = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setDeleteModalOpen(false);
      toast.success('Your account has been deleted.');
      logout();
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-white/10">
        <div className="flex items-center space-x-4">
          <div className="relative group cursor-pointer">
            <Avatar src={user?.profileImage} name={user?.fullName || 'User'} size="lg" className="w-16 h-16 text-lg" />
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold font-display text-white">{user?.fullName}</h1>
              <Badge variant="purple">{user?.role || 'PRO MEMBER'}</Badge>
            </div>
            <p className="text-xs text-slate-400">@{user?.username} • {user?.email}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4 mr-1" /> Verified Trader
        </div>
      </div>

      {/* Profile Details Edit Card */}
      <GlassCard className="space-y-6">
        <div className="flex items-center space-x-3 text-primary border-b border-white/10 pb-3">
          <User className="w-5 h-5" />
          <h2 className="text-base font-bold text-white font-display">Personal Information</h2>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
              required
            />
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              value={user?.email || ''}
              disabled
              leftIcon={<Mail className="w-4 h-4" />}
              helperText="Email address cannot be changed."
            />
            <Input
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              leftIcon={<Phone className="w-4 h-4" />}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              leftIcon={<Globe className="w-4 h-4" />}
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary" size="md" isLoading={isUpdatingProfile} leftIcon={<Check className="w-4 h-4" />}>
              Save Profile
            </Button>
          </div>
        </form>
      </GlassCard>

      {/* Change Password Card */}
      <GlassCard className="space-y-6">
        <div className="flex items-center space-x-3 text-secondary border-b border-white/10 pb-3">
          <Lock className="w-5 h-5" />
          <h2 className="text-base font-bold text-white font-display">Change Password</h2>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="secondary" size="md" isLoading={isChangingPassword}>
              Update Password
            </Button>
          </div>
        </form>
      </GlassCard>

      {/* Danger Zone: Delete Account */}
      <GlassCard className="space-y-4 border-red-500/20 bg-red-500/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-red-400 font-display">Delete Account</h3>
            <p className="text-xs text-slate-400">
              Permanently delete your TradeGenius AI account, portfolio positions, and watchlists.
            </p>
          </div>
          <Button variant="danger" size="md" leftIcon={<Trash2 className="w-4 h-4" />} onClick={() => setDeleteModalOpen(true)}>
            Delete Account
          </Button>
        </div>
      </GlassCard>

      {/* Delete Account Modal */}
      <ConfirmDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Delete TradeGenius AI Account"
        message="Are you sure you want to delete your account? This action is irreversible and all your watchlists, portfolio history, and AI models settings will be permanently erased."
        confirmText="Yes, Delete My Account"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </div>
  );
};
