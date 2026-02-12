'use client';

import { ChevronDown, Languages } from 'lucide-react';
import { useState } from 'react';
import { useLanguage, type LanguageCode } from '@/src/context/LanguageContext';

const OPTIONS: { code: LanguageCode; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'mr', label: 'मराठी' },
  { code: 'ta', label: 'தமிழ்' },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const current = OPTIONS.find((o) => o.code === language)?.label ?? 'English';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Languages className="h-4 w-4 text-blue-600" />
        <span className="hidden sm:inline">{current}</span>
        <span className="sm:hidden">{language.toUpperCase()}</span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {open && (
        <div
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
          role="listbox"
        >
          {OPTIONS.map((opt) => (
            <button
              key={opt.code}
              type="button"
              onClick={() => {
                setLanguage(opt.code);
                setOpen(false);
              }}
              className={`flex w-full items-center px-3 py-2 text-left text-sm hover:bg-gray-50 ${
                opt.code === language ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
              role="option"
              aria-selected={opt.code === language}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

