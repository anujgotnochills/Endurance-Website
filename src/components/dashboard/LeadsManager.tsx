import { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { useLeads, type Lead } from '@/lib/hooks';
import { Search, Download, RefreshCw, Inbox, AlertCircle, Loader2, AlertTriangle } from 'lucide-react';

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function exportToExcel(leads: Lead[]) {
  const rows = leads.map((l) => ({
    Name: l.name,
    'Phone Number': l.phone,
    Email: l.email,
    'Business / Brand': l.business || '—',
    Requirements: l.requirements,
    'Submitted At': formatDate(l.created_at),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Column widths
  worksheet['!cols'] = [
    { wch: 24 }, // Name
    { wch: 18 }, // Phone
    { wch: 32 }, // Email
    { wch: 28 }, // Business
    { wch: 50 }, // Requirements
    { wch: 22 }, // Date
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');

  const now = new Date();
  const datePart = now.toISOString().slice(0, 10);
  const timePart = now.toTimeString().slice(0, 8).replace(/:/g, '-'); // e.g., 14-30-00
  
  XLSX.writeFile(workbook, `endurance-leads-${datePart}_${timePart}.xlsx`);
}

export default function LeadsManager() {
  const { data: leads, loading, error, refetch } = useLeads();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return leads;
    const q = search.toLowerCase();
    return leads.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        (l.business && l.business.toLowerCase().includes(q))
    );
  }, [leads, search]);

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-white font-black text-xl">Form Submissions</h3>
          <p className="text-gray-500 text-sm mt-0.5">
            {leads.length} lead{leads.length !== 1 ? 's' : ''} collected
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => refetch()}
            disabled={loading}
            title="Refresh"
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-800 bg-[#0a0a0a] text-gray-400 hover:text-white hover:border-gray-600 transition-all text-sm font-medium disabled:opacity-50"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            onClick={() => exportToExcel(filtered)}
            disabled={filtered.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500 text-white text-sm font-bold hover:bg-purple-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_16px_rgba(168,85,247,0.3)]"
          >
            <Download size={15} />
            Export to Excel
          </button>
        </div>
      </div>

      {/* Auto-delete Warning Banner (Poppy & High Visibility) */}
      <div className="relative overflow-hidden flex items-start gap-3.5 p-4 rounded-xl border-2 border-amber-500/60 bg-amber-500/10 text-amber-200 text-sm shadow-[0_0_30px_rgba(245,158,11,0.15)]">
        {/* Subtle animated gradient background for extra pop */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 animate-[shimmer_3s_infinite] pointer-events-none" style={{ backgroundSize: '200% 100%' }} />
        
        <AlertTriangle size={22} className="mt-0.5 shrink-0 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
        <div className="leading-relaxed relative z-10">
          <strong className="font-black text-amber-400 tracking-wide uppercase text-[13px]">Action Required:</strong>
          <span className="block mt-0.5 text-amber-100/90">
            For data privacy and storage limits, leads are automatically and permanently deleted <strong className="text-white font-bold bg-amber-500/20 px-1 rounded">30 days</strong> after submission. Make sure to export your leads regularly!
          </span>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, phone or business..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#111] border border-gray-800 text-white text-sm placeholder:text-gray-600 outline-none focus:border-purple-500/60 transition-colors"
        />
      </div>

      {/* States */}
      {loading && (
        <div className="flex items-center justify-center py-16 text-gray-500 gap-3">
          <Loader2 size={20} className="animate-spin text-purple-500" />
          <span className="text-sm font-medium">Loading leads...</span>
        </div>
      )}

      {!loading && error && (
        <div className="flex items-center gap-3 p-4 rounded-2xl border border-red-900/40 bg-red-900/10 text-red-400 text-sm">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-600">
          <Inbox size={40} strokeWidth={1.2} />
          <div className="text-center">
            <p className="font-semibold text-gray-400">
              {search ? 'No results found' : 'No leads yet'}
            </p>
            <p className="text-sm mt-1">
              {search ? 'Try a different search term.' : 'Form submissions will appear here.'}
            </p>
          </div>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="rounded-2xl border border-gray-800 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-[#111]">
                  {['Name', 'Phone', 'Email', 'Business', 'Requirements', 'Submitted'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <tr
                    key={lead.id}
                    className={`border-b border-gray-800/60 transition-colors hover:bg-purple-500/5 ${
                      i % 2 === 0 ? 'bg-[#0a0a0a]' : 'bg-[#0d0d0d]'
                    }`}
                  >
                    <td className="px-4 py-3 font-semibold text-white whitespace-nowrap">{lead.name}</td>
                    <td className="px-4 py-3 text-gray-300 whitespace-nowrap">
                      <a href={`tel:${lead.phone}`} className="hover:text-purple-400 transition-colors">
                        {lead.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      <a href={`mailto:${lead.email}`} className="hover:text-purple-400 transition-colors">
                        {lead.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{lead.business || '—'}</td>
                    <td className="px-4 py-3 text-gray-400 max-w-[240px]">
                      <span className="line-clamp-2 block">{lead.requirements}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">
                      {formatDate(lead.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-gray-800">
            {filtered.map((lead) => (
              <div key={lead.id} className="p-4 space-y-2 bg-[#0a0a0a] hover:bg-purple-500/5 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-white">{lead.name}</span>
                  <span className="text-[10px] text-gray-600 mt-0.5 shrink-0">{formatDate(lead.created_at)}</span>
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <a href={`tel:${lead.phone}`} className="text-gray-300 hover:text-purple-400 transition-colors">
                    📞 {lead.phone}
                  </a>
                  <a href={`mailto:${lead.email}`} className="text-gray-300 hover:text-purple-400 transition-colors break-all">
                    ✉️ {lead.email}
                  </a>
                  {lead.business && (
                    <span className="text-gray-400">🏢 {lead.business}</span>
                  )}
                </div>
                <p className="text-gray-500 text-xs leading-relaxed border-t border-gray-800 pt-2">
                  {lead.requirements}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Count badge */}
      {!loading && filtered.length > 0 && (
        <p className="text-gray-600 text-xs text-right">
          Showing {filtered.length} of {leads.length} lead{leads.length !== 1 ? 's' : ''}
          {search && ` matching "${search}"`}
        </p>
      )}
    </div>
  );
}
