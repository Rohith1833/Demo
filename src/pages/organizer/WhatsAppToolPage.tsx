import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { MessageSquare, Copy, Check, Download, Users, Phone, ExternalLink } from 'lucide-react';

export const WhatsAppToolPage: React.FC = () => {
  const { whatsappTemplates, applications, showToast } = useHackathon();

  const [selectedTemplateId, setSelectedTemplateId] = useState(whatsappTemplates[0]?.id || 'wa-01');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentTemplate = whatsappTemplates.find((t) => t.id === selectedTemplateId) || whatsappTemplates[0];

  // Dynamic variable interpolation for preview
  const previewText = currentTemplate.templateText
    .replace(/{{name}}/g, 'Arjun Kumar')
    .replace(/{{payment_deadline}}/g, 'October 14, 2026 at 11:59 PM')
    .replace(/{{team_name}}/g, 'Team Neural Ninjas');

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(previewText);
    setCopiedId('msg');
    showToast('success', 'WhatsApp broadcast template copied to clipboard.', 'Copied');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopyParticipantList = () => {
    const list = applications
      .slice(0, 50)
      .map((a) => `${a.name} (${a.college}) - ${a.phone}`)
      .join('\n');
    navigator.clipboard.writeText(list);
    setCopiedId('list');
    showToast('success', 'Participant directory copied to clipboard.', 'Copied');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleExportPhoneNumbers = () => {
    const phoneList = applications.map((a) => a.phone).join('\n');
    const blob = new Blob([phoneList], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NexHack2026_WhatsApp_Broadcast_Phones.txt`;
    a.click();
    showToast('success', 'Exported 1,248 phone numbers for WhatsApp group broadcast.', 'Export Ready');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#27272a]">
        <div>
          <h1 className="text-xl font-semibold text-[#fafafa] tracking-tight">WhatsApp Announcement Helper</h1>
          <p className="text-xs text-[#a1a1aa] mt-1">
            Format operational announcements, batch copy participant contact lists, and post directly to the official college WhatsApp group.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyParticipantList}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#111113] border border-[#27272a] hover:border-[#3f3f46] text-xs font-medium text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
          >
            {copiedId === 'list' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Users className="w-3.5 h-3.5" />}
            <span>Copy Member List</span>
          </button>

          <button
            onClick={handleExportPhoneNumbers}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Phone Numbers</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Template Selector List */}
        <div className="lg:col-span-5 space-y-2">
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#71717a] px-1">
            Operational Stages ({whatsappTemplates.length})
          </p>

          <div className="space-y-1.5">
            {whatsappTemplates.map((tmpl) => {
              const isSelected = tmpl.id === selectedTemplateId;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedTemplateId(tmpl.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    isSelected
                      ? 'bg-[#18181b] border-[#3b82f6]/40'
                      : 'bg-[#111113] border-[#27272a] hover:border-[#3f3f46]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-[#fafafa]">{tmpl.title}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#111113] text-[#71717a] border border-[#27272a]">
                      {tmpl.targetAudience}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#71717a] mt-1 line-clamp-1">{tmpl.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Message Preview & Quick Copy */}
        <div className="lg:col-span-7 bg-[#111113] border border-[#27272a] rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
            <div>
              <h2 className="text-sm font-medium text-[#fafafa]">{currentTemplate.title}</h2>
              <p className="text-[11px] font-mono text-[#71717a] mt-0.5">
                Target: {currentTemplate.targetAudience}
              </p>
            </div>

            <button
              onClick={handleCopyMessage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium transition-colors shadow-sm"
            >
              {copiedId === 'msg' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 'msg' ? 'Copied Message!' : 'Copy Formatted Text'}</span>
            </button>
          </div>

          {/* Formatted Phone Preview Mockup */}
          <div className="bg-[#18181b] rounded-lg border border-[#27272a] p-4 font-sans text-xs text-[#fafafa] whitespace-pre-wrap leading-relaxed select-text">
            {previewText}
          </div>

          <div className="bg-[#151517] p-3 rounded-md border border-[#27272a] text-[11px] text-[#71717a] space-y-1">
            <p className="font-medium text-[#a1a1aa]">Operational Guidance:</p>
            <p>
              College participants receive updates via the official WhatsApp announcement community. In-app push notifications and alert inboxes are intentionally disabled to maintain clear, single-channel operational communication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
