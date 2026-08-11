'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { COMPANY_INFO } from '@/data/companyInfo';
import {
  MessageSquare,
  X,
  Send,
  ArrowRight,
  ShieldCheck,
  Cpu,
  FileSpreadsheet,
  PhoneCall,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: { label: string; action: () => void }[];
  actionLink?: { href: string; label: string };
}

export default function MeharAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initWelcome();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initWelcome = () => {
    setMessages([
      {
        id: 'welcome-1',
        sender: 'bot',
        text: `Welcome to the MEHAR B2B Commercial & Technical Desk (Lawad Infrastructure Pvt. Ltd.). How can we assist your battery procurement today?`,
        options: [
          { label: '🔍 Scope Battery Requirements', action: () => handleAction('finder') },
          { label: '⚙️ Custom OEM / ODM Pack', action: () => handleAction('oem') },
          { label: '📦 Bulk Quotation (RFQ)', action: () => handleAction('rfq') },
          { label: '🤝 Dealership Inquiry', action: () => handleAction('dealer') },
          { label: '📞 Contact Sales Engineer', action: () => handleAction('contact') },
        ],
      },
    ]);
  };

  const handleAction = (type: string) => {
    if (type === 'finder') {
      setMessages((prev) => [
        ...prev,
        { id: String(Date.now()), sender: 'user', text: 'I want to scope my battery requirements.' },
        {
          id: String(Date.now() + 1),
          sender: 'bot',
          text: `You can use our interactive Battery Requirements Finder to capture your voltage, capacity, dimension, and duty cycle parameters. Our engineering team will evaluate the optimal solution.`,
          actionLink: { href: '/finder', label: 'Launch Battery Finder Wizard' },
        },
      ]);
    } else if (type === 'oem') {
      setMessages((prev) => [
        ...prev,
        { id: String(Date.now()), sender: 'user', text: 'I need a custom OEM / ODM battery pack.' },
        {
          id: String(Date.now() + 1),
          sender: 'bot',
          text: `We collaborate with OEMs on tailored form-factors, custom BMS telemetry (CAN/RS485), and specific enclosure footprints. All custom designs require engineering confirmation.`,
          actionLink: { href: '/rfq', label: 'Submit Custom OEM Specifications' },
        },
      ]);
    } else if (type === 'rfq') {
      setMessages((prev) => [
        ...prev,
        { id: String(Date.now()), sender: 'user', text: 'I would like to submit a B2B RFQ.' },
        {
          id: String(Date.now() + 1),
          sender: 'bot',
          text: `Please use our structured B2B RFQ Builder to specify batch quantities, target electrical parameters, and delivery timelines.`,
          actionLink: { href: '/rfq', label: 'Open B2B RFQ Builder' },
        },
      ]);
    } else if (type === 'dealer') {
      setMessages((prev) => [
        ...prev,
        { id: String(Date.now()), sender: 'user', text: 'Tell me about dealership and distribution partnerships.' },
        {
          id: String(Date.now() + 1),
          sender: 'bot',
          text: `MEHAR partners with authorized commercial battery distributors across India. Please provide your business details through our commercial desk.`,
          actionLink: { href: '/contact?type=dealership', label: 'Apply for Dealership / Distribution' },
        },
      ]);
    } else if (type === 'contact') {
      setMessages((prev) => [
        ...prev,
        { id: String(Date.now()), sender: 'user', text: 'I want to connect with a sales engineer.' },
        {
          id: String(Date.now() + 1),
          sender: 'bot',
          text: `You can reach our sales desk directly via email at ${COMPANY_INFO.salesEmail} or connect instantly on WhatsApp.`,
          actionLink: {
            href: `https://wa.me/${COMPANY_INFO.whatsappDesk.replace(/[^0-9]/g, '')}?text=Hello%2C%20I%20am%20inquiring%20about%20MEHAR%20B2B%20battery%20procurement.`,
            label: 'Open WhatsApp Business Chat',
          },
        },
      ]);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');

    const newMsgId = String(Date.now());
    const lower = userText.toLowerCase();

    let botResponse = `Thank you for sharing your requirement. All battery configurations, chemistry selections, and custom pack specifications undergo technical evaluation by Lawad Infrastructure engineers.`;
    let actionLink: { href: string; label: string } | undefined = { href: '/rfq', label: 'Submit Formal RFQ' };

    if (lower.includes('quote') || lower.includes('price') || lower.includes('rfq') || lower.includes('cost')) {
      botResponse = `For official B2B wholesale quotation, please submit your target parameters and batch volumes via our RFQ Builder. Our commercial desk will prepare an official proposal.`;
      actionLink = { href: '/rfq', label: 'Go to RFQ Builder' };
    } else if (lower.includes('custom') || lower.includes('oem') || lower.includes('bms') || lower.includes('design')) {
      botResponse = `For custom pack development, please specify your required voltage envelope, dimensional space constraints, and continuous discharge currents.`;
      actionLink = { href: '/rfq', label: 'Open Custom Pack Intake' };
    } else if (lower.includes('spec') || lower.includes('voltage') || lower.includes('capacity') || lower.includes('ah')) {
      botResponse = `Verified client catalogue data is currently in preparation. You can capture and submit your target electrical requirements through our Finder Wizard.`;
      actionLink = { href: '/finder', label: 'Open Battery Requirements Finder' };
    } else if (lower.includes('phone') || lower.includes('contact') || lower.includes('whatsapp') || lower.includes('call')) {
      botResponse = `You can connect directly with our technical sales engineers via WhatsApp or submit a callback request.`;
      actionLink = { href: '/contact', label: 'View Contact Details' };
    }

    setMessages((prev) => [
      ...prev,
      { id: newMsgId, sender: 'user', text: userText },
      {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: botResponse,
        actionLink,
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#059669] text-white shadow-xl hover:bg-[#047857] hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#059669]/30 group"
          aria-label="Open MEHAR Battery Assistant"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
          </div>
          <span className="text-xs font-bold font-mono tracking-wide">
            MEHAR Assistant
          </span>
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] max-h-[85vh] bg-white border border-[#CBD5E1] rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#059669]">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                  MEHAR Battery Assistant
                  <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                </h3>
                <p className="text-[10px] text-[#64748B] font-mono">
                  Lawad Infrastructure B2B Desk
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => initWelcome()}
                title="Reset Chat"
                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] ${
                    msg.sender === 'user'
                      ? 'bg-[#059669] text-white rounded-br-none'
                      : 'bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                  {/* Action Link Button */}
                  {msg.actionLink && (
                    <div className="mt-3 pt-2 border-t border-[#CBD5E1]/40">
                      <Link
                        href={msg.actionLink.href}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669] bg-white px-3 py-1.5 rounded-lg border border-[#CBD5E1] hover:bg-[#ECFDF5] transition-colors"
                      >
                        <span>{msg.actionLink.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Quick Action Options */}
                {msg.options && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={opt.action}
                        className="px-2.5 py-1 rounded-lg bg-white border border-[#CBD5E1] text-[11px] font-semibold text-[#0F172A] hover:border-[#059669] hover:bg-[#ECFDF5] hover:text-[#065F46] transition-colors text-left"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-[#F8FAFC] border-t border-[#E2E8F0]">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your battery requirement..."
                className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-[#059669] text-white hover:bg-[#047857] transition-colors disabled:opacity-50"
                disabled={!inputValue.trim()}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-1.5 text-center">
              <span className="text-[10px] text-[#64748B] font-mono">
                Official B2B Desk • Engineering Confirmation Required
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
