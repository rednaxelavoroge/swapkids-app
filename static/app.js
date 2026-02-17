// ==================== COUNTRIES ====================
const COUNTRIES = [
    ['RU','🇷🇺 Россия'],['UA','🇺🇦 Украина'],['BY','🇧🇾 Беларусь'],['KZ','🇰🇿 Казахстан'],
    ['GE','🇬🇪 Грузия'],['AZ','🇦🇿 Азербайджан'],['AM','🇦🇲 Армения'],['MD','🇲🇩 Молдова'],
    ['UZ','🇺🇿 Узбекистан'],['KG','🇰🇬 Кыргызстан'],['TJ','🇹🇯 Таджикистан'],['TM','🇹🇲 Туркменистан'],
    ['ES','🇪🇸 Spain'],['PT','🇵🇹 Portugal'],['PL','🇵🇱 Poland'],['DE','🇩🇪 Germany'],
    ['FR','🇫🇷 France'],['IT','🇮🇹 Italy'],['GB','🇬🇧 UK'],['US','🇺🇸 USA'],['CA','🇨🇦 Canada'],
    ['BR','🇧🇷 Brazil'],['MX','🇲🇽 Mexico'],['AR','🇦🇷 Argentina'],['IL','🇮🇱 Israel'],
    ['TR','🇹🇷 Turkey'],['AE','🇦🇪 UAE'],['SA','🇸🇦 Saudi Arabia'],['EG','🇪🇬 Egypt'],
    ['ZA','🇿🇦 South Africa'],['AU','🇦🇺 Australia'],['NZ','🇳🇿 New Zealand'],['JP','🇯🇵 Japan'],
    ['KR','🇰🇷 South Korea'],['CN','🇨🇳 China'],['IN','🇮🇳 India'],['ID','🇮🇩 Indonesia'],
    ['TH','🇹🇭 Thailand'],['VN','🇻🇳 Vietnam'],['MY','🇲🇾 Malaysia'],['PH','🇵🇭 Philippines'],
    ['SG','🇸🇬 Singapore'],['CY','🇨🇾 Cyprus'],['GR','🇬🇷 Greece'],['BG','🇧🇬 Bulgaria'],
    ['RO','🇷🇴 Romania'],['HU','🇭🇺 Hungary'],['CZ','🇨🇿 Czech Republic'],['SK','🇸🇰 Slovakia'],
    ['AT','🇦🇹 Austria'],['CH','🇨🇭 Switzerland'],['NL','🇳🇱 Netherlands'],['BE','🇧🇪 Belgium'],
    ['SE','🇸🇪 Sweden'],['NO','🇳🇴 Norway'],['DK','🇩🇰 Denmark'],['FI','🇫🇮 Finland'],
    ['EE','🇪🇪 Estonia'],['LV','🇱🇻 Latvia'],['LT','🇱🇹 Lithuania'],['HR','🇭🇷 Croatia'],
    ['SI','🇸🇮 Slovenia'],['BA','🇧🇦 Bosnia'],['RS','🇷🇸 Serbia'],['ME','🇲🇪 Montenegro'],
    ['MK','🇲🇰 Macedonia'],['AL','🇦🇱 Albania']
];

