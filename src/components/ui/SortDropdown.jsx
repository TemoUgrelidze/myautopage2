import React, { useState, useContext } from 'react';
import { FaSort } from 'react-icons/fa';
import { LanguageContext } from '../../contexts/LanguageContext.jsx';

const SortDropdown = ({ onSort }) => {
    const { t } = useContext(LanguageContext);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(t('sort.default'));

    const sortOptions = [
        { label: t('sort.dateAsc'), field: 'date', order: 'desc' },
        { label: t('sort.dateDesc'), field: 'date', order: 'asc' },
        { label: t('sort.priceAsc'), field: 'price', order: 'desc' },
        { label: t('sort.priceDesc'), field: 'price', order: 'asc' },
        { label: t('sort.mileageAsc'), field: 'mileage', order: 'desc' },
        { label: t('sort.mileageDesc'), field: 'mileage', order: 'asc' }
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option.label);
        onSort({ field: option.field, order: option.order });
        setIsOpen(false);
    };

    return (
        <div className="sort-dropdown">
            <button className="sort-button" onClick={toggleDropdown}>
                <span>{selectedOption}</span>
                <FaSort className={`sort-icon ${isOpen ? 'open' : ''}`} />
            </button>
            {isOpen && (
                <div className="sort-options">
                    {sortOptions.map((option, index) => (
                        <button
                            key={index}
                            className="sort-option"
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

export default SortDropdown;
