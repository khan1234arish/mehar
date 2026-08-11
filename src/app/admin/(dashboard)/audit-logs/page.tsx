'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  ShieldCheck,
  RefreshCw,
  Clock,
  User,
  Database,
  Search,
} from 'lucide-react';

interface AuditItem {
  id: string;
  userId?: string | null;
  adminEmail?: string | null;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: string | null;
  ipAddress?: string | null;
  createdAt: string;
}

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/audit-logs?limit=100');
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    if (!search) return true;
    const term = search.toLowerCase();
    return (
      log.action.toLowerCase().includes(term) ||
      (log.adminEmail && log.adminEmail.toLowerCase().includes(term)) ||
      log.entityType.toLowerCase().includes(term) ||
      log.entityId.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="green">Security Trail</Badge>
            <span className="text-xs font-mono text-[#64748B]">Append-Only Forensic Log</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Administrative Audit Logs
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Every authentication event, product modification, status update, and settings change is cryptographically recorded.
          </p>
        </div>

        <Button
          onClick={fetchLogs}
          variant="outline"
          size="sm"
          icon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
        >
          Refresh Logs
        </Button>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Filter by action, admin email, entity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#0F172A] focus:outline-none focus:border-[#059669]"
          />
        </div>

        <span className="text-xs font-mono text-[#64748B]">
          Showing {filteredLogs.length} Records
        </span>
      </div>

      {/* Logs Table */}
      <div className="rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 font-bold">Timestamp</th>
                <th className="py-3.5 px-4 font-bold">Admin Actor</th>
                <th className="py-3.5 px-4 font-bold">Action</th>
                <th className="py-3.5 px-4 font-bold">Entity &amp; Target ID</th>
                <th className="py-3.5 px-4 font-bold">IP Address</th>
                <th className="py-3.5 px-4 font-bold">Event Metadata</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#64748B]">
                    Loading audit trail...
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#64748B]">
                    No audit records match the query.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#F8FAFC] transition-colors font-mono">
                    <td className="py-3.5 px-4 text-[#64748B] text-[11px] whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-[#0F172A] font-bold block truncate max-w-[180px]">
                        {log.adminEmail || 'System / Auto'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                        {log.action}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[#334155]">
                      <span className="font-bold text-[#0F172A]">{log.entityType}</span>
                      <span className="text-[#94A3B8] block text-[10px] truncate max-w-[140px]">
                        {log.entityId}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[#64748B] text-[11px]">
                      {log.ipAddress || '127.0.0.1'}
                    </td>

                    <td className="py-3.5 px-4 text-[#475569] text-[11px] max-w-xs truncate">
                      {log.metadata || '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
