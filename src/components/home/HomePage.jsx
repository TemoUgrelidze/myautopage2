import React, { useState } from 'react';

const HomePage = () => {
  // ფილტრების მდგომარეობის მართვისთვის
  const [filtersOpen, setFiltersOpen] = useState({
    filter1: false,
    filter2: false,
    filter3: false,
    filter4: false,
    filter5: false,
    filter6: false,
    filter7: false,
    filter8: false,
  });

  // ფილტრის გახსნა/დახურვის ფუნქცია
  const toggleFilter = (filterName) => {
    setFiltersOpen({
      ...filtersOpen,
      [filterName]: !filtersOpen[filterName]
    });
  };

  return (
    <div className="app-container">
      {/* ნავიგაცია და სხვა ზედა ელემენტები */}
      <div className="logo-container">
        <img src="/logo.svg" alt="MyAuto" className="myauto-logo" />
      </div>

      {/* ფილტრების ბლოკი */}
      <div className="box-side">
        {/* ზედა რიგის ფილტრები */}
        <div className="filters-row filters-row-top">
          <div className="select-container">
            <div className="custom-select">
              <div
                className="select-header"
                onClick={() => toggleFilter('filter1')}
              >
                მწარმოებელი
                <span className={`arrow ${filtersOpen.filter1 ? 'open' : ''}`}>▼</span>
              </div>
              {filtersOpen.filter1 && (
                <div className="select-dropdown">
                  <input type="text" className="search-input" placeholder="ძებნა..." />
                  <div className="options-container">
                    <div className="option-item">BMW</div>
                    <div className="option-item">Mercedes-Benz</div>
                    <div className="option-item">Toyota</div>
                    <div className="option-item">Honda</div>
                    {/* სხვა ვარიანტები */}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="select-container">
            <div className="custom-select">
              <div
                className="select-header"
                onClick={() => toggleFilter('filter2')}
              >
                მოდელი
                <span className={`arrow ${filtersOpen.filter2 ? 'open' : ''}`}>▼</span>
              </div>
              {filtersOpen.filter2 && (
                <div className="select-dropdown">
                  <input type="text" className="search-input" placeholder="ძებნა..." />
                  <div className="options-container">
                    {/* მოდელების ვარიანტები */}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="select-container">
            <div className="custom-select">
              <div
                className="select-header"
                onClick={() => toggleFilter('filter3')}
              >
                გამოშვების წელი
                <span className={`arrow ${filtersOpen.filter3 ? 'open' : ''}`}>▼</span>
              </div>
              {filtersOpen.filter3 && (
                <div className="select-dropdown">
                  <div className="options-container">
                    <div className="option-item">2023</div>
                    <div className="option-item">2022</div>
                    <div className="option-item">2021</div>
                    {/* სხვა წლები */}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="select-container">
            <div className="custom-select">
              <div
                className="select-header"
                onClick={() => toggleFilter('filter4')}
              >
                ფასი
                <span className={`arrow ${filtersOpen.filter4 ? 'open' : ''}`}>▼</span>
              </div>
              {filtersOpen.filter4 && (
                <div className="select-dropdown">
                  <div className="price-inputs">
                    <input type="number" className="price-input" placeholder="დან" />
                    <span className="price-separator">-</span>
                    <input type="number" className="price-input" placeholder="მდე" />
                  </div>
                  <div className="currency-toggle">
                    <button className="currency-btn active">₾</button>
                    <button className="currency-btn">$</button>
                    <button className="currency-btn">€</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ქვედა რიგის ფილტრები */}
        <div className="filters-row filters-row-bottom">
          <div className="select-container">
            <div className="custom-select">
              <div
                className="select-header"
                onClick={() => toggleFilter('filter5')}
              >
                გარბენი
                <span className={`arrow ${filtersOpen.filter5 ? 'open' : ''}`}>▼</span>
              </div>
              {filtersOpen.filter5 && (
                <div className="select-dropdown">
                  <div className="price-inputs">
                    <input type="number" className="price-input" placeholder="დან" />
                    <span className="price-separator">-</span>
                    <input type="number" className="price-input" placeholder="მდე" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="select-container">
            <div className="custom-select">
              <div
                className="select-header"
                onClick={() => toggleFilter('filter6')}
              >
                ძრავი
                <span className={`arrow ${filtersOpen.filter6 ? 'open' : ''}`}>▼</span>
              </div>
              {filtersOpen.filter6 && (
                <div className="select-dropdown">
                  <div className="options-container">
                    <div className="option-item">
                      <input type="checkbox" id="engine1" />
                      <label htmlFor="engine1">ბენზინი</label>
                    </div>
                    <div className="option-item">
                      <input type="checkbox" id="engine2" />
                      <label htmlFor="engine2">დიზელი</label>
                    </div>
                    <div className="option-item">
                      <input type="checkbox" id="engine3" />
                      <label htmlFor="engine3">ჰიბრიდი</label>
                    </div>
                    <div className="option-item">
                      <input type="checkbox" id="engine4" />
                      <label htmlFor="engine4">ელექტრო</label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="select-container">
            <div className="custom-select">
              <div
                className="select-header"
                onClick={() => toggleFilter('filter7')}
              >
                გადაცემათა კოლოფი
                <span className={`arrow ${filtersOpen.filter7 ? 'open' : ''}`}>▼</span>
              </div>
              {filtersOpen.filter7 && (
                <div className="select-dropdown">
                  <div className="options-container">
                    <div className="option-item">
                      <input type="checkbox" id="transmission1" />
                      <label htmlFor="transmission1">მექანიკა</label>
                    </div>
                    <div className="option-item">
                      <input type="checkbox" id="transmission2" />
                      <label htmlFor="transmission2">ავტომატიკა</label>
                    </div>
                    <div className="option-item">
                      <input type="checkbox" id="transmission3" />
                      <label htmlFor="transmission3">ტიპტრონიკი</label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="select-container">
            <div className="custom-select">
              <div
                className="select-header"
                onClick={() => toggleFilter('filter8')}
              >
                მდებარეობა
                <span className={`arrow ${filtersOpen.filter8 ? 'open' : ''}`}>▼</span>
              </div>
              {filtersOpen.filter8 && (
                <div className="select-dropdown">
                  <input type="text" className="search-input" placeholder="ძებნა..." />
                  <div className="options-container">
                    <div className="option-item">
                      <input type="checkbox" id="location1" />
                      <label htmlFor="location1">თბილისი</label>
                    </div>
                    <div className="option-item">
                      <input type="checkbox" id="location2" />
                      <label htmlFor="location2">ბათუმი</label>
                    </div>
                    <div className="option-item">
                      <input type="checkbox" id="location3" />
                      <label htmlFor="location3">ქუთაისი</label>
                    </div>
                    <div className="option-item">
                      <input type="checkbox" id="location4" />
                      <label htmlFor="location4">რუსთავი</label>
                    </div>
                    {/* სხვა ლოკაციები */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ძებნის ღილაკი */}
        <div className="search-btn">
          <button>ძებნა</button>
        </div>
      </div>

      {/* მანქანების სია */}
      <div className="cars-grid">
        {/* აქ იქნება მანქანების ბარათები */}
        {/* მაგალითად: */}
        <div className="car-card">
          <div className="car-image-container">
            <img src="/car1.jpg" alt="Car" className="car-image" />
            <button className="favorite-button">❤</button>
            <div className="location-badge">თბილისი</div>
          </div>
          <div className="car-info">
            <h3 className="car-title">BMW X5</h3>
            <div className="car-year">2018</div>
            <div className="car-specs">
              <div className="specs-row">
                <span className="spec-item">3.0 ბენზინი</span>
                <span className="spec-item">120,000 კმ</span>
                <span className="spec-item">ავტომატიკა</span>
              </div>
            </div>
            <div className="car-price-section">
              <div className="car-price">45,000 ₾</div>
              <div className="car-price-secondary">17,000 $</div>
            </div>
          </div>
        </div>

        {/* დამატებითი მანქანების ბარათები */}
      </div>
    </div>
  );
};

export default HomePage;
