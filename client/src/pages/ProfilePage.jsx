import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { User, Mail, Shield, Key, Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const ProfilePage = () => {
  const { user, refreshProfile, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;

    setIsSubmittingPassword(true);
    setPasswordMsg(null);
    setPasswordErr(null);

    try {
      const res = await api.put('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      if (res.data.success) {
        setPasswordMsg('Password changed successfully.');
        setCurrentPassword('');
        setNewPassword('');
      }
    } catch (err) {
      setPasswordErr(err.response?.data?.message || 'Failed to update password');
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  const quota = user?.dailyAiQuota || { used: 0, limit: 10, remaining: 10 };
  const quotaPercent = Math.min(100, Math.round((quota.used / quota.limit) * 100));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Account & Profile
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Manage your credentials, daily AI quotas, and platform preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column: User Identity Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-surface-light-border dark:border-surface-dark-border p-6 shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-bold text-2xl flex items-center justify-center border-2 border-brand-500/20">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{user?.name}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{user?.email}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 space-y-1">
              <div>Role: <span className="font-semibold text-slate-700 dark:text-slate-300 uppercase">{user?.role || 'user'}</span></div>
              <div>Member since: <span className="font-semibold text-slate-700 dark:text-slate-300">{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</span></div>
            </div>
            <button
              onClick={logout}
              className="w-full py-2 px-3 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>

          {/* Daily AI Quota Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-surface-light-border dark:border-surface-dark-border p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider font-mono text-slate-500">
                Daily AI Quota
              </span>
              <Sparkles className="w-4 h-4 text-brand-500" />
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-bold text-2xl text-slate-900 dark:text-white">{quota.remaining}</span>
                <span className="text-xs text-slate-500">of {quota.limit} sessions left</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-brand-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${100 - quotaPercent}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Resets daily at midnight UTC to maintain 100% free-tier access.
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Settings Form */}
        <div className="md:col-span-2 space-y-6">
          {/* Security & Password */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-surface-light-border dark:border-surface-dark-border p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Security & Password</h3>
                <p className="text-xs text-slate-500">Update your account password</p>
              </div>
            </div>

            {passwordMsg && (
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> {passwordMsg}
              </div>
            )}
            {passwordErr && (
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> {passwordErr}
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                  New Password (min 6 characters)
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingPassword}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmittingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
