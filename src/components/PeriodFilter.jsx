// src/components/PeriodFilter.jsx
import React, { useState, useContext } from 'react';
import { FaClock } from 'react-icons/fa';
import { LanguageContext } from '../contexts/LanguageContext';

const PeriodFilter = ({ onPeriodChange }) => {
    const { t } = useContext(LanguageContext);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState(t('period.all'));

    const periodOptions = [
        { label: t('period.all'), hours: null },
        { label: t('period.last1h'), hours: 1 },
        { label: t('period.last2h'), hours: 2 },
        { label: t('period.last3h'), hours: 3 },
        { label: t('period.last12h'), hours: 12 },
        { label: t('period.last24h'), hours: 24 },
        { label: t('period.last3d'), hours: 72 }
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedPeriod(option.label);
        onPeriodChange(option.hours);
        setIsOpen(false);
    };

    return (
        <div className="period-dropdown">
            <button className="period-button" onClick={toggleDropdown}>
                <span>{selectedPeriod}</span>
                <FaClock className={`period-icon ${isOpen ? 'open' : ''}`} />
            </button>
            {isOpen && (
                <div className="period-options">
                    {periodOptions.map((option, index) => (
                        <button
                            key={index}
                            className="period-option"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PeriodFilter;
