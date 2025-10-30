'use client';
import React, { useEffect } from 'react';

const GTranslateWidget: React.FC = () => {
  useEffect(() => {
    // --- 1. Add global gtranslateSettings BEFORE script loads ---
    (window as any).gtranslateSettings = {
      default_language: "en",
      native_language_names: true,
      detect_browser_language: true,
      languages: [
        "en",   // English
        "fr",   // French
        "de",   // German
        "it",   // Italian
        "es",   // Spanish
        "pl",   // Polish
        "hi",   // Hindi
        "ar",   // Arabic
        "zh-CN",// Chinese (Simplified)
        "ja",   // Japanese
        "ko",   // Korean
        "ru",   // Russian
        "pt",   // Portuguese
        "nl",   // Dutch
        "sv",   // Swedish
        "tr",   // Turkish
        "ta",   // Tamil
        "ur",   // Urdu
        "fa",   // Persian
        "th",    // Thai
        "ar",   //Arabic
        "af",
        "st",
        "xh",
        "am",
        "ku",  //Kurdish
        "so",
        "az",  //Azerbaijaan dili
        "be", //Belarusian
        "bn",
        "bs",  //Bonsanski
        "hr",  //Croatian
        "sr",  //Serbian
        "sq", //Albanian
        "ca", //Catalan
        "cs", //Czech
        "sk", //Slovak
        "da", //Danish
        "nl", //Dutch
        "lb", //Luxembourgish
        "la", //Latin
        "el",  //Greek
        "hy", //Armenian
        "pa", //Panjabi
        "ga", //Irish
        "sw", //Swahili
        "mt", //Maltese
        "mi", //Māori
        "sm", //Samoan
        "sn", //chiShona
        "ms", //Malay
        "et", //Estonian
        "fa", //Persian
        "fi", //Finnish
        "sv", //Swedish
        "ht", //Haitian
        "mg", //Malagasy
        "id", //Indonesian
        "is", //Icelandic
        "ja", //Japanese
        "ka", //Georgian
        "km", //khmer
        "ky", //Kyrgyz
        "ko", //Korean
        "lo", //Lao
        "lv", //Latvian
        "lt", //Lithuanian
        "mk", //Macedonian
        "mn", //Mongolian
        "my", //Burmese
        "ne", //Nepali
        "no", //Norwegian
        "ny", //Chichewa
        "pt", //Portuguese
        "ps", //Pashto
        "uz", //Uzbek
        "kk", //Kazakh
        "tg", //Tajik
        "si", //Sinhalese
        "uk", //Ukranian
        "vi" //Vietnamese
      ],
      wrapper_selector: ".gtranslate_wrapper",
      alt_flags: {
        en: "usa"
      }
    };

    // --- 2. Load GTranslate script dynamically ---
    const script = document.createElement("script");
    script.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // --- 3. Cleanup ---
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="gtranslate_wrapper" style={{  position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 9999, }}></div>
  );
};

export default GTranslateWidget;