// ==================== TRANSLATIONS ====================
const texts = {
    'ru': {
        appSubtitle:'Обмен детскими вещами', search:'Поиск вещей...',
        all:'Все', clothes:'Одежда', toys:'Игрушки', gear:'Коляски', seats:'Автокресла',
        feedTitle:'Лента объявлений', itemsCount:'вещей', noItems:'Ничего не найдено',
        changeFilters:'Попробуйте изменить фильтры', myItem:'Моё',
        showContact:'Показать контакт', deleteItem:'Удалить объявление',
        premiumTitle:'Премиум доступ', premiumDesc:'Доступ к контактам закрыт. Оплатите единый взнос для просмотра всех контактов.',
        pay:'Оплатить', cancel:'Отмена', onetime:'единоразовый платёж',
        contactSeller:'Контакт продавца', writeTelegram:'Написать в Telegram', close:'Закрыть',
        addItem:'Добавить вещь', photo:'Фотография', uploadPhoto:'Нажмите для загрузки фото',
        photoLoaded:'Фото загружено', name:'Название', namePlaceholder:'Например: Детская коляска',
        category:'Категория', selectCategory:'Выберите категорию',
        clothesCat:'Одежда', toysCat:'Игрушки', gearCat:'Коляски и переноски', seatsCat:'Автокресла', otherCat:'Другое',
        country:'Страна', city:'Город', cityPlaceholder:'Например: Батуми',
        district:'Район',        districtPlaceholder:'Например: Центральный',
        contact:'Контакт (Telegram)', contactPlaceholder:'@username или +1...',
        publish:'Опубликовать', published:'Объявление опубликовано! ✅', deleted:'Объявление удалено',
        welcomeTitle:'Добро пожаловать! 👋',
        welcomeSubtitle:'Здесь родители меняются детскими вещами по всему миру.',
        welcomeText:'Выберите свою страну и город, чтобы видеть объявления от родителей рядом с вами.',
        selectLocation:'Выбрать локацию', changeLocation:'Изменить',
        locationDisplay:'📍 Выберите локацию', locationModalTitle:'📍 Выберите локацию',
        countryLabel:'Страна:', cityLabel:'Город:', apply:'Применить',
        selectCountry:'Выберите страну...', enterCity:'Введите город...',
        cityNotSet:'Город не указан', errorPublish:'Ошибка публикации', errorServer:'Ошибка сервера',
        errorInvoice:'Ошибка создания счета', errorPayment:'Ошибка оплаты',
        invoiceSent:'Счёт отправлен! Проверьте бота 📩', premiumActivated:'🎉 Премиум активирован!',
        confirmDelete:'Удалить это объявление?', myItemBadge:'Моя вещь'
    },
    'en': {
        appSubtitle:'Exchange kids items', search:'Search items...',
        all:'All', clothes:'Clothes', toys:'Toys', gear:'Strollers', seats:'Car seats',
        feedTitle:'Items feed', itemsCount:'items', noItems:'Nothing found',
        changeFilters:'Try changing filters', myItem:'Mine',
        showContact:'Show contact', deleteItem:'Delete listing',
        premiumTitle:'Premium Access', premiumDesc:'Contact access is closed. Pay a one-time fee to view all contacts.',
        pay:'Pay', cancel:'Cancel', onetime:'one-time payment',
        contactSeller:'Seller contact', writeTelegram:'Write on Telegram', close:'Close',
        addItem:'Add item', photo:'Photo', uploadPhoto:'Click to upload photo',
        photoLoaded:'Photo loaded', name:'Name', namePlaceholder:'e.g. Baby stroller',
        category:'Category', selectCategory:'Select category',
        clothesCat:'Clothes', toysCat:'Toys', gearCat:'Strollers & carriers', seatsCat:'Car seats', otherCat:'Other',
        country:'Country', city:'City', cityPlaceholder:'e.g. Barcelona',
        district:'District',        districtPlaceholder:'e.g. Central',
        contact:'Contact (Telegram)', contactPlaceholder:'@username or +1...',
        publish:'Publish', published:'Item published! ✅', deleted:'Item deleted',
        welcomeTitle:'Welcome! 👋',
        welcomeSubtitle:"Parents exchange children's items worldwide here.",
        welcomeText:'Select your country and city to see listings from parents near you.',
        selectLocation:'Select location', changeLocation:'Change',
        locationDisplay:'📍 Select location', locationModalTitle:'📍 Select location',
        countryLabel:'Country:', cityLabel:'City:', apply:'Apply',
        selectCountry:'Select country...', enterCity:'Enter city...',
        cityNotSet:'City not set', errorPublish:'Error publishing', errorServer:'Server error',
        errorInvoice:'Error creating invoice', errorPayment:'Payment error',
        invoiceSent:'Invoice sent! Check your bot 📩', premiumActivated:'🎉 Premium activated!',
        confirmDelete:'Delete this listing?', myItemBadge:'My item'
    },
    'es': {
        appSubtitle:'Intercambio infantil', search:'Buscar artículos...',
        all:'Todos', clothes:'Ropa', toys:'Juguetes', gear:'Carritos', seats:'Sillas auto',
        feedTitle:'Artículos', itemsCount:'artículos', noItems:'Nada encontrado',
        changeFilters:'Prueba otros filtros', myItem:'Mío',
        showContact:'Ver contacto', deleteItem:'Eliminar anuncio',
        premiumTitle:'Acceso Premium', premiumDesc:'Acceso a contactos cerrado. Paga una cuota única para ver todos los contactos.',
        pay:'Pagar', cancel:'Cancelar', onetime:'pago único',
        contactSeller:'Contacto', writeTelegram:'Escribir en Telegram', close:'Cerrar',
        addItem:'Agregar artículo', photo:'Foto', uploadPhoto:'Toca para subir foto',
        photoLoaded:'Foto cargada', name:'Nombre', namePlaceholder:'Ej: Cochecito de bebé',
        category:'Categoría', selectCategory:'Seleccionar categoría',
        clothesCat:'Ropa', toysCat:'Juguetes', gearCat:'Carritos', seatsCat:'Sillas auto', otherCat:'Otro',
        country:'País', city:'Ciudad', cityPlaceholder:'Ej: Barcelona',
        district:'Barrio',        districtPlaceholder:'Ej: El Born',
        contact:'Contacto (Telegram)', contactPlaceholder:'@usuario o +1...',
        publish:'Publicar', published:'¡Publicado! ✅', deleted:'Anuncio eliminado',
        welcomeTitle:'¡Bienvenido! 👋',
        welcomeSubtitle:'Aquí los padres intercambian artículos infantiles.',
        welcomeText:'Selecciona tu país y ciudad para ver anuncios cerca de ti.',
        selectLocation:'Seleccionar ubicación', changeLocation:'Cambiar',
        locationDisplay:'📍 Seleccionar ubicación', locationModalTitle:'📍 Seleccionar ubicación',
        countryLabel:'País:', cityLabel:'Ciudad:', apply:'Aplicar',
        selectCountry:'Seleccionar país...', enterCity:'Escribe la ciudad...',
        cityNotSet:'Sin ciudad', errorPublish:'Error al publicar', errorServer:'Error del servidor',
        errorInvoice:'Error al crear factura', errorPayment:'Error de pago',
        invoiceSent:'¡Factura enviada! Revisa tu bot 📩', premiumActivated:'🎉 ¡Premium activado!',
        confirmDelete:'¿Eliminar este anuncio?', myItemBadge:'Mi artículo'
    },
    'pt': {
        appSubtitle:'Troca infantil', search:'Procurar itens...',
        all:'Todos', clothes:'Roupas', toys:'Brinquedos', gear:'Carrinhos', seats:'Cadeiras',
        feedTitle:'Itens', itemsCount:'itens', noItems:'Nada encontrado',
        changeFilters:'Tente outros filtros', myItem:'Meu',
        showContact:'Ver contato', deleteItem:'Excluir anúncio',
        premiumTitle:'Acesso Premium', premiumDesc:'Acesso aos contatos fechado. Pague uma taxa única para ver todos os contatos.',
        pay:'Pagar', cancel:'Cancelar', onetime:'pagamento único',
        contactSeller:'Contato', writeTelegram:'Escrever no Telegram', close:'Fechar',
        addItem:'Adicionar item', photo:'Foto', uploadPhoto:'Toque para carregar foto',
        photoLoaded:'Foto carregada', name:'Nome', namePlaceholder:'Ex: Carrinho de bebê',
        category:'Categoria', selectCategory:'Selecionar categoria',
        clothesCat:'Roupas', toysCat:'Brinquedos', gearCat:'Carrinhos', seatsCat:'Cadeiras', otherCat:'Outro',
        country:'País', city:'Cidade', cityPlaceholder:'Ex: Lisboa',
        district:'Bairro',        districtPlaceholder:'Ex: Chiado',
        contact:'Contato (Telegram)', contactPlaceholder:'@usuario ou +1...',
        publish:'Publicar', published:'Publicado! ✅', deleted:'Anúncio excluído',
        welcomeTitle:'Bem-vindo! 👋',
        welcomeSubtitle:'Aqui os pais trocam itens infantis.',
        welcomeText:'Selecione seu país e cidade para ver anúncios perto de você.',
        selectLocation:'Selecionar localização', changeLocation:'Mudar',
        locationDisplay:'📍 Selecionar localização', locationModalTitle:'📍 Selecionar localização',
        countryLabel:'País:', cityLabel:'Cidade:', apply:'Aplicar',
        selectCountry:'Selecionar país...', enterCity:'Digite a cidade...',
        cityNotSet:'Sem cidade', errorPublish:'Erro ao publicar', errorServer:'Erro no servidor',
        errorInvoice:'Erro ao criar fatura', errorPayment:'Erro de pagamento',
        invoiceSent:'Fatura enviada! Verifique seu bot 📩', premiumActivated:'🎉 Premium ativado!',
        confirmDelete:'Excluir este anúncio?', myItemBadge:'Meu item'
    },
    'uk': {
        appSubtitle:'Обмін дитячими речами', search:'Пошук речей...',
        all:'Всі', clothes:'Одяг', toys:'Іграшки', gear:'Коляски', seats:'Автокрісла',
        feedTitle:'Оголошення', itemsCount:'речей', noItems:'Нічого не знайдено',
        changeFilters:'Спробуйте змінити фільтри', myItem:'Моє',
        showContact:'Показати контакт', deleteItem:'Видалити оголошення',
        premiumTitle:'Преміум доступ', premiumDesc:'Доступ до контактів закритий. Оплатіть одноразовий внесок.',
        pay:'Оплатити', cancel:'Скасувати', onetime:'одноразовий платіж',
        contactSeller:'Контакт продавця', writeTelegram:'Написати в Telegram', close:'Закрити',
        addItem:'Додати річ', photo:'Фотографія', uploadPhoto:'Натисніть для завантаження фото',
        photoLoaded:'Фото завантажено', name:'Назва', namePlaceholder:'Наприклад: Дитяча коляска',
        category:'Категорія', selectCategory:'Виберіть категорію',
        clothesCat:'Одяг', toysCat:'Іграшки', gearCat:'Коляски', seatsCat:'Автокрісла', otherCat:'Інше',
        country:'Країна', city:'Місто', cityPlaceholder:'Наприклад: Київ',
        district:'Район',        districtPlaceholder:'Наприклад: Печерськ',
        contact:'Контакт (Telegram)', contactPlaceholder:'@username або +1...',
        publish:'Опублікувати', published:'Оголошення опубліковано! ✅', deleted:'Оголошення видалено',
        welcomeTitle:'Ласкаво просимо! 👋',
        welcomeSubtitle:'Тут батьки обмінюються дитячими речами по всьому світу.',
        welcomeText:'Виберіть країну та місто, щоб бачити оголошення від батьків поруч.',
        selectLocation:'Вибрати локацію', changeLocation:'Змінити',
        locationDisplay:'📍 Виберіть локацію', locationModalTitle:'📍 Виберіть локацію',
        countryLabel:'Країна:', cityLabel:'Місто:', apply:'Застосувати',
        selectCountry:'Виберіть країну...', enterCity:'Введіть місто...',
        cityNotSet:'Місто не вказано', errorPublish:'Помилка публікації', errorServer:'Помилка сервера',
        errorInvoice:'Помилка створення рахунку', errorPayment:'Помилка оплати',
        invoiceSent:'Рахунок надіслано! Перевірте бота 📩', premiumActivated:'🎉 Преміум активовано!',
        confirmDelete:'Видалити це оголошення?', myItemBadge:'Моя річ'
    },
    'ka': {
        appSubtitle:'ბავშვთა ნივთების გაცვლა', search:'ნივთების ძიება...',
        all:'ყველა', clothes:'ტანსაცმელი', toys:'სათამაშოები', gear:'კალოსკები', seats:'ავტოკრესლები',
        feedTitle:'განცხადებები', itemsCount:'ნივთი', noItems:'ვერაფერი მოიძებნა',
        changeFilters:'სცადეთ ფილტრების შეცვლა', myItem:'ჩემი',
        showContact:'კონტაქტის ჩვენება', deleteItem:'განცხადების წაშლა',
        premiumTitle:'პრემიუმ წვდომა', premiumDesc:'კონტაქტებზე წვდომა დაკეტილია. გადაიხადეთ ერთჯერადი საფასური.',
        pay:'გადახდა', cancel:'გაუქმება', onetime:'ერთჯერადი გადახდა',
        contactSeller:'კონტაქტი', writeTelegram:'Telegram-ში წერა', close:'დახურვა',
        addItem:'ნივთის დამატება', photo:'ფოტო', uploadPhoto:'ფოტოს ატვირთვა',
        photoLoaded:'ფოტო ატვირთულია', name:'სახელი', namePlaceholder:'მაგ: საბავშვო ეტლი',
        category:'კატეგორია', selectCategory:'აირჩიეთ კატეგორია',
        clothesCat:'ტანსაცმელი', toysCat:'სათამაშოები', gearCat:'კალოსკები', seatsCat:'ავტოკრესლები', otherCat:'სხვა',
        country:'ქვეყანა', city:'ქალაქი', cityPlaceholder:'მაგ: თბილისი',
        district:'რაიონი',        districtPlaceholder:'მაგ: ვაკე',
        contact:'კონტაქტი (Telegram)', contactPlaceholder:'@username ან +1...',
        publish:'გამოქვეყნება', published:'გამოქვეყნდა! ✅', deleted:'განცხადება წაიშალა',
        welcomeTitle:'კეთილი იყოს თქვენი მობრძანება! 👋',
        welcomeSubtitle:'აქ მშობლები აცვლიან ბავშვთა ნივთებს მთელს მსოფლიოში.',
        welcomeText:'აირჩიეთ ქვეყანა და ქალაქი, რომ ნახოთ განცხადებები მშობლებისგან თქვენს ახლოს.',
        selectLocation:'აირჩიეთ ლოკაცია', changeLocation:'შეცვლა',
        locationDisplay:'📍 აირჩიეთ ლოკაცია', locationModalTitle:'📍 აირჩიეთ ლოკაცია',
        countryLabel:'ქვეყანა:', cityLabel:'ქალაქი:', apply:'გამოყენება',
        selectCountry:'აირჩიეთ ქვეყანა...', enterCity:'შეიყვანეთ ქალაქი...',
        cityNotSet:'ქალაქი არ არის მითითებული', errorPublish:'გამოქვეყნების შეცდომა', errorServer:'სერვერის შეცდომა',
        errorInvoice:'ინვოისის შეცდომა', errorPayment:'გადახდის შეცდომა',
        invoiceSent:'ინვოისი გაიგზავნა! შეამოწმეთ ბოტი 📩', premiumActivated:'🎉 პრემიუმი გააქტიურდა!',
        confirmDelete:'წაშალოთ ეს განცხადება?', myItemBadge:'ჩემი ნივთი'
    }
};

