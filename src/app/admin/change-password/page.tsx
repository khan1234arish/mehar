'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Lock, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function ChangePasswordPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Get CSRF cookie value
      const csrfMatch = document.cookie.match(/(?:^|;\s*)mehar_admin_csrf=([^;]+)/);
      const csrfToken = csrfMatch ? decodeURIComponent(csrfMatch[1]) : '';

      const res = await fetch('/api/admin/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to change password. Please check requirements.');
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin');
      }, 1500);
    } catch {
      setError('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-[#E6EAF0] relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#39D353]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4 relative z-10">
        <div className="w-36 sm:w-44 h-24 sm:h-28 relative mx-auto">
          <Image
            src="/assets/logo/mehar-logo.png"
            alt="MEHAR"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-300">
          <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
          <span className="text-xs font-mono font-bold">Security Action Required</span>
        </div>

        <h1 className="text-2xl font-extrabold text-[#E6EAF0] tracking-tight">
          Update Your Password
        </h1>
        <p className="text-xs text-[#A3AAB5]">
          For security compliance, please choose a strong password before continuing to the administration portal.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#11161D] py-8 px-6 sm:px-10 rounded-3xl border border-[#1E2633] shadow-2xl">
          {success ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-[#161C24] border border-[#39D353]/30 flex items-center justify-center text-[#39D353] mx-auto shadow-[0_0_15px_rgba(57,211,83,0.2)]">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-base font-bold text-[#39D353]">Password Updated Successfully</h2>
              <p className="text-xs text-[#A3AAB5]">
                Your new credentials are now active. Redirecting you to the CMS dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{error}</p>
                </div>
              )}

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
                  Current Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs focus:outline-none focus:border-[#39D353] focus:ring-1 focus:ring-[#39D353] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#64748B] hover:text-[#E6EAF0] focus:outline-none focus:text-[#39D353] transition-colors"
                    aria-label={showCurrentPassword ? 'Hide current password' : 'Show current password'}
                    title={showCurrentPassword ? 'Hide current password' : 'Show current password'}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Eye className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    placeholder="Min 10 chars (A-Z, a-z, 0-9, special)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs focus:outline-none focus:border-[#39D353] focus:ring-1 focus:ring-[#39D353] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#64748B] hover:text-[#E6EAF0] focus:outline-none focus:text-[#39D353] transition-colors"
                    aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                    title={showNewPassword ? 'Hide new password' : 'Show new password'}
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Eye className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-mono font-bold text-[#A3AAB5] block">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="Re-type new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#161C24] border border-[#1E2633] text-[#E6EAF0] text-xs focus:outline-none focus:border-[#39D353] focus:ring-1 focus:ring-[#39D353] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#64748B] hover:text-[#E6EAF0] focus:outline-none focus:text-[#39D353] transition-colors"
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    title={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Eye className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Requirements Guide */}
              <div className="p-3.5 rounded-xl bg-[#161C24] border border-[#1E2633] text-[11px] text-[#A3AAB5] space-y-1 font-mono">
                <p className="font-bold text-[#E6EAF0]">Password Requirements:</p>
                <p>• At least 10 characters long</p>
                <p>• Contains uppercase and lowercase letters</p>
                <p>• Contains at least 1 number and 1 special symbol</p>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full justify-center"
                disabled={loading}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {loading ? 'Securing Account...' : 'Set Password & Enter CMS'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
