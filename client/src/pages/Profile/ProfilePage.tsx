import React, { useState, useRef } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/inputs/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
import { useAuthStore } from '@/store/useAuthStore';
import { AuthService } from '@/services/api';
import { User, Mail, Phone, Globe, Lock, Trash2, Camera, ShieldCheck, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const ProfilePage: React.FC = () => {
  const { user, updateUser, logout } = useAuthStore();
  const [fullName, setFullName] = useState(user?.fullName || 'Alex Mercer');
  const [username, setUsername] = useState(user?.username || 'alexmercer');
  const [phone, setPhone] = useState(user?.phone || '');
  const [country, setCountry] = useState(user?.country || '');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Profile Image State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Change Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Delete Account Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      const res = await AuthService.updateProfile({ fullName, phone, country });
      if (res.data?.success || res.data?.data) {
        updateUser({ fullName, phone, country });
        toast.success('Profile details updated successfully!');
      } else {
        toast.error(res.data?.message || 'Update failed');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error updating profile');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB');
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('Only JPG, PNG and WEBP formats are allowed');
      return;
    }

    setIsUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        try {
          const res = await AuthService.updateProfile({ profileImage: base64String });
          if (res.data?.success || res.data?.data) {
            setProfileImage(base64String);
            updateUser({ profileImage: base64String });
            toast.success('Profile picture updated!');
          } else {
            toast.error(res.data?.message || 'Upload failed');
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || 'Error uploading image');
        } finally {
          setIsUploadingImage(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setIsUploadingImage(false);
      toast.error('Failed to read file');
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemovePhoto = async () => {
    setIsUploadingImage(true);
    try {
      const res = await AuthService.updateProfile({ profileImage: '' });
      if (res.data?.success || res.data?.data) {
        setProfileImage('');
        updateUser({ profileImage: '' });
        toast.success('Profile picture removed!');
      } else {
        toast.error(res.data?.message || 'Remove failed');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error removing image');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    setIsChangingPassword(true);

    try {
      const res = await AuthService.changePassword({ oldPassword: currentPassword, newPassword });
      if (res.data?.success) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        toast.success('Password changed successfully!');
      } else {
        toast.error(res.data?.message || 'Password change failed');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error changing password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await AuthService.deleteAccount();
      setDeleteModalOpen(false);
      toast.success('Your account has been deleted.');
      logout();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error deleting account');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-border/50">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center justify-center space-y-1 relative w-16">
            <div className={`relative group cursor-pointer ${isUploadingImage ? 'opacity-50' : ''}`} onClick={handleImageClick}>
              <Avatar src={profileImage} name={user?.fullName || 'User'} size="lg" className="w-16 h-16 text-lg" />
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-5 h-5 text-foreground" />
              </div>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/jpeg, image/png, image/webp" 
              onChange={handleFileChange} 
            />

            {profileImage && (
              <button 
                onClick={handleRemovePhoto} 
                disabled={isUploadingImage}
                className="absolute -bottom-4 whitespace-nowrap text-[9px] text-red-600 dark:text-red-400 hover:text-red-300 font-bold transition-colors cursor-pointer"
              >
                Remove Photo
              </button>
            )}
          </div>
          <div className="pl-2">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold font-display text-foreground">{user?.fullName}</h1>
              <Badge variant="purple">{user?.role || 'PRO MEMBER'}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">@{user?.username} • {user?.email}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4 mr-1" /> Verified Trader
        </div>
      </div>

      {/* Profile Details Edit Card */}
      <GlassCard className="space-y-6">
        <div className="flex items-center space-x-3 text-primary border-b border-border/50 pb-3">
          <User className="w-5 h-5" />
          <h2 className="text-base font-bold text-foreground font-display">Personal Information</h2>
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
        <div className="flex items-center space-x-3 text-secondary border-b border-border/50 pb-3">
          <Lock className="w-5 h-5" />
          <h2 className="text-base font-bold text-foreground font-display">Change Password</h2>
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
            <h3 className="text-base font-bold text-red-600 dark:text-red-400 font-display">Delete Account</h3>
            <p className="text-xs text-muted-foreground">
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