// ==================== APP STATE ====================
const tg = window.Telegram.WebApp;
tg.expand();

const userId = tg.initDataUnsafe.user?.id || 0;
const username = tg.initDataUnsafe.user?.username || 'user';

let allItems = [];
let filteredItems = [];
let isPremium = false;
let currentItem = null;
let uploadedPhoto = null;
let currentFilter = 'all';
let currentSearch = '';
let currentLang = localStorage.getItem('swapkids_lang') || (tg.initDataUnsafe.user?.language_code?.substring(0,2)) || 'ru';
let currentCountry = localStorage.getItem('swapkids_country') || '';
let currentCity = localStorage.getItem('swapkids_city') || '';

const DISTRICT_EXAMPLES = {
    'tbilisi': 'Saburtalo', 'тбилиси': 'Сабуртало',
    'moscow': 'Khamovniki', 'москва': 'Хамовники',
    'barcelona': 'Eixample', 'барселона': 'Эшампле',
    'lisbon': 'Chiado', 'лиссабон': 'Шиаду',
    'kyiv': 'Pechersk', 'киев': 'Печерск',
    'batumi': 'Old Batumi', 'батуми': 'Старый Батуми'
};

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    try {
        populateCountrySelects();
        const langSel = document.getElementById('langSelector');
        if (langSel) langSel.value = currentLang;
        
        applyTranslations();
        loadUser();
        loadItems();
        setupEventListeners();

        const welcome = document.getElementById('welcomeMessage');
        if (welcome && currentCountry && currentCity) {
            welcome.style.display = 'none';
        }

        const iCountry = document.getElementById('itemCountry');
        const iCity = document.getElementById('itemCity');
        if (iCountry && currentCountry) iCountry.value = currentCountry;
        if (iCity && currentCity) iCity.value = currentCity;
    } catch (e) {
        console.error('Initialization error:', e);
    }
});

