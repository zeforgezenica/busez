'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'bs', name: 'Bosanski', flag: 'https://flagcdn.com/w40/ba.png' },
  { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'de', name: 'Deutsch', flag: 'https://flagcdn.com/w40/de.png' },
  { code: 'hr', name: 'Hrvatski', flag: 'https://flagcdn.com/w40/hr.png' }, 
  { code: 'sr', name: 'Srpski', flag: 'https://flagcdn.com/w40/rs.png' },   
  { code: 'tr', name: 'Türkçe', flag: 'https://flagcdn.com/w40/tr.png' },
  { code: 'ar', name: 'العربية', flag: 'https://flagcdn.com/w40/sa.png' },
  { code: 'fr', name: 'Français', flag: 'https://flagcdn.com/w40/fr.png' },
  { code: 'sv', name: 'Svenska', flag: 'https://flagcdn.com/w40/se.png' }, 
  { code: 'it', name: 'Italiano', flag: 'https://flagcdn.com/w40/it.png' }, 
];


const GTranslateWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedLangCode = localStorage.getItem('user_lang');
    const savedLang = languages.find(l => l.code === savedLangCode) || languages[0];
    setCurrentLanguage(savedLang);

    (window as any).gtranslateSettings = {
      default_language: 'bs',
      languages: ['bs', 'en', 'de', 'hr', 'sr', 'tr', 'ar', 'fr', 'sv', 'it'], 
      wrapper_selector: '.gtranslate_hidden',
      native_language_names: true,
};

    if (!document.getElementById('gtranslate-script')) {
      const script = document.createElement('script');
      script.id = 'gtranslate-script';
      script.src = 'https://cdn.gtranslate.net/widgets/latest/dwf.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (savedLangCode && savedLangCode !== 'bs') {
          setTimeout(() => {
            const gtranslateFn = (window as any).doGTranslate;
            if (gtranslateFn) gtranslateFn(`bs|${savedLangCode}`);
          }, 500); 
        }
      };
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (language: Language) => {
    setCurrentLanguage(language);
    setIsOpen(false);
    
    localStorage.setItem('user_lang', language.code);

    const gtranslateFn = (window as any).doGTranslate;
    if (gtranslateFn) {
      gtranslateFn(`bs|${language.code}`);
    }
  };

  if (!currentLanguage) return <div className="min-w-[140px] h-[36px] bg-background/20 rounded-lg animate-pulse" />;

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-1.5 text-sm font-medium text-foreground 
                   border border-white/40 rounded-lg hover:border-white transition-all 
                   bg-background/20 backdrop-blur-sm min-w-[140px] h-10"
      >
        <img 
          src={currentLanguage.flag} 
          alt={currentLanguage.name} 
          className="w-5 h-3.5 object-cover rounded-sm shadow-sm"
        />
        <span className="flex-1 text-left">{currentLanguage.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-2xl z-[9999] overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang)}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-primary/10 transition-colors text-sm ${
                currentLanguage.code === lang.code ? 'bg-primary/5 text-primary font-semibold' : 'text-foreground'
              }`}
            >
              <img src={lang.flag} alt={lang.name} className="w-5 h-3.5 object-cover rounded-sm" />
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
      <div className="gtranslate_hidden" style={{ display: 'none' }}></div>
    </div>
  );
};

export default GTranslateWidget;