// src/components/LanguageSwitcher.jsx
import React, { useState, useContext } from 'react';
import { FaGlobe } from 'react-icons/fa';
import { LanguageContext } from '../../contexts/LanguageContext.jsx';

const LanguageSwitcher = () => {
    const { language, setLanguage } = useContext(LanguageContext);
    const [showDropdown, setShowDropdown] = useState(false);

    const languages = [
        { code: 'ka', name: 'ქართული' },
        { code: 'en', name: 'English' },
        { code: 'ru', name: 'Русский' }
    ];

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const changeLanguage = (langCode) => {
        setLanguage(langCode);
        setShowDropdown(false);
    };

    return (
        <div className="language-switcher-container">
            <button className="language-switcher-button" onClick={toggleDropdown}>
                <FaGlobe className="language-icon" />
                <span>{languages.find(lang => lang.code === language)?.name || 'ქართული'}</span>
            </button>

            {showDropdown && (
                <div className="language-dropdown">
                    {languages.map(lang => (
                        <button
                            key={lang.code}
                            className={`language-option ${language === lang.code ? 'active' : ''}`}
                            onClick={() => changeLanguage(lang.code)}
                        >
                            {lang.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
