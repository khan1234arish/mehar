'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Lock, Mail, AlertTriangle, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';

export default function LoginFormClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Authentication failed. Please check your credentials.');
        return;
      }

      // If forced password change is active, redirect to change password screen
      if (data.mustChangePassword) {
        router.push('/admin/change-password');
      } else {
        router.push(redirectPath);
        router.refresh();
      }
    } catch {
      setError('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      {error && (
        <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] flex items-start gap-2.5 text-xs text-[#991B1B]">
          <AlertTriangle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
          <p className="leading-relaxed">{error}</p>
        </div>
      )}

      <div className="space-y-1.5 text-left">
        <label className="text-xs font-mono font-bold text-[#334155] block">
          Admin Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="admin@yourdomain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-colors"
          />
        </div>
      </div>

      <div className="space-y-1.5 text-left">
        <label className="text-xs font-mono font-bold text-[#334155] block">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
            <Lock className="w-4 h-4" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            autoComplete="current-password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#94A3B8] hover:text-[#0F172A] focus:outline-none focus:text-[#059669] transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Eye className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>


      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full justify-center"
        disabled={loading}
        icon={<ArrowRight className="w-4 h-4" />}
      >
        {loading ? 'Authenticating...' : 'Sign In to Admin Portal'}
      </Button>

      <div className="pt-2 text-center">
        <span className="text-[11px] text-[#64748B] font-mono flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
          Protected by Brute-Force Rate Limiting &amp; Session Encryption
        </span>
      </div>
    </form>
  );
}