function populateCountrySelects() {
    const html = COUNTRIES.map(([code, name]) => `<option value="${code}">${name}</option>`).join('');
    const t = texts[currentLang] || texts['ru'];
    document.getElementById('countrySelect').innerHTML = `<option value="">${t.selectCountry}</option>` + html;
    document.getElementById('itemCountry').innerHTML = `<option value="">${t.selectCountry}</option>` + html;
}

// ==================== I18N ====================
function t(key) {
    return (texts[currentLang] || texts['ru'])[key] || (texts['ru'])[key] || key;
}

function applyTranslations() {
    try {
        const lang = texts[currentLang] || texts['ru'];
        const setT = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text;
        };

        setT('appSubtitle', lang.appSubtitle);
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.placeholder = lang.search;

        // Categories
        const catBtns = document.querySelectorAll('.category-btn');
        if (catBtns.length >= 5) {
            catBtns[0].textContent = lang.all;
            catBtns[1].innerHTML = '<i class="fas fa-tshirt mr-1"></i>' + lang.clothes;
            catBtns[2].innerHTML = '<i class="fas fa-gamepad mr-1"></i>' + lang.toys;
            catBtns[3].innerHTML = '<i class="fas fa-baby-carriage mr-1"></i>' + lang.gear;
            catBtns[4].innerHTML = '<i class="fas fa-chair mr-1"></i>' + lang.seats;
        }

        setT('feedTitle', lang.feedTitle);
        setT('welcomeTitle', lang.welcomeTitle);
        setT('welcomeSubtitle', lang.welcomeSubtitle);
        setT('welcomeText', lang.welcomeText);
        setT('selectLocationBtnText', lang.selectLocation);
        setT('changeLocationBtn', lang.changeLocation);
        setT('locationModalTitle', lang.locationModalTitle);
        setT('countryLabel', lang.countryLabel);
        setT('cityLabel', lang.cityLabel);
        const cityInput = document.getElementById('cityInput');
        if (cityInput) cityInput.placeholder = lang.enterCity;
        setT('applyBtn', lang.apply);

        // Add item form
        setT('addItemTitle', lang.addItem);
        setT('photoLabel', lang.photo);
        setT('uploadPhotoText', lang.uploadPhoto);
        setT('nameLabel', lang.name);
        const itemTitle = document.getElementById('itemTitle');
        if (itemTitle) itemTitle.placeholder = lang.namePlaceholder;
        setT('categoryLabel', lang.category);
        setT('selectCategoryOpt', lang.selectCategory);
        setT('optClothes', lang.clothesCat);
        setT('optToys', lang.toysCat);
        setT('optGear', lang.gearCat);
        setT('optSeats', lang.seatsCat);
        setT('optOther', lang.otherCat);
        setT('countryFormLabel', lang.country);
        setT('cityFormLabel', lang.city);
        const itemCity = document.getElementById('itemCity');
        if (itemCity) itemCity.placeholder = lang.cityPlaceholder;
        setT('districtLabel', lang.district);
        const itemDistrict = document.getElementById('itemDistrict');
        if (itemDistrict) itemDistrict.placeholder = lang.districtPlaceholder;
        setT('contactFormLabel', lang.contact);
        const itemContact = document.getElementById('itemContact');
        if (itemContact) itemContact.placeholder = lang.contactPlaceholder;
        setT('publishBtn', lang.publish);

        // Premium modal
        setT('premiumTitle', lang.premiumTitle);
        setT('premiumDesc', lang.premiumDesc);
        setT('payButtonText', lang.pay);
        setT('premiumCancelBtn', lang.cancel);
        setT('premiumOnetime', lang.onetime);

        // Contact modal
        setT('contactSellerTitle', lang.contactSeller);
        setT('writeTelegramText', lang.writeTelegram);
        setT('closeContactBtn', lang.close);

        // Location display
        const locDisp = document.getElementById('locationDisplay');
        if (locDisp) {
            if (currentCountry && currentCity) {
                const countryName = COUNTRIES.find(c => c[0] === currentCountry)?.[1] || currentCountry;
                locDisp.innerHTML = '<i class="fas fa-map-marker-alt text-teal-500 mr-1"></i>📍 ' + countryName + ', ' + currentCity;
            } else {
                locDisp.innerHTML = '<i class="fas fa-map-marker-alt text-teal-500 mr-1"></i>' + lang.locationDisplay;
            }
        }

        if (allItems.length > 0) renderItems();
    } catch (e) {
        console.error('Translation error:', e);
    }
}

