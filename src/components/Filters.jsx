import React from "react";

function Filters({
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
                 }) {
    return (
        <div className="properties">
            {/* Transaction Type */}
            <label>გარიგების ტიპი</label>
            <select className="sale-type" value={saleType} onChange={(e) => setSaleType(e.target.value)}>
                <option value="1">იყიდება</option>
                <option value="2">ქირავდება</option>
            </select>

            {/* Manufacturer */}
            <label>მწარმოებელი</label>
            <select className="model" value={selectedManufacturer} onChange={(e) => setSelectedManufacturer(e.target.value)}>
                <option value="">ყველა მწარმოებელი</option>
                {manufacturers.map((brand) => (
                    <option key={brand.man_id} value={brand.man_id}>
                        {brand.man_name}
                    </option>
                ))}
            </select>

            {/* Models (Disabled if No Options Available) */}
            <label>მოდელი</label>
            <select
                className="models"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                disabled={models.length === 0} // Lock dropdown if no models available
            >
                <option value="">ყველა მოდელი</option>
                {models.map((model) => (
                    <option key={model.model_id} value={model.model_id}>
                        {model.model_name}
                    </option>
                ))}
            </select>

            {/* Category */}
            <label>კატეგორია</label>
            <select className="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">ყველა კატეგორია</option>
                {categories.map((cat) => (
                    <option key={cat.category_id} value={cat.category_id}>
                        {cat.title}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Filters;