// src/components/SortDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';

const SortDropdown = ({ onSort }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const sortOptions = [
        { id: 'date-desc', name: 'თარიღი კლებადი', value: { field: 'date', order: 'desc' } },
        { id: 'date-asc', name: 'თარიღი ზრდადი', value: { field: 'date', order: 'asc' } },
        { id: 'price-desc', name: 'ფასი კლებადი', value: { field: 'price', order: 'desc' } },
        { id: 'price-asc', name: 'ფასი ზრდადი', value: { field: 'price', order: 'asc' } },
        { id: 'mileage-desc', name: 'გარბენი კლებადი', value: { field: 'mileage', order: 'desc' } },
        { id: 'mileage-asc', name: 'გარბენი ზრდადი', value: { field: 'mileage', order: 'asc' } },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSort = (sortValue) => {
        onSort(sortValue);
        setIsOpen(false);
    };

    return (
        <div className="sort-dropdown" ref={dropdownRef}>
            <button
                className="sort-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>სორტირება</span>
                <svg
                    className={`sort-icon ${isOpen ? 'open' : ''}`}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                >
                    <path d="M8 11L3 6h10l-5 5z" fill="currentColor"/>
                </svg>
            </button>

            {isOpen && (
                <div className="sort-options">
                    {sortOptions.map((option) => (
                        <button
                            key={option.id}
                            className="sort-option"
                            onClick={() => handleSort(option.value)}
                        >
                            {option.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SortDropdown;