function changeLanguage() {
    currentLang = document.getElementById('langSelector').value;
    localStorage.setItem('swapkids_lang', currentLang);
    populateCountrySelects();
    if (currentCountry) document.getElementById('itemCountry').value = currentCountry;
    applyTranslations();
}

// ==================== DATA LOADING ====================
async function loadUser() {
    try {
        const res = await fetch(`/api/user?user_id=${userId}`);
        if (res.ok) {
            const user = await res.json();
            isPremium = user.is_premium;
        } else if (res.status === 404 && userId) {
            // Auto-register user from WebApp
            await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    username: username,
                    first_name: tg.initDataUnsafe.user?.first_name || '',
                    last_name: tg.initDataUnsafe.user?.last_name || ''
                })
            });
        }
    } catch (e) { console.error('Error loading user:', e); }
}

async function loadItems() {
    try {
        let url = `/api/items?user_id=${userId}`;
        if (currentCountry) url += `&country=${currentCountry}`;
        if (currentCity) url += `&city=${encodeURIComponent(currentCity)}`;
        const res = await fetch(url);
        allItems = await res.json();
        filterAndRenderItems();
    } catch (e) { console.error('Error loading items:', e); }
}

// ==================== FILTERING & RENDERING ====================
function filterAndRenderItems() {
    filteredItems = allItems.filter(item => {
        if (currentFilter !== 'all' && item.category !== currentFilter) return false;
        if (currentSearch) {
            const s = currentSearch.toLowerCase();
            const tm = (item.title || '').toLowerCase().includes(s);
            const cm = (item.city || '').toLowerCase().includes(s);
            const dm = (item.district || '').toLowerCase().includes(s);
            if (!tm && !cm && !dm) return false;
        }
        return true;
    });
    renderItems();
}

