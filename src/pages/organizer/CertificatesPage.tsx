import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { FileCheck, Download, Eye, Award, CheckCircle2, Shield, X, Sparkles } from 'lucide-react';

export const CertificatesPage: React.FC = () => {
  const { certificateCategories, generateCertificates, showToast } = useHackathon();

  const [selectedIds, setSelectedIds] = useState<string[]>(['cert-part', 'cert-final', 'cert-win']);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const toggleCategory = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    generateCertificates(selectedIds);
    setIsGenerated(true);
  };

  const handleDownloadSample = () => {
    showToast('success', 'Sample PDF downloaded for Arjun Kumar [NXH-P-0421].', 'Download Complete');
  };

  const handleDownloadAll = () => {
    showToast('success', 'Preparing batch ZIP bundle containing 421 participant certificates.', 'Export Initialized');
  };

  const totalRecipients = certificateCategories
    .filter((c) => selectedIds.includes(c.id))
    .reduce((sum, c) => sum + c.count, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#27272a]">
        <div>
          <h1 className="text-xl font-semibold text-[#fafafa] tracking-tight">Certificate Generator</h1>
          <p className="text-xs text-[#a1a1aa] mt-1">
            Generate and dispatch verifiable institutional digital certificates with signature verification hashes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#111113] border border-[#27272a] hover:border-[#3f3f46] text-xs font-medium text-[#fafafa] transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Certificate</span>
          </button>

          <button
            onClick={handleGenerate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium transition-colors shadow-sm"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Generate Certificates ({totalRecipients})</span>
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {certificateCategories.map((cat) => {
          const isSelected = selectedIds.includes(cat.id);
          return (
            <div
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                isSelected
                  ? 'bg-[#18181b] border-[#3b82f6]/40'
                  : 'bg-[#111113] border-[#27272a] hover:border-[#3f3f46]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xs font-medium text-[#fafafa]">{cat.name}</h3>
                  <p className="text-[11px] text-[#71717a] mt-0.5">{cat.description}</p>
                </div>
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center text-[10px] border ${
                    isSelected
                      ? 'bg-[#2563eb] border-[#2563eb] text-white'
                      : 'border-[#27272a] text-transparent'
                  }`}
                >
                  ✓
                </div>
              </div>

              <div className="mt-3 flex items-baseline justify-between pt-2 border-t border-[#18181b]">
                <span className="text-[10px] font-mono text-[#71717a] uppercase">Recipients</span>
                <span className="text-sm font-semibold text-[#fafafa] font-mono">{cat.count}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Generation Status & Batch Downloads */}
      {isGenerated && (
        <div className="bg-[#111113] border border-emerald-500/30 rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-medium text-[#fafafa]">
                  {totalRecipients} Certificates Generated Successfully
                </h3>
                <p className="text-xs text-[#a1a1aa] mt-0.5">
                  Signed with SHA-256 certificate fingerprints and stored in archival repository.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadSample}
                className="px-3 py-1.5 rounded-md bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] text-xs font-medium text-[#fafafa] transition-colors"
              >
                Download Sample
              </button>
              <button
                onClick={handleDownloadAll}
                className="px-3 py-1.5 rounded-md bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium transition-colors shadow-sm"
              >
                Download All (.ZIP)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111113] border border-[#27272a] rounded-lg max-w-2xl w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#3b82f6]" />
                <span className="text-xs font-medium text-[#fafafa]">Certificate Template Preview</span>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="text-[#71717a] hover:text-[#fafafa]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Clean Institutional Certificate Canvas */}
            <div className="bg-[#fafafa] text-[#09090b] p-8 rounded border border-zinc-300 space-y-6 text-center select-text font-serif">
              <div className="space-y-1">
                <p className="text-[11px] font-sans tracking-widest uppercase text-zinc-500 font-semibold">
                  XYZ INSTITUTE OF TECHNOLOGY
                </p>
                <p className="text-[10px] font-sans text-zinc-400">
                  Bengaluru, Karnataka • NAAC A++ Accredited
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 pt-3">
                  CERTIFICATE OF PARTICIPATION
                </h2>
              </div>

              <div className="space-y-2 text-sm text-zinc-700 max-w-lg mx-auto">
                <p className="text-xs uppercase tracking-wider text-zinc-500 font-sans">This certifies that</p>
                <p className="text-xl font-bold text-zinc-950 font-sans tracking-wide">
                  ARJUN KUMAR
                </p>
                <p className="text-xs leading-relaxed text-zinc-600 font-sans">
                  has actively participated in <strong>NexHack 2026</strong>, a 24-hour national technical hackathon conducted on 18–19 April 2026.
                </p>
                <div className="text-xs font-sans text-zinc-600 pt-2">
                  <p>Team: <strong>Neural Ninjas</strong></p>
                  <p>Problem Track: <strong>AI-Based Campus Navigation (PS-01)</strong></p>
                </div>
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-200 text-center font-sans text-[11px] text-zinc-600">
                <div>
                  <div className="h-8 border-b border-zinc-400 w-28 mx-auto mb-1"></div>
                  <p className="font-semibold text-zinc-800">Dr. K. S. Sharma</p>
                  <p className="text-[10px] text-zinc-500">Principal</p>
                </div>
                <div>
                  <div className="h-8 border-b border-zinc-400 w-28 mx-auto mb-1"></div>
                  <p className="font-semibold text-zinc-800">Prof. Ananya Rao</p>
                  <p className="text-[10px] text-zinc-500">Faculty Coordinator</p>
                </div>
                <div>
                  <div className="h-8 border-b border-zinc-400 w-28 mx-auto mb-1"></div>
                  <p className="font-semibold text-zinc-800">Siddharth V.</p>
                  <p className="text-[10px] text-zinc-500">Hackathon Lead</p>
                </div>
              </div>

              <div className="pt-2 text-[9px] font-mono text-zinc-400">
                Verification Hash: 0x8f2a9c14e5b7218d • Issued by HackFlow
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-3 py-1.5 rounded-md bg-[#18181b] border border-[#27272a] text-xs font-medium text-[#fafafa]"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
