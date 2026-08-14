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
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-600 dark:text-red-300">
          <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-xs font-mono font-bold text-theme-secondary block">
          Admin Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-theme-muted">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            required
            autoComplete="username"
            placeholder="admin@lawad.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-mono font-bold text-theme-secondary block">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-theme-muted">
            <Lock className="w-4 h-4" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            autoComplete="current-password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-theme-elevated border border-theme-border text-theme-primary text-xs placeholder-theme-muted focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green transition-colors font-mono"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-theme-muted hover:text-theme-primary transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full justify-center"
          disabled={loading}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          {loading ? 'Authenticating...' : 'Sign In to Management Console'}
        </Button>
      </div>

      <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] font-mono text-theme-muted">
        <ShieldCheck className="w-3.5 h-3.5 text-theme-green" />
        <span>B2B End-to-End Encrypted Session</span>
      </div>
    </form>
  );
}