function renderItems() {
    const grid = document.getElementById('itemsGrid');
    document.getElementById('itemsCount').textContent = `${filteredItems.length} ${t('itemsCount')}`;

    if (filteredItems.length === 0) {
        grid.innerHTML = `
            <div class="col-span-2 text-center py-12">
                <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-search text-gray-300 text-3xl"></i>
                </div>
                <p class="text-gray-500">${t('noItems')}</p>
                <p class="text-gray-400 text-sm mt-1">${t('changeFilters')}</p>
            </div>`;
        return;
    }

    grid.innerHTML = filteredItems.map((item, i) => `
        <div class="item-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover cursor-pointer"
             style="animation-delay: ${i * 0.05}s" onclick="openItemModal(${item.id})">
            <div class="relative">
                <img src="${item.image_url || 'https://placehold.co/400x300/e0f2fe/0d9488?text=' + encodeURIComponent(item.title)}"
                     alt="${item.title}" class="w-full h-32 object-cover" loading="lazy"
                     onerror="this.src='https://placehold.co/400x300/e0f2fe/0d9488?text=${encodeURIComponent(item.title)}'">
                ${item.owner_id == userId ? `<span class="absolute top-2 left-2 px-2 py-1 bg-teal-500 text-white text-xs font-medium rounded-full">${t('myItem')}</span>` : ''}
            </div>
            <div class="p-3">
                <h3 class="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">${item.title}</h3>
                <div class="flex items-center gap-1 text-gray-500 text-xs">
                    <i class="fas fa-map-marker-alt text-teal-500"></i>
                    <span>${item.city || t('cityNotSet')}${item.district ? ', ' + item.district : ''}</span>
                </div>
            </div>
        </div>`).join('');
}

