// src/contexts/LanguageContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import translations from '../translations';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('preferredLanguage') || 'ka';
    });

    useEffect(() => {
        localStorage.setItem('preferredLanguage', language);
        document.documentElement.lang = language;
    }, [language]);

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return key; // Return the key if translation not found
            }
        }

        return value;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
