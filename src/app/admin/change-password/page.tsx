'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Lock, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function ChangePasswordPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        <div className="w-48 h-12 relative mx-auto">
          <Image
            src="/assets/logo/mehar-logo.svg"
            alt="MEHAR"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B]">
          <ShieldAlert className="w-3.5 h-3.5 text-[#DC2626]" />
          <span className="text-xs font-mono font-bold">Security Action Required</span>
        </div>

        <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
          Update Your Password
        </h1>
        <p className="text-xs text-[#64748B]">
          For security compliance, please choose a strong password before continuing to the administration portal.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#E2E8F0] shadow-sm">
          {success ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#059669] mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-base font-bold text-[#064E3B]">Password Updated Successfully</h2>
              <p className="text-xs text-[#047857]">
                Your new credentials are now active. Redirecting you to the CMS dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] flex items-start gap-2.5 text-xs text-[#991B1B]">
                  <AlertTriangle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{error}</p>
                </div>
              )}

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-mono font-bold text-[#334155] block">
                  Current Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-mono font-bold text-[#334155] block">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="Min 10 chars (A-Z, a-z, 0-9, special)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-mono font-bold text-[#334155] block">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="Re-type new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-colors"
                  />
                </div>
              </div>

              {/* Password Requirements Guide */}
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] text-[#64748B] space-y-1 font-mono">
                <p className="font-bold text-[#334155]">Password Requirements:</p>
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