function getCategoryName(cat) {
    const map = { clothes: t('clothes'), toys: t('toys'), gear: t('gear'), seats: t('seats'), other: t('otherCat') };
    return map[cat] || cat;
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('input', e => {
        currentSearch = e.target.value;
        filterAndRenderItems();
    });

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('active', 'bg-teal-500', 'text-white');
                b.classList.add('bg-gray-100', 'text-gray-600');
            });
            btn.classList.add('active', 'bg-teal-500', 'text-white');
            btn.classList.remove('bg-gray-100', 'text-gray-600');
            currentFilter = btn.dataset.category;
            filterAndRenderItems();
        });
    });

    document.getElementById('fabAdd').addEventListener('click', openAddModal);
    document.getElementById('itemCity').addEventListener('input', updateDistrictPlaceholder);
}

function updateDistrictPlaceholder() {
    const city = document.getElementById('itemCity').value.toLowerCase().trim();
    const input = document.getElementById('itemDistrict');
    const example = DISTRICT_EXAMPLES[city];
    if (example) {
        const lang = (texts[currentLang] || texts['ru']);
        const prefix = currentLang === 'ru' || currentLang === 'uk' ? 'Например: ' : 
                       currentLang === 'es' ? 'Ej: ' :
                       currentLang === 'pt' ? 'Ex: ' :
                       currentLang === 'ka' ? 'მაგ: ' : 'e.g. ';
        input.placeholder = prefix + example;
    } else {
        input.placeholder = t('districtPlaceholder');
    }
}

// ==================== LOCATION ====================
function showLocationModal() {
    document.getElementById('locationModal').classList.remove('hidden');
    if (currentCountry) document.getElementById('countrySelect').value = currentCountry;
    if (currentCity) document.getElementById('cityInput').value = currentCity;
}

function closeLocationModal() {
    document.getElementById('locationModal').classList.add('hidden');
}

function saveLocation() {
    const country = document.getElementById('countrySelect').value;
    const city = document.getElementById('cityInput').value.trim();
    if (country && city) {
        currentCountry = country;
        currentCity = city;
        localStorage.setItem('swapkids_country', country);
        localStorage.setItem('swapkids_city', city);
        applyTranslations();
        closeLocationModal();
        document.getElementById('welcomeMessage').style.display = 'none';
        // Pre-fill add form
        document.getElementById('itemCountry').value = country;
        document.getElementById('itemCity').value = city;
        loadItems();
        showToast(t('locationDisplay').replace('📍 ', '') + ': ' + (COUNTRIES.find(c => c[0] === country)?.[1] || country) + ', ' + city);
    }
}

// ==================== ITEM MODAL ====================
function openItemModal(itemId) {
    const item = allItems.find(i => i.id === itemId);
    if (!item) return;
    currentItem = item;

    document.getElementById('modalImage').src = item.image_url || `https://placehold.co/600x400/e0f2fe/0d9488?text=${encodeURIComponent(item.title)}`;
    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalCategory').textContent = getCategoryName(item.category);
    document.getElementById('modalLocation').textContent = `${item.city || t('cityNotSet')}${item.district ? ', ' + item.district : ''}`;

    const myBadge = document.getElementById('myItemBadge');
    document.getElementById('myItemBadgeText').textContent = t('myItemBadge');
    myBadge.classList.toggle('hidden', item.owner_id != userId);

    const actions = document.getElementById('modalActions');
    if (item.owner_id == userId) {
        actions.innerHTML = `<button onclick="deleteItem(${item.id})" class="w-full py-4 bg-red-500 text-white rounded-xl font-semibold shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"><i class="fas fa-trash"></i>${t('deleteItem')}</button>`;
    } else {
        actions.innerHTML = `<button onclick="showContact(${item.id})" class="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2"><i class="fas fa-phone"></i>${t('showContact')}</button>`;
    }

    document.getElementById('itemModal').classList.remove('hidden');
}

function closeItemModal() { document.getElementById('itemModal').classList.add('hidden'); }

// ==================== CONTACT ====================
async function showContact(itemId) {
    try {
        const res = await fetch(`/api/contact?user_id=${userId}&item_id=${itemId}`);
        const data = await res.json();
        if (data.status === 'paid') {
            document.getElementById('contactInfo').textContent = data.contact;
            const tgLink = data.contact.startsWith('@') ? `https://t.me/${data.contact.substring(1)}` : `https://t.me/${data.contact}`;
            document.getElementById('contactLink').href = tgLink;
            document.getElementById('contactModal').classList.remove('hidden');
        } else {
            document.getElementById('premiumModal').classList.remove('hidden');
        }
    } catch (e) { console.error('Error getting contact:', e); }
}

