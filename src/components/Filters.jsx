import React, { useMemo, useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';

const Select = React.memo(({
                               label,
                               value,
                               onChange,
                               options,
                               className,
                               disabled = false,
                               defaultOption = "ყველა"
                           }) => (
    <>
        <label htmlFor={className}>{label}</label>
        <select
            id={className}
            className={className}
            value={value}
            onChange={onChange}
            disabled={disabled}
        >
            <option value="">{`${defaultOption}`}</option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    </>
));

const PriceRangeInput = React.memo(({
                                        value,
                                        onChange,
                                        placeholder,
                                        className,
                                        currency
                                    }) => {


    return (
        <input
            type="number"
            className={className}
            value={value}
            onChange={onChange}
            placeholder={`${placeholder} ${currency === 'GEL' ? '₾' : '$'}`}
            min="0"
        />
    );
});

const Filters = ({
                     saleType,
                     setSaleType,
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
                     setCurrency
                 }) => {
    const [filteredModels, setFilteredModels] = useState([]);

    const categoryModelMapping = {
        "1": "სედანი",
        "2": "კუპე",
        "3": "ჯიპი",
        "4": "უნივერსალი",
    };

    useEffect(() => {
        const filterModelsByCategory = () => {
            let filtered = [...models];

            if (selectedManufacturer) {
                filtered = filtered.filter(model =>
                    String(model.manufacturer_id) === String(selectedManufacturer)
                );
            }

            if (category) {
                filtered = filtered.filter(model =>
                    String(model.category_id) === String(category)
                );
            }

            const formattedModels = filtered.map(model => ({
                id: model.model_id,
                name: model.model_name
            }));

            setFilteredModels(formattedModels);
        };

        filterModelsByCategory();
    }, [selectedManufacturer, category, models]);

    const saleTypeOptions = useMemo(() => [
        { id: "1", name: "იყიდება" },
        { id: "2", name: "ქირავდება" }
    ], []);

    const manufacturerOptions = useMemo(() =>
            manufacturers.map(brand => ({
                id: brand.man_id,
                name: brand.man_name
            })),
        [manufacturers]
    );

    const categoryOptions = useMemo(() =>
            Array.isArray(categories) ? categories.map(cat => ({
                id: cat.category_id,
                name: categoryModelMapping[cat.category_id] || cat.title
            })) : [],
        [categories]
    );

    const handleSaleTypeChange = useCallback((e) => {
        setSaleType(e.target.value);
    }, [setSaleType]);

    const handleManufacturerChange = useCallback((e) => {
        const newManufacturer = e.target.value;
        setSelectedManufacturer(newManufacturer);
        setSelectedModel("");
    }, [setSelectedManufacturer, setSelectedModel]);

    const handleCategoryChange = useCallback((e) => {
        const newCategory = e.target.value;
        setCategory(newCategory);
        setSelectedModel("");
    }, [setCategory, setSelectedModel]);

    const handleModelChange = useCallback((e) => {
        setSelectedModel(e.target.value);
    }, [setSelectedModel]);

    const handleMinPriceChange = useCallback((e) => {
        const value = e.target.value;
        if (value === '' || parseInt(value) >= 0) {
            setMinPrice(value);
        }
    }, [setMinPrice]);

    const handleMaxPriceChange = useCallback((e) => {
        const value = e.target.value;
        if (value === '' || parseInt(value) >= 0) {
            setMaxPrice(value);
        }
    }, [setMaxPrice]);

    const handleCurrencyChange = useCallback(() => {
        const newCurrency = currency === 'GEL' ? 'USD' : 'GEL';
        const exchangeRate = 2.65;

        if (minPrice) {
            const convertedMin = newCurrency === 'USD'
                ? (Number(minPrice) / exchangeRate).toFixed(0)
                : (Number(minPrice) * exchangeRate).toFixed(0);
            setMinPrice(convertedMin);
        }

        if (maxPrice) {
            const convertedMax = newCurrency === 'USD'
                ? (Number(maxPrice) / exchangeRate).toFixed(0)
                : (Number(maxPrice) * exchangeRate).toFixed(0);
            setMaxPrice(convertedMax);
        }

        setCurrency(newCurrency);
    }, [currency, minPrice, maxPrice, setMinPrice, setMaxPrice, setCurrency]);

    return (
        <div className="properties">
            <Select
                label="გარიგების ტიპი"
                className="sale-type"
                value={saleType}
                onChange={handleSaleTypeChange}
                options={saleTypeOptions}
                defaultOption="აირჩიეთ გარიგების ტიპი"
            />

            <Select
                label="მწარმოებელი"
                className="model"
                value={selectedManufacturer}
                onChange={handleManufacturerChange}
                options={manufacturerOptions}
                defaultOption="ყველა მწარმოებელი"
            />

            <Select
                label="კატეგორია"
                className="category"
                value={category}
                onChange={handleCategoryChange}
                options={categoryOptions}
                defaultOption="ყველა კატეგორია"
            />

            <Select
                label="მოდელი"
                className="models"
                value={selectedModel}
                onChange={handleModelChange}
                options={filteredModels}
                disabled={filteredModels.length === 0}
                defaultOption="ყველა მოდელი"
            />

            <div className="price-range">
                <div className="price-header">
                    <label>ფასი</label>
                    <button
                        className="currency-toggle-btn"
                        onClick={handleCurrencyChange}
                    >
                        {currency === 'GEL' ? '₾' : '$'}
                    </button>
                </div>
                <div className="price-inputs">
                    <PriceRangeInput
                        className="price-input"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        placeholder="დან"
                        currency={currency}
                    />
                    <span className="price-separator">-</span>
                    <PriceRangeInput
                        className="price-input"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        placeholder="მდე"
                        currency={currency}
                    />
                </div>
            </div>
        </div>
    );
};

// Props ვალიდაცია
Filters.propTypes = {
    saleType: PropTypes.string.isRequired,
    setSaleType: PropTypes.func.isRequired,
    selectedManufacturer: PropTypes.string.isRequired,
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
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
    models: PropTypes.arrayOf(
        PropTypes.shape({
            model_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            model_name: PropTypes.string.isRequired,
            manufacturer_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            category_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
};

Select.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    className: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    defaultOption: PropTypes.string,
};

PriceRangeInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    currency: PropTypes.oneOf(['GEL', 'USD']).isRequired,
    exchangeRate: PropTypes.number
};

export default React.memo(Filters);