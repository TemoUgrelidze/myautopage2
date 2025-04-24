import React, { useMemo, useCallback, useEffect, useState, useContext, useRef } from "react";
import PropTypes from 'prop-types';
import { LanguageContext } from '../../contexts/LanguageContext.jsx';

// --- Select Component (Keep as is) ---
const Select = React.memo(({
    label,
    value,
    onChange,
    options,
    disabled = false,
    defaultOption = "ყველა",
    isMultiSelect = false
}) => {
    const { t } = useContext(LanguageContext);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState(
        isMultiSelect ? (Array.isArray(value) ? value : []) : value
    );

    useEffect(() => {
        if (isMultiSelect) {
            setSelectedItems(Array.isArray(value) ? value : []);
        } else {
             setSelectedItems(value);
        }
    }, [value, isMultiSelect]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.custom-select')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const filteredOptions = useMemo(() => (options && options.length > 0
        ? options.filter(option =>
            option.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : []), [options, searchTerm]);

    const handleCheckboxChange = useCallback((optionId) => {
        let newSelectedItems;
        if (Array.isArray(selectedItems)) {
            newSelectedItems = selectedItems.includes(optionId)
                ? selectedItems.filter(id => id !== optionId)
                : [...selectedItems, optionId];
            setSelectedItems(newSelectedItems);
            onChange({ target: { value: newSelectedItems } });
        }
    }, [selectedItems, onChange]);

     const handleRadioChange = useCallback((optionId) => {
        setSelectedItems(optionId);
        onChange({ target: { value: optionId } });
        setIsOpen(false);
    }, [onChange]);


    if (isMultiSelect) {
        return (
            <div className="select-container">
                <label>{label}</label>
                <div className="custom-select">
                    <div
                        className={`select-header ${disabled ? 'disabled' : ''}`}
                        onClick={() => !disabled && setIsOpen(!isOpen)}
                    >
                        <span>
                            {Array.isArray(selectedItems) && selectedItems.length > 0
                                ? `${t('common.selected')} ${selectedItems.length}`
                                : defaultOption}
                        </span>
                        <svg className={`arrow ${isOpen ? 'open' : ''}`} xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6">
                            <path fill="currentColor" d="M0 0l5 5 5-5z"/>
                        </svg>
                    </div>
                    {isOpen && !disabled && (
                        <div className="select-dropdown">
                            <input
                                type="text"
                                className="search-input"
                                placeholder={t('common.search')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <div className="options-container">
                                {filteredOptions.map((option) => (
                                    <label key={option.id} className="option-item">
                                        <input
                                            type="checkbox"
                                            checked={Array.isArray(selectedItems) && selectedItems.includes(option.id)}
                                            onChange={() => handleCheckboxChange(option.id)}
                                        />
                                        <span>{option.name}</span>
                                    </label>
                                ))}
                                {filteredOptions.length === 0 && (
                                    <div className="no-results">{t('common.noResults')}</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Single Select Logic
    return (
        <div className="select-container">
            <label>{label}</label>
            <div className="custom-select">
                 <div
                    className={`select-header ${disabled ? 'disabled' : ''}`}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                >
                    <span>
                        {options.find(opt => String(opt.id) === String(selectedItems))?.name || defaultOption}
                    </span>
                     <svg className={`arrow ${isOpen ? 'open' : ''}`} xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6">
                         <path fill="currentColor" d="M0 0l5 5 5-5z"/>
                     </svg>
                </div>
                {isOpen && !disabled && (
                    <div className="select-dropdown">
                        <div className="options-container">
                            <label className="option-item">
                                <input
                                    type="radio"
                                    name={`select-${label}`}
                                    checked={!selectedItems}
                                    onChange={() => handleRadioChange("")}
                                />
                                <span>{defaultOption}</span>
                            </label>
                            {filteredOptions.map((option) => (
                                <label key={option.id} className="option-item">
                                    <input
                                        type="radio"
                                        name={`select-${label}`}
                                        checked={String(selectedItems) === String(option.id)}
                                        onChange={() => handleRadioChange(option.id)}
                                    />
                                    <span>{option.name}</span>
                                </label>
                            ))}
                            {filteredOptions.length === 0 && !searchTerm && options.length > 0 && (
                                 <div className="no-results">{t('common.noResults')}</div>
                            )}
                             {options.length === 0 && (
                                 <div className="no-results">{t('common.noOptions')}</div>
                             )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});


// --- PriceFilter Component (Keep as is) ---
const PriceFilter = React.memo(({
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    currency,
    setCurrency
}) => {
    const { t } = useContext(LanguageContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const priceRanges = useMemo(() => [
        { min: '5000', max: '10000' },
        { min: '10000', max: '15000' },
        { min: '15000', max: '20000' },
        { min: '20000', max: '30000' },
        { min: '30000', max: '50000' },
        { min: '50000', max: '100000' }
    ], []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = useCallback(() => setIsOpen(prev => !prev), []);

    const handleCurrencyToggle = useCallback((newCurrency) => {
        if (newCurrency === currency) return;
        const exchangeRate = 2.65;
        let newMin = minPrice ? (newCurrency === 'USD' ? (Number(minPrice) / exchangeRate) : (Number(minPrice) * exchangeRate)).toFixed(0) : '';
        let newMax = maxPrice ? (newCurrency === 'USD' ? (Number(maxPrice) / exchangeRate) : (Number(maxPrice) * exchangeRate)).toFixed(0) : '';
        setMinPrice(newMin);
        setMaxPrice(newMax);
        setCurrency(newCurrency);
    }, [currency, minPrice, maxPrice, setMinPrice, setMaxPrice, setCurrency]);

    const selectPriceRange = useCallback((min, max) => {
        setMinPrice(min);
        setMaxPrice(max);
        setIsOpen(false);
    }, [setMinPrice, setMaxPrice]);

    const currencySymbol = currency === 'GEL' ? '₾' : '$';

    return (
        <div className="select-container">
            <label>{t('filters.price')}</label>
            <div className="custom-select" ref={dropdownRef}>
                <div className="select-header" onClick={toggleDropdown}>
                    <span>
                        {minPrice || maxPrice ?
                            `${minPrice || '0'} ${currencySymbol} - ${maxPrice || '∞'} ${currencySymbol}` :
                            t('filters.price')}
                    </span>
                     <svg className={`arrow ${isOpen ? 'open' : ''}`} xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6">
                         <path fill="currentColor" d="M0 0l5 5 5-5z"/>
                     </svg>
                </div>
                {isOpen && (
                    <div className="select-dropdown price-select-dropdown">
                        <div className="price-range-header">
                            <div className="currency-toggle">
                                <button className={`currency-btn ${currency === 'GEL' ? 'active' : ''}`} onClick={() => handleCurrencyToggle('GEL')}>₾</button>
                                <button className={`currency-btn ${currency === 'USD' ? 'active' : ''}`} onClick={() => handleCurrencyToggle('USD')}>$</button>
                            </div>
                        </div>
                        <div className="price-custom-range">
                            <input type="number" className="price-min-input" placeholder={`${t('filters.from')} ${currencySymbol}`} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} min="0"/>
                            <span className="price-separator">-</span>
                            <input type="number" className="price-max-input" placeholder={`${t('filters.to')} ${currencySymbol}`} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} min="0"/>
                        </div>
                        <div className="options-container">
                            {priceRanges.map((range, index) => (
                                <div key={index} className="option-item price-option" onClick={() => selectPriceRange(range.min, range.max)}>
                                    <span>{range.min} {currencySymbol}</span>
                                    <span>-</span>
                                    <span>{range.max} {currencySymbol}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

// --- YearRangeFilter Component ---
const YearRangeFilter = React.memo(({ minYear, setMinYear, maxYear, setMaxYear }) => {
    const { t } = useContext(LanguageContext);
    const currentYear = new Date().getFullYear();

    const handleMinYearChange = (e) => {
        const newMinYear = e.target.value;
        setMinYear(newMinYear);
        if (maxYear && Number(newMinYear) > Number(maxYear)) {
            setMaxYear(newMinYear);
        }
    };

    const handleMaxYearChange = (e) => {
        const newMaxYear = e.target.value;
        setMaxYear(newMaxYear);
        if (minYear && Number(newMaxYear) < Number(minYear)) {
            setMinYear(newMaxYear);
        }
    };

    return (
        <div className="select-container">
            <label>{t('filters.year')}</label>
            <div className="year-inputs">
                <input
                    type="number"
                    className="year-input"
                    placeholder={t('filters.from')}
                    value={minYear}
                    onChange={handleMinYearChange}
                    min="1900"
                    max={currentYear}
                />
                <span className="year-separator">-</span>
                <input
                    type="number"
                    className="year-input"
                    placeholder={t('filters.to')}
                    value={maxYear}
                    onChange={handleMaxYearChange}
                    min="1900"
                    max={currentYear}
                />
            </div>
        </div>
    );
});

// Add PropTypes for YearRangeFilter
YearRangeFilter.propTypes = {
    minYear: PropTypes.string,
    setMinYear: PropTypes.func.isRequired,
    maxYear: PropTypes.string,
    setMaxYear: PropTypes.func.isRequired,
};


// --- Main Filters Component ---
// Remove saleType, setSaleType from props
const Filters = ({
    selectedManufacturer,
    setSelectedManufacturer,
    manufacturers,
    category,
    setCategory,
    categories,
    models,
    selectedModel,
    setSelectedModel,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    currency,
    setCurrency,
    minYear,
    setMinYear,
    maxYear,
    setMaxYear,
    location,
    setLocation
}) => {
    const { t } = useContext(LanguageContext);
    const [filteredModels, setFilteredModels] = useState([]);

    const categoryModelMapping = useMemo(() => ({
        "1": t('car.categories.sedan'),
        "2": t('car.categories.coupe'),
        "3": t('car.categories.jeep'),
        "4": t('car.categories.universal'),
        "5": t('car.categories.hatchback'),
        "6": t('car.categories.minivan'),
        "7": t('car.categories.microbus'),
        "8": t('car.categories.pickup'),
        "9": t('car.categories.cabriolet'),
        "10": t('car.categories.limousine')
    }), [t]);

    // Updated useEffect for filtering models
    useEffect(() => {
        const filterModels = () => {
            console.log("--- Filtering Models ---");
            console.log("Raw models prop:", models);
            console.log("Selected Manufacturer(s):", selectedManufacturer);
            console.log("Selected Category:", category);

            if (!models || models.length === 0) {
                console.log("Result: Models array is empty initially.");
                setFilteredModels([]);
                return;
            }

            let filtered = [...models];

            if (selectedManufacturer && selectedManufacturer.length > 0) {
                filtered = filtered.filter(model =>
                    selectedManufacturer.includes(String(model.manufacturer_id))
                );
                console.log(`Models after manufacturer filter (${selectedManufacturer.join(', ')}):`, filtered.length);
            } else {
                 console.log("No manufacturer filter applied.");
            }

            if (category) {
                filtered = filtered.filter(model => String(model.category_id) === String(category));
                console.log(`Models after category filter (${category}):`, filtered.length);
            } else {
                 console.log("No category filter applied.");
            }

            let formatted = [];
            if (filtered.length > 0) {
                formatted = filtered.map(model => ({
                    id: String(model.model_id),
                    name: model.model_name,
                    manufacturer_id: model.manufacturer_id,
                    category_id: model.category_id
                }));
                formatted = Array.from(new Map(formatted.map(item => [item.id, item])).values());
            }

            console.log("Result: Final unique formatted models:", formatted.length);
            setFilteredModels(formatted);
        };

        filterModels();
    }, [models, category, selectedManufacturer]);


    // Remove saleTypeOptions

    const manufacturerOptions = useMemo(() =>
        manufacturers.map(brand => ({
            id: String(brand.man_id),
            name: brand.man_name
        })).sort((a, b) => a.name.localeCompare(b.name)),
        [manufacturers]
    );

    const categoryOptions = useMemo(() =>
        Array.isArray(categories) ? categories.map(cat => ({
            id: String(cat.category_id),
            name: categoryModelMapping[cat.category_id] || cat.title || t('car.categories.other')
        })).sort((a, b) => a.name.localeCompare(b.name)) : [],
        [categories, categoryModelMapping, t]
    );

     const locationOptions = useMemo(() => [
        { id: "0", name: t('car.location.tbilisi') },
        { id: "2", name: t('car.location.rustavi') },
        { id: "1", name: t('car.location.kutaisi') },
        { id: "3", name: t('car.location.batumi') },
        { id: "4", name: t('car.location.poti') },
    ].sort((a, b) => a.name.localeCompare(b.name)), [t]);


    // Remove handleSaleTypeChange

    const handleManufacturerChange = useCallback((e) => {
        setSelectedManufacturer(e.target.value);
        setSelectedModel("");
    }, [setSelectedManufacturer, setSelectedModel]);

    const handleCategoryChange = useCallback((e) => {
        setCategory(e.target.value);
        setSelectedModel("");
    }, [setCategory, setSelectedModel]);

    const handleModelChange = useCallback((e) => setSelectedModel(e.target.value), [setSelectedModel]);

    const handleLocationChange = useCallback((e) => setLocation(e.target.value), [setLocation]);


    return (
        <div className="properties">
            {/* Row 1: Manufacturer, Price, Category */}
            <Select
                label={t('filters.manufacturer')}
                value={selectedManufacturer}
                onChange={handleManufacturerChange}
                options={manufacturerOptions}
                defaultOption={t('filters.allManufacturers')}
                isMultiSelect={true}
            />
            <PriceFilter
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                currency={currency}
                setCurrency={setCurrency}
            />
            <Select
                label={t('filters.category')}
                value={category}
                onChange={handleCategoryChange}
                options={categoryOptions}
                defaultOption={t('filters.allCategories')}
            />

            {/* Row 2: Model, Year, Location */}
            <Select
                label={t('filters.model')}
                value={selectedModel}
                onChange={handleModelChange}
                options={filteredModels}
                // Keep disabled logic or remove if needed
                disabled={!selectedManufacturer || selectedManufacturer.length === 0 || filteredModels.length === 0}
                defaultOption={t('filters.allModels')}
            />
            <YearRangeFilter
                minYear={minYear}
                setMinYear={setMinYear}
                maxYear={maxYear}
                setMaxYear={setMaxYear}
            />
            <Select
                label={t('filters.location')}
                value={location}
                onChange={handleLocationChange}
                options={locationOptions}
                defaultOption={t('filters.allLocations')}
             />
        </div>
    );
};

// --- PropTypes ---
// Remove saleType, setSaleType from Filters.propTypes
Filters.propTypes = {
    selectedManufacturer: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelectedManufacturer: PropTypes.func.isRequired,
    manufacturers: PropTypes.arrayOf(
        PropTypes.shape({
            man_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            man_name: PropTypes.string.isRequired,
        })
    ).isRequired,
    category: PropTypes.string.isRequired,
    setCategory: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            category_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string,
        })
    ).isRequired,
    models: PropTypes.arrayOf(
        PropTypes.shape({
            model_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            model_name: PropTypes.string.isRequired,
            manufacturer_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            category_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
    ).isRequired,
    selectedModel: PropTypes.string.isRequired,
    setSelectedModel: PropTypes.func.isRequired,
    minPrice: PropTypes.string,
    setMinPrice: PropTypes.func.isRequired,
    maxPrice: PropTypes.string,
    setMaxPrice: PropTypes.func.isRequired,
    currency: PropTypes.oneOf(['GEL', 'USD']).isRequired,
    setCurrency: PropTypes.func.isRequired,
    minYear: PropTypes.string,
    setMinYear: PropTypes.func.isRequired,
    maxYear: PropTypes.string,
    setMaxYear: PropTypes.func.isRequired,
    location: PropTypes.string,
    setLocation: PropTypes.func.isRequired,
};

// PriceFilter PropTypes (Keep as is)
PriceFilter.propTypes = {
    minPrice: PropTypes.string,
    setMinPrice: PropTypes.func.isRequired,
    maxPrice: PropTypes.string,
    setMaxPrice: PropTypes.func.isRequired,
    currency: PropTypes.oneOf(['GEL', 'USD']).isRequired,
    setCurrency: PropTypes.func.isRequired,
};

// Select PropTypes (Keep as is)
Select.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    disabled: PropTypes.bool,
    defaultOption: PropTypes.string,
    isMultiSelect: PropTypes.bool
};

// REMOVE PriceRangeInput PropTypes
/*
PriceRangeInput.propTypes = { ... };
*/

export default React.memo(Filters);
