// src/translations/index.js
const translations = {
    ka: {
        // Georgian translations
        common: {
            search: "ძებნა",
            login: "შესვლა",
            register: "რეგისტრაცია",
            favorites: "ფავორიტები",
            loading: "იტვირთება...",
            noResults: "შედეგები არ მოიძებნა",
            noResultsForFilters: "არჩეული პარამეტრებით მანქანა ვერ მოიძებნა",
            all: "ყველა",
            selected: "არჩეულია"
        },
        filters: {
            dealType: "გარიგების ტიპი",
            manufacturer: "მწარმოებელი",
            category: "კატეგორია",
            model: "მოდელი",
            price: "ფასი",
            from: "დან",
            to: "მდე",
            allManufacturers: "ყველა მწარმოებელი",
            allCategories: "ყველა კატეგორია",
            allModels: "ყველა მოდელი",
            selectDealType: "აირჩიეთ გარიგების ტიპი",
            forSale: "იყიდება",
            forRent: "ქირავდება"
        },
        car: {
            year: "წ",
            km: "კმ",
            rightWheel: "მარჯვენა საჭე",
            leftWheel: "მარცხენა საჭე",
            gearbox: "გადაცემათა კოლოფი",
            listings: "მანქანა",
            unknownManufacturer: "უცნობი მწარმოებელი",
            customs: {
                cleared: "განბაჟებული",
                duty: "განბაჟება"
            },
            location: {
                tbilisi: "თბილისი",
                kutaisi: "ქუთაისი",
                rustavi: "რუსთავის ავტობაზრობა",
                america: "ამერიკა",
                europe: "ევროპა",
                dubai: "დუბაი",
                inTransit: "გზაში",
                georgia: "საქართველო",
                abroad: "საზღვარგარეთ"
            },
            categories: {
                sedan: "სედანი",
                coupe: "კუპე",
                jeep: "ჯიპი",
                universal: "უნივერსალი",
                hatchback: "ჰეჩბექი",
                minivan: "მინივენი",
                microbus: "მიკროავტობუსი",
                pickup: "პიკაპი",
                cabriolet: "კაბრიოლეტი",
                van: "ფურგონი",
                other: "სხვა"
            },
            transmission: {
                manual: "მექანიკა",
                automatic: "ავტომატიკა",
                tiptronic: "ტიპტრონიკი",
                variator: "ვარიატორი"
            },
            fuel: {
                petrol: "ბენზინი",
                diesel: "დიზელი",
                electric: "ელექტრო",
                hybrid: "ჰიბრიდი",
                naturalGas: "ბუნებრივი გაზი",
                lpg: "თხევადი გაზი",
                hydrogen: "წყალბადი",
                pluginHybrid: "პლაგინ ჰიბრიდი"
            }
        },
        favorites: {
            title: "ჩემი ფავორიტები",
            empty: "ფავორიტები ცარიელია",
            addHint: "დააჭირეთ გულის ღილაკს მანქანის დასამატებლად"
        },
        search: {
            resultsFound: "ნაპოვნია",
            announcements: "განცხადება"
        },
        sort: {
            default: "სორტირება",
            dateDesc: "თარიღი კლებადობით",
            dateAsc: "თარიღი ზრდადობით",
            priceDesc: "ფასი კლებადობით",
            priceAsc: "ფასი ზრდადობით",
            mileageDesc: "გარბენი კლებადობით",
            mileageAsc: "გარბენი ზრდადობით"
        },
        period: {
            all: "პერიოდი",
            last1h: "ბოლო 1 საათი",
            last2h: "ბოლო 2 საათი",
            last3h: "ბოლო 3 საათი",
            last12h: "ბოლო 12 საათი",
            last24h: "ბოლო 24 საათი",
            last3d: "ბოლო 3 დღე"
        },
        login: {
            title: "ავტორიზაცია",
            subtitle: "შეიყვანეთ თქვენი მონაცემები",
            email: "ელ-ფოსტა",
            password: "პაროლი",
            rememberMe: "დამიმახსოვრე",
            forgotPassword: "დაგავიწყდათ პაროლი?",
            noAccount: "არ გაქვთ ანგარიში?",
            createAccount: "შექმენით ახლავე",
            submit: "შესვლა",
            back: "უკან"
        }
    },

    en: {
        // English translations
        common: {
            search: "Search",
            login: "Login",
            register: "Register",
            favorites: "Favorites",
            loading: "Loading...",
            noResults: "No results found",
            noResultsForFilters: "No cars found with selected parameters",
            all: "All",
            selected: "Selected"
        },
        filters: {
            dealType: "Deal Type",
            manufacturer: "Manufacturer",
            category: "Category",
            model: "Model",
            price: "Price",
            from: "From",
            to: "To",
            allManufacturers: "All Manufacturers",
            allCategories: "All Categories",
            allModels: "All Models",
            selectDealType: "Select Deal Type",
            forSale: "For Sale",
            forRent: "For Rent"
        },
        car: {
            year: "y",
            km: "km",
            rightWheel: "Right-hand Drive",
            leftWheel: "Left-hand Drive",
            gearbox: "Transmission",
            listings: "cars",
            unknownManufacturer: "Unknown manufacturer",
            customs: {
                cleared: "Customs Cleared",
                duty: "Customs Duty"
            },
            location: {
                tbilisi: "Tbilisi",
                kutaisi: "Kutaisi",
                rustavi: "Rustavi Auto Market",
                america: "America",
                europe: "Europe",
                dubai: "Dubai",
                inTransit: "In Transit",
                georgia: "Georgia",
                abroad: "Abroad"
            },
            categories: {
                sedan: "Sedan",
                coupe: "Coupe",
                jeep: "SUV",
                universal: "Station Wagon",
                hatchback: "Hatchback",
                minivan: "Minivan",
                microbus: "Microbus",
                pickup: "Pickup",
                cabriolet: "Convertible",
                van: "Van",
                other: "Other"
            },
            transmission: {
                manual: "Manual",
                automatic: "Automatic",
                tiptronic: "Tiptronic",
                variator: "CVT"
            },
            fuel: {
                petrol: "Petrol",
                diesel: "Diesel",
                electric: "Electric",
                hybrid: "Hybrid",
                naturalGas: "CNG",
                lpg: "LPG",
                hydrogen: "Hydrogen",
                pluginHybrid: "Plug-in Hybrid"
            }
        },
        favorites: {
            title: "My Favorites",
            empty: "Favorites is empty",
            addHint: "Click the heart button to add cars"
        },
        search: {
            resultsFound: "Found",
            announcements: "listings"
        },
        sort: {
            default: "Sort",
            dateDesc: "Date (newest first)",
            dateAsc: "Date (oldest first)",
            priceDesc: "Price (high to low)",
            priceAsc: "Price (low to high)",
            mileageDesc: "Mileage (high to low)",
            mileageAsc: "Mileage (low to high)"
        },
        period: {
            all: "Period",
            last1h: "Last 1 hour",
            last2h: "Last 2 hours",
            last3h: "Last 3 hours",
            last12h: "Last 12 hours",
            last24h: "Last 24 hours",
            last3d: "Last 3 days"
        },
        login: {
            title: "Login",
            subtitle: "Enter your credentials",
            email: "Email",
            password: "Password",
            rememberMe: "Remember me",
            forgotPassword: "Forgot password?",
            noAccount: "Don't have an account?",
            createAccount: "Create one now",
            submit: "Login",
            back: "Back"
        }
    },
    ru: {
        // Russian translations
        common: {
            search: "Поиск",
            login: "Вход",
            register: "Регистрация",
            favorites: "Избранное",
            loading: "Загрузка...",
            noResults: "Результаты не найдены",
            noResultsForFilters: "Автомобили с выбранными параметрами не найдены",
            all: "Все",
            selected: "Выбрано"
        },
        filters: {
            dealType: "Тип сделки",
            manufacturer: "Производитель",
            category: "Категория",
            model: "Модель",
            price: "Цена",
            from: "От",
            to: "До",
            allManufacturers: "Все производители",
            allCategories: "Все категории",
            allModels: "Все модели",
            selectDealType: "Выберите тип сделки",
            forSale: "Продается",
            forRent: "Сдается в аренду"
        },
        car: {
            year: "г",
            km: "км",
            rightWheel: "Правый руль",
            leftWheel: "Левый руль",
            gearbox: "Коробка передач",
            listings: "автомобилей",
            unknownManufacturer: "Неизвестный производитель",
            customs: {
                cleared: "Растаможен",
                duty: "Таможенная пошлина"
            },
            location: {
                tbilisi: "Тбилиси",
                kutaisi: "Кутаиси",
                rustavi: "Автобазар Рустави",
                america: "Америка",
                europe: "Европа",
                dubai: "Дубай",
                inTransit: "В пути",
                georgia: "Грузия",
                abroad: "За границей"
            },
            categories: {
                sedan: "Седан",
                coupe: "Купе",
                jeep: "Внедорожник",
                universal: "Универсал",
                hatchback: "Хэтчбек",
                minivan: "Минивэн",
                microbus: "Микроавтобус",
                pickup: "Пикап",
                cabriolet: "Кабриолет",
                van: "Фургон",
                other: "Другое"
            },
            transmission: {
                manual: "Механика",
                automatic: "Автомат",
                tiptronic: "Типтроник",
                variator: "Вариатор"
            },
            fuel: {
                petrol: "Бензин",
                diesel: "Дизель",
                electric: "Электро",
                hybrid: "Гибрид",
                naturalGas: "Природный газ",
                lpg: "Сжиженный газ",
                hydrogen: "Водород",
                pluginHybrid: "Плагин-гибрид"
            }
        },
        favorites: {
            title: "Мое избранное",
            empty: "Избранное пусто",
            addHint: "Нажмите на кнопку сердечка, чтобы добавить автомобили"
        },
        search: {
            resultsFound: "Найдено",
            announcements: "объявлений"
        },
        sort: {
            default: "Сортировка",
            dateDesc: "Дата (сначала новые)",
            dateAsc: "Дата (сначала старые)",
            priceDesc: "Цена (по убыванию)",
            priceAsc: "Цена (по возрастанию)",
            mileageDesc: "Пробег (по убыванию)",
            mileageAsc: "Пробег (по возрастанию)"
        },
        period: {
            all: "Период",
            last1h: "Последний 1 час",
            last2h: "Последние 2 часа",
            last3h: "Последние 3 часа",
            last12h: "Последние 12 часов",
            last24h: "Последние 24 часа",
            last3d: "Последние 3 дня"
        },
        login: {
            title: "Вход",
            subtitle: "Введите ваши данные",
            email: "Эл. почта",
            password: "Пароль",
            rememberMe: "Запомнить меня",
            forgotPassword: "Забыли пароль?",
            noAccount: "Нет аккаунта?",
            createAccount: "Создайте сейчас",
            submit: "Войти",
            back: "Назад"
        }
    }
};

export default translations;