function closeContactModal() { document.getElementById('contactModal').classList.add('hidden'); }

// ==================== PREMIUM ====================
function closePremiumModal() { document.getElementById('premiumModal').classList.add('hidden'); }

async function processPayment() {
    const btn = document.getElementById('payButton');
    const btnText = document.getElementById('payButtonText');
    const loader = document.getElementById('payLoader');
    btnText.classList.add('hidden'); loader.classList.remove('hidden'); btn.disabled = true;
    try {
        const res = await fetch(`/api/invoice?user_id=${userId}&lang=${currentLang}`);
        const data = await res.json();
        if (data.ok) {
            closePremiumModal();
            showToast(t('invoiceSent'));
            // Poll for premium status update after payment
            let checks = 0;
            const pollInterval = setInterval(async () => {
                checks++;
                try {
                    const r = await fetch(`/api/user?user_id=${userId}`);
                    if (r.ok) {
                        const u = await r.json();
                        if (u.is_premium) {
                            isPremium = true;
                            clearInterval(pollInterval);
                            showToast(t('premiumActivated'));
                        }
                    }
                } catch(e) {}
                if (checks >= 30) clearInterval(pollInterval); // Stop after 60s
            }, 2000);
        } else { showToast(t('errorInvoice')); }
    } catch (e) { showToast(t('errorPayment')); }
    finally { btnText.classList.remove('hidden'); loader.classList.add('hidden'); btn.disabled = false; }
}

// ==================== ADD ITEM ====================
// ==================== IMAGE PROCESSING ====================
async function compressImage(dataUrl, maxWidth = 800, maxHeight = 800) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            if (width > height) {
                if (width > maxWidth) { height *= maxWidth / width; width = maxWidth; }
            } else {
                if (height > maxHeight) { width *= maxHeight / height; height = maxHeight; }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.7)); // 0.7 quality JPEG
        };
    });
}

function openAddModal() { 
    document.getElementById('addModal').classList.remove('hidden'); 
    updateDistrictPlaceholder();
}

function closeAddModal() {
    document.getElementById('addModal').classList.add('hidden');
    document.getElementById('addItemForm').reset();
    document.getElementById('uploadPreview').classList.add('hidden');
    document.getElementById('uploadPlaceholder').classList.remove('hidden');
    uploadedPhoto = null;
    // Restore saved location
    if (currentCountry) document.getElementById('itemCountry').value = currentCountry;
    if (currentCity) document.getElementById('itemCity').value = currentCity;
}

async function previewPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async e => {
        const rawPhoto = e.target.result;
        // Compress before preview and storage
        uploadedPhoto = await compressImage(rawPhoto);
        document.getElementById('uploadPreview').querySelector('img').src = uploadedPhoto;
        document.getElementById('uploadPreview').classList.remove('hidden');
        document.getElementById('uploadPlaceholder').classList.add('hidden');
    };
    reader.readAsDataURL(file);
}

async function submitItem(event) {
    event.preventDefault();
    const btn = document.getElementById('submitButton');
    const btnText = document.getElementById('publishBtn');
    const loader = document.getElementById('submitLoader');
    btnText.classList.add('hidden'); loader.classList.remove('hidden'); btn.disabled = true;

    const data = {
        user_id: userId,
        title: document.getElementById('itemTitle').value,
        category: document.getElementById('itemCategory').value,
        country: document.getElementById('itemCountry').value,
        city: document.getElementById('itemCity').value,
        district: document.getElementById('itemDistrict').value,
        contact: document.getElementById('itemContact').value,
        image: uploadedPhoto
    };

    try {
        const res = await fetch('/api/items', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        if (res.ok) { closeAddModal(); showToast(t('published')); loadItems(); }
        else { showToast(t('errorPublish')); }
    } catch (e) { showToast(t('errorServer')); }
    finally { btnText.classList.remove('hidden'); loader.classList.add('hidden'); btn.disabled = false; }
}

// ==================== DELETE ITEM ====================
async function deleteItem(itemId) {
    if (!confirm(t('confirmDelete'))) return;
    try {
        const res = await fetch(`/api/items?id=${itemId}&user_id=${userId}`, { method: 'DELETE' });
        if (res.ok) { closeItemModal(); showToast(t('deleted')); loadItems(); }
    } catch (e) { console.error('Error deleting item:', e); }
}

// ==================== TOAST ====================
function showToast(message) {
    const toast = document.getElementById('successToast');
    document.getElementById('toastMessage').textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}
