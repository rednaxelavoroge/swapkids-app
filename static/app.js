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
        appSubtitle:'Круговорот детских вещей', search:'Поиск вещей...',
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
        welcomeSubtitle:'Здесь опытные родители помогают молодым родителям вещами по всему миру.',
        welcomeText:'Выберите свою страну и город, чтобы видеть объявления от родителей рядом с вами.',
        selectLocation:'Выбрать локацию', changeLocation:'Изменить',
        locationDisplay:'📍 Выберите локацию', locationModalTitle:'📍 Выберите локацию',
        countryLabel:'Страна:', cityLabel:'Город:', apply:'Применить',
        selectCountry:'Выберите страну...', enterCity:'Введите город...',
        cityNotSet:'Город не указан', errorPublish:'Ошибка публикации', errorServer:'Ошибка сервера',
        errorInvoice:'Ошибка создания счета', errorPayment:'Ошибка оплаты',
        invoiceSent:'Счёт отправлен! Проверьте бота 📩', premiumActivated:'🎉 Премиум активирован!',
        confirmDelete:'Удалить это объявление?', myItemBadge:'Моя вещь',
        everywhere: 'Везде', showEverywhere: 'Показать все', showNearby: 'Показать в nearby',
        navHome: 'Лента', navProfile: 'Профиль', navLeader: 'Топ', navFav: 'Лайки',
        profileTitle: 'Профиль', statsGiven: 'Отдано вещей', statsRank: 'Статус',
        myItems: 'Мои объявления', markAsGiven: 'У меня забрали', givenAway: 'Забрали',
        openFavorites: 'Избранное', openFavoritesBtn: 'Избранное',
        rankHero: 'Герой', rankMaster: 'Мастер', rankBeginner: 'Новичок',
        labelGiveaway: 'Отдают', labelWish: 'Ищут', typeLabel: 'Что вы хочете сделать?',
        typeGiveawayLabel: 'Подарю', typeWishLabel: 'Ищу', wishBadge: 'ИЩУ',
        leaderboardTitle: 'Топ Героев', topHeroes: 'Лучшие дарители',
        heroicDeeds: 'добрых дел',
        activityNewItem: 'добавил(а) вещь:', activityNewWish: 'ищет:',
        activityGiven: 'только что отдал(а):',
        karmaLabel: 'Карма', karmaPoints: 'очков',
        referralTitle: 'Пригласи друзей', referralDesc: 'Пригласи 3 друзей и получи Premium навсегда!',
        referralCopy: 'Скопировать ссылку', referralCopied: 'Скопировано! ✅', referralShare: 'Поделиться в Telegram',
        referralProgress: 'из', needMoreKarma: 'Нужно больше кармы для бронирования',
        karmaInfoTitle: 'Как работает Карма?',
        karmaRule1: 'Опубликуй вещь — +10 кармы',
        karmaRule2: 'Отдай вещь — +50 кармы',
        karmaRule3: 'Пригласи друга — +30 кармы',
        karmaBookingTeaser: '💡 Скоро: карма даст приоритет при бронировании популярных вещей!'
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
        confirmDelete:'Delete this listing?', myItemBadge:'My item',
        everywhere: 'Everywhere', showEverywhere: 'Show all', showNearby: 'Show in nearby',
        navHome: 'Feed', navProfile: 'Profile', navLeader: 'Top', navFav: 'Likes',
        profileTitle: 'Profile', statsGiven: 'Items given', statsRank: 'Rank',
        myItems: 'My Listings', markAsGiven: 'Mark as given', givenAway: 'Given Away',
        openFavorites: 'Favorites', openFavoritesBtn: 'Favorites',
        rankHero: 'Hero', rankMaster: 'Master', rankBeginner: 'Beginner',
        labelGiveaway: 'Offers', labelWish: 'Wishes', typeLabel: 'What do you want to do?',
        typeGiveawayLabel: 'Gifting', typeWishLabel: 'Searching', wishBadge: 'WISH',
        leaderboardTitle: 'Top Heroes', topHeroes: 'Best Givers',
        heroicDeeds: 'heroic deeds',
        activityNewItem: 'added an item:', activityNewWish: 'is looking for:',
        activityGiven: 'just gave away:',
        karmaLabel: 'Karma', karmaPoints: 'points',
        referralTitle: 'Invite friends', referralDesc: 'Invite 3 friends and get Premium forever!',
        referralCopy: 'Copy link', referralCopied: 'Copied! ✅', referralShare: 'Share via Telegram',
        referralProgress: 'of', needMoreKarma: 'Need more karma to book',
        karmaInfoTitle: 'How does Karma work?',
        karmaRule1: 'Post an item — +10 karma',
        karmaRule2: 'Give away an item — +50 karma',
        karmaRule3: 'Invite a friend — +30 karma',
        karmaBookingTeaser: '💡 Coming soon: karma gives priority when booking popular items!'
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
        confirmDelete:'¿Eliminar este anuncio?', myItemBadge:'Mi artículo',
        everywhere: 'En todas partes', showEverywhere: 'Mostrar todo', showNearby: 'Mostrar cerca',
        navHome: 'Inicio', navProfile: 'Perfil', navLeader: 'Top', navFav: 'Likes',
        profileTitle: 'Perfil', statsGiven: 'Artículos dados', statsRank: 'Rango',
        myItems: 'Mis anuncios', markAsGiven: 'Me lo han quitado', givenAway: 'Entregado',
        openFavorites: 'Favoritos', openFavoritesBtn: 'Favoritos',
        rankHero: 'Héroe', rankMaster: 'Maestro', rankBeginner: 'Principiante',
        labelGiveaway: 'Regalan', labelWish: 'Buscan', typeLabel: '¿Qué quieres hacer?',
        typeGiveawayLabel: 'Regalo', typeWishLabel: 'Busco', wishBadge: 'BUSCO',
        leaderboardTitle: 'Top Héroes', topHeroes: 'Mejores donantes',
        heroicDeeds: 'actos heroicos',
        activityNewItem: 'agregó un artículo:', activityNewWish: 'está buscando:',
        activityGiven: 'acaba de dar:',
        karmaLabel: 'Karma', karmaPoints: 'puntos',
        referralTitle: 'Invita amigos', referralDesc: '¡Invita 3 amigos y obtén Premium para siempre!',
        referralCopy: 'Copiar enlace', referralCopied: '¡Copiado! ✅', referralShare: 'Compartir en Telegram',
        referralProgress: 'de', needMoreKarma: 'Necesitas más karma para reservar',
        karmaInfoTitle: '¿Cómo funciona el Karma?',
        karmaRule1: 'Publica un artículo — +10 karma',
        karmaRule2: 'Regala un artículo — +50 karma',
        karmaRule3: 'Invita a un amigo — +30 karma',
        karmaBookingTeaser: '💡 Próximamente: el karma dará prioridad al reservar artículos populares!'
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
        confirmDelete:'Excluir este anúncio?', myItemBadge:'Meu item',
        everywhere: 'Em todo lugar', showEverywhere: 'Mostrar tudo', showNearby: 'Mostrar por perto',
        navHome: 'Início', navProfile: 'Perfil', profileTitle: 'Perfil',
        statsGiven: 'Itens doados', statsRank: 'Classificação', myItems: 'Meus anúncios',
        markAsGiven: 'Marcar como entregue', givenAway: 'Entregue', openFavorites: 'Favoritos',
        rankHero: 'Herói', rankMaster: 'Mestre', rankBeginner: 'Iniciante',
        labelGiveaway: 'Doando', labelWish: 'Procurando', typeLabel: 'O que você quer fazer?',
        typeGiveawayLabel: 'Doar', typeWishLabel: 'Procurar', wishBadge: 'PROCURO',
        leaderboardTitle: 'Top Heróis', topHeroes: 'Melhores doadores',
        heroicDeeds: 'atos heroicos',
        activityNewItem: 'adicionou um item:', activityNewWish: 'está procurando:',
        activityGiven: 'acabou de doar:',
        karmaLabel: 'Karma', karmaPoints: 'pontos',
        referralTitle: 'Convide amigos', referralDesc: 'Convide 3 amigos e ganhe Premium para sempre!',
        referralCopy: 'Copiar link', referralCopied: 'Copiado! ✅', referralShare: 'Compartilhar no Telegram',
        referralProgress: 'de', needMoreKarma: 'Precisa de mais karma para reservar',
        karmaInfoTitle: 'Como funciona o Karma?',
        karmaRule1: 'Publique um item — +10 karma',
        karmaRule2: 'Doe um item — +50 karma',
        karmaRule3: 'Convide um amigo — +30 karma',
        karmaBookingTeaser: '💡 Em breve: karma dá prioridade ao reservar itens populares!'
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
        invoiceSent:'Рахунок надіслано! Перевірте бота 📩', premiumActivated:'🎉 Премиум активовано!',
        confirmDelete:'Видалити це оголошення?', myItemBadge:'Моя річ',
        everywhere: 'Скрізь', showEverywhere: 'Показати все', showNearby: 'Показати поруч',
        navHome: 'Стрічка', navProfile: 'Профіль', navLeader: 'Топ', navFav: 'Лайки',
        profileTitle: 'Профіль', statsGiven: 'Віддано речей', statsRank: 'Статус',
        myItems: 'Мої оголошення', markAsGiven: 'У мене забрали', givenAway: 'Забрали',
        openFavorites: 'Обране', openFavoritesBtn: 'Обране',
        rankHero: 'Герой', rankMaster: 'Майстер', rankBeginner: 'Новачок',
        labelGiveaway: 'Віддають', labelWish: 'Шукають', typeLabel: 'Що ви хочете зробити?',
        typeGiveawayLabel: 'Віддаю', typeWishLabel: 'Шукаю', wishBadge: 'ШУКАЮ',
        leaderboardTitle: 'Топ Героїв', topHeroes: 'Найкращі дарувальники',
        heroicDeeds: 'добрих справ',
        activityNewItem: 'додав(ла) річ:', activityNewWish: 'шукає:',
        activityGiven: 'щойно віддав(ла):',
        karmaLabel: 'Карма', karmaPoints: 'очків',
        referralTitle: 'Запроси друзів', referralDesc: 'Запроси 3 друзів та отримай Premium назавжди!',
        referralCopy: 'Скопіювати посилання', referralCopied: 'Скопійовано! ✅', referralShare: 'Поділитися в Telegram',
        referralProgress: 'з', needMoreKarma: 'Потрібно більше карми для бронювання',
        karmaInfoTitle: 'Як працює Карма?',
        karmaRule1: 'Опублікуй річ — +10 карми',
        karmaRule2: 'Віддай річ — +50 карми',
        karmaRule3: 'Запроси друга — +30 карми',
        karmaBookingTeaser: '💡 Скоро: карма дасть пріоритет при бронюванні популярних речей!'
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
        confirmDelete:'წავშალოთ ეს განცხადება?', myItemBadge:'ჩემი ნივთი',
        everywhere: 'ყველგან', showEverywhere: 'ყველას ჩვენება', showNearby: 'ახლოს ჩვენება',
        navHome: 'ლენტა', navProfile: 'პროფილი', navLeader: 'ტოპი', navFav: 'ლაიქები',
        profileTitle: 'პროფილი', statsGiven: 'გაცემული ნივთები', statsRank: 'სტატუსი',
        myItems: 'ჩემი განცხადებები', markAsGiven: 'ჩემგან წაიღეს', givenAway: 'გაიცა',
        openFavorites: 'რჩეულები', openFavoritesBtn: 'რჩეულები',
        rankHero: 'გმირი', rankMaster: 'ოსტატი', rankBeginner: 'დამწყები',
        labelGiveaway: 'აძლევენ', labelWish: 'ეძებენ', typeLabel: 'რა გსურთ გააკეთოთ?',
        typeGiveawayLabel: 'ვაძლევ', typeWishLabel: 'ვეძებ', wishBadge: 'ვეძებ',
        leaderboardTitle: 'გმირების სია', topHeroes: 'საუკეთესო გამცემები',
        heroicDeeds: 'გმირული საქმე',
        activityNewItem: 'დაამატა ნივთი:', activityNewWish: 'ეძებს:',
        activityGiven: 'ახლახანს გასცა:',
        karmaLabel: 'კარმა', karmaPoints: 'ქულა',
        referralTitle: 'მეგობრების მოწვევა', referralDesc: 'მოიწვიე 3 მეგობარი და მიიღე Premium სამუდამოდ!',
        referralCopy: 'ბმულის კოპირება', referralCopied: 'კოპირებულია! ✅', referralShare: 'Telegram-ით გაზიარება',
        referralProgress: '-დან', needMoreKarma: 'საჭიროა მეტი კარმა დასაჯავშნად',
        karmaInfoTitle: 'როგორ მუშაობს კარმა?',
        karmaRule1: 'გამოაქვეყნე ნივთი — +10 კარმა',
        karmaRule2: 'გასცე ნივთი — +50 კარმა',
        karmaRule3: 'მოიწვიე მეგობარი — +30 კარმა',
        karmaBookingTeaser: '💡 მალე: კარმა მოგცემს პრიორიტეტს პოპულარული ნივთების დაჯავშნისას!'
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
let currentFeedType = 'giveaway'; // giveaway or wish
let newItemType = 'giveaway'; // for add modal
let currentSearch = '';
let isGlobalView = false;
let currentLang = localStorage.getItem('swapkids_lang') || tg.initDataUnsafe.user?.language_code?.substring(0,2) || 'ru';
if (!texts[currentLang]) currentLang = 'ru'; // Fallback if lang not supported

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
        
        // Default to global if no location is set
        if (!currentCountry || !currentCity) {
            isGlobalView = true;
        }

        applyTranslations();
        loadUser();
        loadItems();
        setupEventListeners();
        loadActivities();
        setInterval(loadActivities, 30000); // 30s polling

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
        setT('labelGiveaway', lang.labelGiveaway);
        setT('labelWish', lang.labelWish);
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
        setT('typeLabel', lang.typeLabel);
        setT('typeGiveawayLabel', lang.typeGiveawayLabel);
        setT('typeWishLabel', lang.typeWishLabel);
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

        // Profile View
        setT('profileTitle', lang.profileTitle);
        setT('profileStatsLabel', lang.statsGiven);
        setT('statsGivenLabel', lang.statsGiven);
        setT('statsRankLabel', lang.statsRank);
        setT('myItemsTitle', lang.myItems);
        setT('openFavoritesBtn', lang.openFavoritesBtn || 'Favorites');
        setT('karmaLabel', lang.karmaLabel);
        setT('karmaInfoTitle', lang.karmaInfoTitle);
        setT('karmaRule1', lang.karmaRule1);
        setT('karmaRule2', lang.karmaRule2);
        setT('karmaRule3', lang.karmaRule3);
        setT('karmaBookingTeaser', lang.karmaBookingTeaser);

        const searchInput2 = document.getElementById('searchInput');
        if (searchInput2) searchInput2.placeholder = lang.search;
        setT('appSubtitle', lang.appSubtitle);

        setT('catAll', lang.all);
        setT('catClothes', lang.clothes);
        setT('catToys', lang.toys);
        setT('catGear', lang.gear);
        setT('catSeats', lang.seats);
        setT('showEverywhereText', lang.showEverywhere);
        setT('changeLocationBtn', lang.changeLocation);

        // Location Modal
        setT('locationModalTitle', lang.locationModalTitle);
        setT('countryLabel', lang.countryLabel);
        setT('cityLabel', lang.cityLabel);

        // Bottom Nav
        setT('navHomeLabel', lang.navHome);
        setT('navLeaderLabel', lang.navLeader);
        setT('navFavLabel', lang.navFav);
        setT('navProfileLabel', lang.navProfile);

        // Modals
        setT('leaderboardTitle', lang.leaderboardTitle);
        setT('topHeroesText', lang.topHeroes);

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
        setT('showEverywhereText', lang.showEverywhere);
        setT('leaderboardTitle', lang.leaderboardTitle);
        setT('topHeroesText', lang.topHeroes);

        // Location display
        const locDisp = document.getElementById('locationDisplay');
        const globalBtn = document.getElementById('showGlobalBtn');
        
        if (locDisp) {
            if (isGlobalView) {
                locDisp.innerHTML = '<i class="fas fa-globe text-teal-500 mr-1"></i>' + lang.everywhere;
                if (globalBtn) {
                    if (currentCountry && currentCity) {
                        // User has a location, show option to go back
                        globalBtn.classList.remove('hidden');
                        setT('showEverywhereText', (lang.showNearby || 'Show nearby').replace('nearby', currentCity));
                    } else {
                        globalBtn.classList.add('hidden');
                    }
                }
            } else {
                const countryName = COUNTRIES.find(c => c[0] === currentCountry)?.[1] || currentCountry;
                locDisp.innerHTML = '<i class="fas fa-map-marker-alt text-teal-500 mr-1"></i>📍 ' + countryName + ', ' + currentCity;
                if (globalBtn) {
                    globalBtn.classList.remove('hidden');
                    setT('showEverywhereText', lang.showEverywhere);
                }
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
        let url = `/api/items?user_id=${userId}&type=${currentFeedType}`;
        if (!isGlobalView && currentCountry) url += `&country=${currentCountry}`;
        if (!isGlobalView && currentCity) url += `&city=${encodeURIComponent(currentCity)}`;
        
        const res = await fetch(url);
        allItems = await res.json();
        filterAndRenderItems();
    } catch (e) { console.error('Error loading items:', e); }
}

function toggleGlobalView() {
    isGlobalView = !isGlobalView; // Toggle
    applyTranslations();
    loadItems();
}

// ==================== FILTERING & RENDERING ====================
function filterAndRenderItems() {
    filteredItems = allItems.map(item => translateDemo(item)).filter(item => {
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

    grid.innerHTML = filteredItems.map((item, i) => {
        const isWish = item.item_type === 'wish';
        const cardBg = isWish ? 'bg-cyan-50/50' : 'bg-white';
        const borderColor = isWish ? 'border-cyan-100' : 'border-gray-100';
        
        return `
        <div class="item-card ${cardBg} rounded-2xl overflow-hidden shadow-sm border ${borderColor} card-hover cursor-pointer"
             style="animation-delay: ${i * 0.05}s" onclick="openItemModal(${item.id})">
            <div class="relative">
                ${isWish ? `
                    <div class="w-full h-32 bg-gradient-to-br from-cyan-100 to-teal-50 flex items-center justify-center">
                        <i class="fas fa-bullhorn text-cyan-400 text-4xl opacity-30"></i>
                    </div>
                    <span class="absolute top-2 left-2 px-2 py-1 bg-cyan-500 text-white text-[9px] font-black rounded-lg shadow-sm z-10 uppercase tracking-wider">${t('wishBadge')}</span>
                ` : `
                    <img src="${item.image_url || `/static/demo/${item.id}.jpg`}"
                         alt="${item.title}" class="w-full h-32 object-cover" loading="lazy"
                         onerror="this.onerror=null;this.src='/static/demo/${item.id}.jpg'">
                    ${item.owner_id == userId ? `<span class="absolute top-2 left-2 px-2 py-1 bg-teal-500 text-white text-xs font-medium rounded-full">${t('myItem')}</span>` : ''}
                    ${item.owner_id == 0 ? `<span class="absolute top-2 left-2 px-1.5 py-0.5 bg-black/30 text-white/70 text-[8px] font-medium rounded backdrop-blur-sm uppercase tracking-wider">demo</span>` : ''}
                `}
                
                <!-- Like Button -->
                <div onclick="event.stopPropagation(); toggleLike(${item.id})" 
                     class="absolute bottom-2 right-2 flex items-center gap-1 bg-white/80 backdrop-blur px-2 py-1 rounded-full shadow-sm">
                    <i class="${item.is_liked ? 'fas' : 'far'} fa-heart ${item.is_liked ? 'text-red-500' : 'text-gray-400'} text-xs"></i>
                    <span class="text-[10px] font-bold text-gray-700" id="likeCount-${item.id}">${item.likes_count || 0}</span>
                </div>
            </div>
            <div class="p-3">
                <h3 class="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">${item.title}</h3>
                <div class="flex items-center gap-1 text-gray-500 text-xs">
                    <i class="fas fa-map-marker-alt text-teal-500"></i>
                    <span>${item.city || t('cityNotSet')}${item.district ? ', ' + item.district : ''}</span>
                </div>
            </div>
        </div>`}).join('');
}

async function toggleLike(itemId) {
    const likeIcon = document.querySelector(`div[onclick*="toggleLike(${itemId})"] i`);
    const likeCounter = document.getElementById(`likeCount-${itemId}`);
    if (!likeIcon || !likeCounter) return;

    // Optimistic UI update
    const isLiked = likeIcon.classList.contains('fas');
    const currentCount = parseInt(likeCounter.textContent);
    
    if (isLiked) {
        likeIcon.classList.replace('fas', 'far');
        likeIcon.classList.replace('text-red-500', 'text-gray-400');
        likeCounter.textContent = Math.max(0, currentCount - 1);
    } else {
        likeIcon.classList.replace('far', 'fas');
        likeIcon.classList.replace('text-gray-400', 'text-red-500');
        likeCounter.textContent = currentCount + 1;
    }

    try {
        const res = await fetch('/api/items/toggle_like', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item_id: itemId, user_id: userId })
        });
        const data = await res.json();
        if (data.ok) {
            // Update with real count from server just in case
            likeCounter.textContent = data.likes_count;
            // Also update the local state for this item so it persists during current session filtering
            const item = allItems.find(it => it.id === itemId);
            if (item) {
                item.likes_count = data.likes_count;
                item.is_liked = data.action === 'added';
            }
        }
    } catch (e) {
        console.error("Like toggle error", e);
        // Rollback on error
        if (isLiked) {
            likeIcon.classList.replace('far', 'fas');
            likeIcon.classList.replace('text-gray-400', 'text-red-500');
            likeCounter.textContent = currentCount;
        } else {
            likeIcon.classList.replace('fas', 'far');
            likeIcon.classList.replace('text-red-500', 'text-gray-400');
            likeCounter.textContent = currentCount;
        }
    }
}

function switchFeedType(type) {
    currentFeedType = type;
    const btnGiveaway = document.getElementById('tabGiveaway');
    const btnWish = document.getElementById('tabWish');
    
    if (type === 'giveaway') {
        btnGiveaway.className = "flex-1 py-2 text-sm font-bold rounded-xl transition-all bg-white text-teal-600 shadow-sm";
        btnWish.className = "flex-1 py-2 text-sm font-bold rounded-xl transition-all text-gray-500";
    } else {
        btnGiveaway.className = "flex-1 py-2 text-sm font-bold rounded-xl transition-all text-gray-500";
        btnWish.className = "flex-1 py-2 text-sm font-bold rounded-xl transition-all bg-white text-teal-600 shadow-sm";
    }
    loadItems();
}

function setItemType(type) {
    newItemType = type;
    const btnGiveaway = document.getElementById('typeBtnGiveaway');
    const btnWish = document.getElementById('typeBtnWish');
    
    if (type === 'giveaway') {
        btnGiveaway.className = "flex-1 py-3 px-2 rounded-xl border-2 border-teal-500 bg-teal-50 text-teal-700 font-bold transition-all text-xs";
        btnWish.className = "flex-1 py-3 px-2 rounded-xl border-2 border-gray-100 bg-white text-gray-500 font-bold transition-all text-xs";
        document.getElementById('photoUpload').parentElement.classList.remove('hidden');
    } else {
        btnGiveaway.className = "flex-1 py-3 px-2 rounded-xl border-2 border-gray-100 bg-white text-gray-500 font-bold transition-all text-xs";
        btnWish.className = "flex-1 py-3 px-2 rounded-xl border-2 border-teal-500 bg-teal-50 text-teal-700 font-bold transition-all text-xs";
        // Wishes don't necessarily need a photo, but we can keep it optional
        // For now, let's just leave it as it is or hide it if it's annoying
    }
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
        isGlobalView = false; // Disable global view when user explicitly sets location
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
    setItemType('giveaway'); // Reset to default
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
        image: uploadedPhoto,
        item_type: newItemType
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

// ==================== VIEW SWITCHING ====================
function switchView(view) {
    const profileView = document.getElementById('profileView');
    const fab = document.getElementById('fabAdd');

    if (view === 'home') {
        profileView.classList.add('hidden');
        if (fab) fab.classList.remove('hidden');
    } else if (view === 'profile') {
        profileView.classList.remove('hidden');
        if (fab) fab.classList.add('hidden');
        loadProfile();
    }
}

async function loadProfile() {
    const user = tg.initDataUnsafe?.user || { id: 12345, first_name: 'Local Test' };
    document.getElementById('profileName').textContent = user.first_name + (user.last_name ? ' ' + user.last_name : '');
    
    // Load Stats + Karma
    try {
        const [statsRes, karmaRes] = await Promise.all([
            fetch(`/api/user/stats?user_id=${user.id}`),
            fetch(`/api/karma?user_id=${user.id}`)
        ]);
        const stats = await statsRes.json();
        const karmaData = await karmaRes.json();
        const count = stats.given_count || 0;
        const karma = karmaData.karma || 0;
        document.getElementById('statsGivenCount').textContent = count;
        
        let rank = texts[currentLang].rankBeginner;
        if (count >= 5) rank = texts[currentLang].rankMaster;
        if (count >= 10) rank = texts[currentLang].rankHero;
        document.getElementById('statsRank').textContent = rank;
        
        // Karma stat
        const karmaEl = document.getElementById('karmaCount');
        if (karmaEl) karmaEl.textContent = karma;
    } catch (e) { console.error("Stats load error", e); }

    // Load Referral Data and Premium Status
    try {
        const refRes = await fetch(`/api/referral?user_id=${user.id}`);
        const refData = await refRes.json();
        
        // Show Premium badge if user has Premium (any way)
        console.log('Referral data:', refData); // DEBUG
        const premiumBadge = document.getElementById('premiumBadge');
        console.log('Premium badge element:', premiumBadge); // DEBUG
        if (premiumBadge) {
            if (refData.is_premium) {
                console.log('Showing premium badge'); // DEBUG
                premiumBadge.classList.remove('hidden');
                premiumBadge.style.display = 'inline-flex';
            } else {
                console.log('Hiding premium badge, is_premium:', refData.is_premium); // DEBUG
                premiumBadge.classList.add('hidden');
            }
        }
        const refSection = document.getElementById('referralSection');
        if (refSection) {
            const progress = Math.min(refData.ref_count, refData.ref_needed);
            const pct = Math.round((progress / refData.ref_needed) * 100);
            const lang = texts[currentLang];
            
            refSection.innerHTML = `
                <div class="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg shadow-purple-500/20">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur">
                            <i class="fas fa-gift text-2xl"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-lg">${lang.referralTitle}</h4>
                            <p class="text-purple-200 text-xs">${lang.referralDesc}</p>
                        </div>
                    </div>
                    <div class="mb-4">
                        <div class="flex justify-between text-xs text-purple-200 mb-1">
                            <span>${progress} ${lang.referralProgress} ${refData.ref_needed}</span>
                            <span>${pct}%</span>
                        </div>
                        <div class="w-full bg-white/20 rounded-full h-2.5">
                            <div class="bg-gradient-to-r from-yellow-300 to-amber-400 h-2.5 rounded-full transition-all" style="width: ${pct}%"></div>
                        </div>
                    </div>
                    ${refData.is_premium ? `
                        <div class="text-center py-2 bg-white/20 rounded-xl text-white text-sm font-bold backdrop-blur mb-3">
                            🌟 Premium активирован навсегда!
                            ${refData.premium_earned ? '<div class="text-xs text-purple-200 mt-1">Получен за 3 друзей</div>' : '<div class="text-xs text-purple-200 mt-1">Premium доступ</div>'}
                        </div>
                    ` : ''}
                    <div class="space-y-2">
                        <button onclick="shareRefLink('${refData.ref_link}')" 
                                class="w-full py-3 bg-white text-purple-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-purple-50 transition-all active:scale-[0.98]">
                            <i class="fab fa-telegram text-lg"></i>
                            ${lang.referralShare || 'Поделиться в Telegram'}
                        </button>
                        <button onclick="copyRefLinkAlt('${refData.ref_link}')" 
                                class="w-full py-2 bg-white/10 text-white/80 rounded-xl text-xs flex items-center justify-center gap-1 hover:bg-white/20 transition-all" id="copyRefBtnAlt">
                            <i class="fas fa-link text-[10px]"></i>
                            ${lang.referralCopy}
                        </button>
                    </div>
                </div>
            `;
        }
    } catch (e) { console.error("Referral load error", e); }

    // Load My Items
    try {
        const itemsRes = await fetch(`/api/my-items?user_id=${user.id}`);
        const items = await itemsRes.json();
        const listContainer = document.getElementById('myItemsList');
        listContainer.innerHTML = '';

        if (items.length === 0) {
            listContainer.innerHTML = `<p class="text-gray-400 text-sm text-center py-4">${texts[currentLang].noItems}</p>`;
        }

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-2xl p-3 border border-gray-100 flex gap-3 items-center';
            
            const isGiven = item.status === 'given';
            
            card.innerHTML = `
                <img src="${item.image_url}" class="w-16 h-16 rounded-xl object-cover ${isGiven ? 'grayscale opacity-50' : ''}">
                <div class="flex-1 min-w-0">
                    <h5 class="font-bold text-gray-800 truncate">${item.title}</h5>
                    <div class="flex items-center gap-2 text-xs text-gray-500">
                        <span>${item.city || ''}</span>
                        <span class="flex items-center gap-1 text-teal-600 font-bold">
                            <i class="fas fa-heart text-[10px]"></i> ${item.likes_count || 0}
                        </span>
                    </div>
                </div>
                ${!isGiven ? `
                    <button onclick="markAsGiven(${item.id})" class="px-3 py-2 bg-teal-50 text-teal-600 rounded-xl text-xs font-bold whitespace-nowrap">
                        ${texts[currentLang].markAsGiven}
                    </button>
                ` : `
                    <span class="px-3 py-2 bg-gray-100 text-gray-400 rounded-xl text-xs font-bold uppercase">
                        ${texts[currentLang].givenAway}
                    </span>
                `}
            `;
            listContainer.appendChild(card);
        });
    } catch (e) { console.error("My items load error", e); }
}

function shareRefLink(link) {
    const shareMessages = {
        'ru': '🎁 Забирай вещи БЕСПЛАТНО в Swap Kids!\n\n🔥 10,000+ родителей уже экономят бюджет, обмениваясь колясками, одеждой и игрушками.\n\n✅ Всё даром\n✅ Экономия тысяч в год\n✅ Помощь планете\n\nПрисоединяйся по моей ссылке: ',
        'en': '🎁 Get kids items for FREE at Swap Kids!\n\n🔥 10,000+ parents are already saving money by exchanging strollers, clothes, and toys.\n\n✅ Everything for free\n✅ Save thousands a year\n✅ Save the planet\n\nJoin via my link: ',
        'es': '🎁 ¡Consigue artículos para niños GRATIS en Swap Kids!\n\n🔥 ¡Más de 10,000 padres ya están ahorrando dinero intercambiando cochecitos, ropa и juguetes!\n\n✅ Todo gratis\n✅ Ahorra miles al año\n✅ Salva el planeta\n\nÚnete a través de mi enlace: ',
        'pt': '🎁 Ganhe itens infantis GRÁTIS no Swap Kids!\n\n🔥 Mais de 10.000 pais já estão economizando dinheiro trocando carrinhos, roupas e brinquedos.\n\n✅ Tudo de graça\n✅ Economize milhares por ano\n✅ Salve o planeta\n\nParticipe pelo meu link: ',
        'uk': '🎁 Забирай речі БЕЗКОШТОВНО в Swap Kids!\n\n🔥 10,000+ батьків уже економлять бюджет, обмінюючись візочками, одягом та іграшками.\n\n✅ Все задарма\n✅ Економія тисяч на рік\n✅ Допомога планеті\n\nПриєднуйся за моїм посиланням: ',
        'ka': '🎁 აიღე ნივთები უფასოდ Swap Kids-ში!\n\n🔥 10,000+ მშობელი უკვე ზოგავს ბიუჯეტს ეტლების, ტანსაცმლისა და სათამაშოების გაცვლით.\n\n✅ ყველაფერი უფასოდ\n✅ დაზოგე ათასობით წელიწადში\n✅ გადაარჩინე პლანეტა\n\nშემოგვიერთდი ჩემი ბმულით: '
    };
    const msg = shareMessages[currentLang] || shareMessages['en'];
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(msg)}`;
    
    try {
        tg.openTelegramLink(shareUrl);
    } catch(e) {
        window.open(shareUrl, '_blank');
    }
}

function copyRefLinkAlt(link) {
    const btn = document.getElementById('copyRefBtnAlt');
    navigator.clipboard.writeText(link).then(() => {
        const lang = texts[currentLang];
        const origText = btn.innerHTML;
        btn.innerHTML = `<i class="fas fa-check text-[10px]"></i> ${lang.referralCopied}`;
        setTimeout(() => { btn.innerHTML = origText; }, 2000);
    }).catch(() => {});
}

async function markAsGiven(itemId) {
    const user = tg.initDataUnsafe?.user || { id: 12345 };
    // Simple confirm
    if (!confirm(texts[currentLang].confirmDelete)) return;

    try {
        const res = await fetch('/api/items/mark_given', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item_id: itemId, user_id: user.id, receiver_id: 0 }) 
        });
        if (res.ok) {
            showToast(texts[currentLang].published);
            loadProfile(); // Refresh
        }
    } catch (e) { showToast(texts[currentLang].errorServer); }
}

// ==================== LEADERBOARD ====================
function openLeaderboard() {
    document.getElementById('leaderboardModal').classList.remove('hidden');
    loadLeaderboard();
}

function closeLeaderboard() {
    document.getElementById('leaderboardModal').classList.add('hidden');
}

async function loadLeaderboard() {
    const list = document.getElementById('leaderboardList');
    list.innerHTML = '<div class="flex justify-center py-8"><div class="loading-spinner"></div></div>';
    
    try {
        const res = await fetch('/api/leaderboard');
        const data = await res.json();
        
        list.innerHTML = '';
        if (data.length === 0) {
            list.innerHTML = `<p class="text-center text-gray-400 py-8">${texts[currentLang].noItems}</p>`;
            return;
        }
        
        data.forEach((user, index) => {
            const item = document.createElement('div');
            item.className = 'flex items-center gap-4 p-3 hover:bg-gray-50 rounded-2xl transition-all';
            
            const medalColor = index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-orange-400' : 'text-teal-200';
            const name = user.first_name + (user.last_name ? ' ' + user.last_name : '') || user.username || 'User';
            
            item.innerHTML = `
                <div class="w-8 h-8 flex items-center justify-center font-bold ${medalColor}">
                    ${index < 3 ? '<i class="fas fa-medal text-xl"></i>' : (index + 1)}
                </div>
                <div class="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold">
                    ${name.charAt(0).toUpperCase()}
                </div>
                <div class="flex-1 min-w-0">
                    <h4 class="font-bold text-gray-800 truncate">${name}</h4>
                    <p class="text-xs text-gray-500">${user.given_count} ${texts[currentLang].heroicDeeds}</p>
                </div>
            `;
            list.appendChild(item);
        });
    } catch (e) {
        console.error("Leaderboard load error", e);
        list.innerHTML = `<p class="text-center text-red-400 py-8">${texts[currentLang].errorServer}</p>`;
    }
}

const DEMO_TRANSLATIONS = {
    'Автокресло Maxi-Cosi': { en: 'Maxi-Cosi Car Seat', es: 'Silla auto Maxi-Cosi', pt: 'Cadeira Maxi-Cosi', uk: 'Автокрісло Maxi-Cosi', ka: 'ავტოკრესლო Maxi-Cosi' },
    'LEGO Duplo набор': { en: 'LEGO Duplo set', es: 'Set LEGO Duplo', pt: 'Conjunto LEGO Duplo', uk: 'Набір LEGO Duplo', ka: 'LEGO Duplo-ს ნაკრები' },
    'Комбинезон зимний': { en: 'Winter jumpsuit', es: 'Mono de invierno', pt: 'Macacão de inverno', uk: 'Комбінезон зимовий', ka: 'ზამთრის კომბინიზონი' },
    'Коляска Bugaboo Fox 3': { en: 'Bugaboo Fox 3 Stroller', es: 'Cochecito Bugaboo Fox 3', pt: 'Carrinho Bugaboo Fox 3', uk: 'Коляска Bugaboo Fox 3', ka: 'ეტლი Bugaboo Fox 3' },
    'Деревянная лошадка': { en: 'Wooden horse', es: 'Caballito de madera', pt: 'Cavalo de madeira', uk: 'Дерев’яна конячка', ka: 'ხის ცხენი' },
    'Детская кроватка': { en: 'Baby crib', es: 'Cuna de bebé', pt: 'Berço de bebé', uk: 'Дитяче ліжечко', ka: 'საბავშვო საწოლი' },
    'Стульчик для кормления': { en: 'High chair', es: 'Trona de bebé', pt: 'Cadeira de alimentação', uk: 'Стільчик для годування', ka: 'საკვები სკამი' },
    'Велосипед детский': { en: 'Kids bicycle', es: 'Bicicleta infantil', pt: 'Bicicleta infantil', uk: 'Велосипед дитячий', ka: 'საბავშვო ველოსიპედი' },
    'Набор развивающих игрушек': { en: 'Educational toys set', es: 'Set de juguetes educativos', pt: 'Conjunto de brinquedos educativos', uk: 'Набір розвиваючих іграшок', ka: 'განმავითარებელი სათამაშოების ნაკრები' },
    'Кукла в платье': { en: 'Doll in a dress', es: 'Muñeca con vestido', pt: 'Boneca de vestido', uk: 'Лялька у сукні', ka: 'თოჯინა კაბაში' },
    'Радионяня Philips': { en: 'Philips baby monitor', es: 'Vigilabebés Philips', pt: 'Monitor de bebé Philips', uk: 'Радіоняня Philips', ka: 'რადიოძიძა Philips' },
    'Ванночка для купания': { en: 'Baby bath tub', es: 'Bañera de bebé', pt: 'Banheira de bebé', uk: 'Ванночка для купання', ka: 'საბავშვო აბაზანა' },
    'Электрокачели 4moms': { en: '4moms mamaRoo', es: 'Hamaca 4moms', pt: 'Espreguiçadeira 4moms', uk: 'Електрогойдалка 4moms', ka: 'ელექტრო საქანელა 4moms' },
    'Конструктор магнитный': { en: 'Magnetic building tiles', es: 'Bloques magnéticos', pt: 'Blocos magnéticos', uk: 'Магнітний конструктор', ka: 'მაგნიტური კონსტრუქტორი' },
    'Плед детский мягкий': { en: 'Soft baby blanket', es: 'Manta suave para bebé', pt: 'Manta macia para bebé', uk: 'Плед дитячий м’який', ka: 'საბავშვო რბილი პლედი' },
    'Кроссовки Nike 22р': { en: 'Nike sneakers size 22', es: 'Zapatillas Nike talla 22', pt: 'Sapatilhas Nike tam 22', uk: 'Кросівки Nike 22р', ka: 'Nike-ს ბოტასები 22ზ.' },
    'Машина на пульте': { en: 'RC car', es: 'Coche teledirigido', pt: 'Carro telecomandado', uk: 'Машина на пульті', ka: 'სათამაშო მანქანა პულტით' },
    'Самокат трехколесный': { en: '3-wheel scooter', es: 'Patinete de 3 ruedas', pt: 'Trotinete de 3 rodas', uk: 'Самокат триколісний', ka: 'სამბორბლიანი სკუტერი' },
    'Кухонный игровой набор': { en: 'Play kitchen set', es: 'Set de cocina de juguete', pt: 'Conjunto de cozinha de brinquedo', uk: 'Ігровий набір кухня', ka: 'სათამაშო სამზარეულოს ნაკრები' },
    'Книжки для малышей (5шт)': { en: 'Board books (5pcs)', es: 'Libros de cartón (5 uds)', pt: 'Livros de cartão (5 un)', uk: 'Книжки для малюків (5шт)', ka: 'წიგნები პატარებისთვის (5ც.)' },
    'Ищу зимний комбинезон 86см': { en: 'Looking for winter jumpsuit 86cm', es: 'Busco mono de invierno 86cm', pt: 'Procuro macacão de inverno 86cm', uk: 'Шукаю зимовий комбінезон 86см', ka: 'ვეძებ ზამთრის კომბინიზონს 86სმ' },
    'Нужен велосипед 14"': { en: 'Need 14" bicycle', es: 'Busco bicicleta de 14"', pt: 'Preciso de bicicleta 14"', uk: 'Потрібен велосипед 14"', ka: 'მჭირდება ველოსიპედი 14"' },
    'Приму в дар автокресло': { en: 'Looking for a free car seat', es: 'Busco silla auto de regalo', pt: 'Aceito doação de cadeira auto', uk: 'Прийму в дарунок автокрісло', ka: 'მივიღებ საჩუქრად ავტოკრესლოს' },
    'Ищу игрушки для песочницы': { en: 'Looking for sandbox toys', es: 'Busco juguetes de arena', pt: 'Procuro brinquedos de areia', uk: 'Шукаю іграшки для пісочниці', ka: 'ვეძებ სათამაშოებს სილისთვის' },
    'Нужна прогулочная коляска': { en: 'Need a lightweight stroller', es: 'Busco sillita de paseo', pt: 'Preciso de um carrinho leve', uk: 'Потрібна прогулянкова коляска', ka: 'მჭირდება სასეირნო ეტლი' },
    'Ищу развивающий коврик': { en: 'Looking for a play mat', es: 'Busco manta de actividades', pt: 'Procuro tapete de atividades', uk: 'Шукаю розвиваючий килимок', ka: 'ვეძებ განმავითარებელ ხალიჩას' },
    'Батуми': { en: 'Batumi', es: 'Batumi', pt: 'Batumi', uk: 'Батумі', ka: 'ბათუმი' },
    'Тбилиси': { en: 'Tbilisi', es: 'Tbilisi', pt: 'Tbilisi', uk: 'Тбілісі', ka: 'თბილისი' },
    'Москва': { en: 'Moscow', es: 'Moscú', pt: 'Moscovo', uk: 'Москва', ka: 'მოსკოვი' },
    'Барселона': { en: 'Barcelona', es: 'Barcelona', pt: 'Barcelona', uk: 'Барселона', ka: 'ბარსელონა' },
    'Киев': { en: 'Kyiv', es: 'Kiev', pt: 'Kiev', uk: 'Київ', ka: 'კიევი' },
    'Лиссабон': { en: 'Lisbon', es: 'Lisboa', pt: 'Lisboa', uk: 'Лісабон', ka: 'ლისაბონი' },
    'Мадрид': { en: 'Madrid', es: 'Madrid', pt: 'Madrid', uk: 'Мадрид', ka: 'მადრიდი' },
    'Казань': { en: 'Kazan', es: 'Kazán', pt: 'Cazã', uk: 'Казань', ka: 'ყაზანი' },
    'Старый город': { en: 'Old Town', es: 'Casco Antiguo', pt: 'Cidade Velha', uk: 'Старе місто', ka: 'ძველი ქალაქი' },
    'Сабуртало': { en: 'Saburtalo', es: 'Saburtalo', pt: 'Saburtalo', uk: 'Сабуртало', ka: 'საბურთალო' },
    'Эшампле': { en: 'Eixample', es: 'Eixample', pt: 'Eixample', uk: 'Ешампლე', ka: 'ეშამპლე' },
    'Хамовники': { en: 'Khamovniki', es: 'Khamovniki', pt: 'Khamovniki', uk: 'Хамовники', ka: 'ხამოვნიკი' },
    'Печерск': { en: 'Pechersk', es: 'Pechersk', pt: 'Pechersk', uk: 'Печерськ', ka: 'პეჩერსკი' },
    'Шиаду': { en: 'Chiado', es: 'Chiado', pt: 'Chiado', uk: 'Шіаду', ka: 'შიადუ' },
    'Андрей': { en: 'Andrew', es: 'Andrés', pt: 'André', uk: 'Андрій', ka: 'ანდრია' },
    'Мария': { en: 'Maria', es: 'María', pt: 'Maria', uk: 'Марія', ka: 'მარიამი' },
    'Давид': { en: 'David', es: 'David', pt: 'David', uk: 'Давид', ka: 'დავითი' },
    'Елена': { en: 'Elena', es: 'Elena', pt: 'Elena', uk: 'Олена', ka: 'ელენე' },
    'Анна': { en: 'Anna', es: 'Ana', pt: 'Ana', uk: 'Анна', ka: 'ანა' },
    'Тамара': { en: 'Tamara', es: 'Tamara', pt: 'Tamara', uk: 'Тамара', ka: 'თამარი' }
};

function translateStr(str) {
    if (currentLang === 'ru') return str;
    const trans = DEMO_TRANSLATIONS[str];
    if (trans && trans[currentLang]) return trans[currentLang];
    return str;
}

function translateDemo(item) {
    // Only translate demo items (owner_id == 0) and only if NOT FROM RU OR IF USER NOT RU
    if (item.owner_id != 0) return item;
    
    // Rule: "по странам только, если из россии объявление не надо переводить и тд"
    // Interpretation: If item is from RU, keep Russian. Otherwise translate.
    if (item.country === 'RU') return item;
    
    return {
        ...item,
        title: translateStr(item.title),
        city: translateStr(item.city),
        district: translateStr(item.district)
    };
}

let tickerMessages = [];
let tickerIndex = 0;
let tickerInterval = null;

async function loadActivities() {
    try {
        const res = await fetch('/api/activities');
        const data = await res.json();
        
        const textEl = document.getElementById('tickerText');
        if (!textEl) return;
        
        // Format messages
        tickerMessages = data.map(act => {
            const name = translateStr(act.user_name);
            const title = translateStr(act.item_title);
            if (act.activity_type === 'new_item') return `🎁 <b>${name}</b> ${t('activityNewItem')} ${title}`;
            if (act.activity_type === 'new_wish') return `🔍 <b>${name}</b> ${t('activityNewWish')} ${title}`;
            if (act.activity_type === 'item_given') return `💚 <b>${name}</b> ${t('activityGiven')} ${title}`;
            return `⚡ <b>${name}</b> — ${title}`;
        });
        
        // Fallback demo messages (fully localized)
        if (tickerMessages.length === 0) {
            tickerMessages = [
                `🎁 <b>${translateStr('Мария')}</b> ${t('activityNewItem')} ${translateStr('Коляска Bugaboo Fox 3')}`,
                `💚 <b>${translateStr('Елена')}</b> ${t('activityGiven')} ${translateStr('Автокресло Maxi-Cosi')}`,
                `🔍 <b>${translateStr('Давид')}</b> ${t('activityNewWish')} ${translateStr('Комбинезон зимний')}`,
                `🎁 <b>${translateStr('Анна')}</b> ${t('activityNewItem')} ${translateStr('LEGO Duplo набор')}`,
                `💚 <b>${translateStr('Тамара')}</b> ${t('activityGiven')} ${translateStr('Книжки для малышей (5шт)')}`,
            ];
        }
        
        // Show first message
        showTickerMessage();
        
        // Auto-cycle every 4 seconds
        if (tickerInterval) clearInterval(tickerInterval);
        tickerInterval = setInterval(showTickerMessage, 4000);
        
    } catch (e) { console.error("Ticker error", e); }
}

function showTickerMessage() {
    const textEl = document.getElementById('tickerText');
    if (!textEl || tickerMessages.length === 0) return;
    
    textEl.style.opacity = '0';
    textEl.style.transform = 'translateY(8px)';
    
    setTimeout(() => {
        textEl.innerHTML = tickerMessages[tickerIndex % tickerMessages.length];
        textEl.style.opacity = '1';
        textEl.style.transform = 'translateY(0)';
        tickerIndex++;
    }, 400);
}

function showFavorites() {
    isFavoritesOnly = true;
    switchView('home');
    loadItems();
}

// ==================== COLLAPSIBLE NAV ====================
let navCollapsed = false;
let touchStartY = 0;

function initCollapsibleNav() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    // We add swipe gestures to the nav bar and its handle (+)
    const fab = document.getElementById('fabAdd');
    
    // Using simple touch events for swipe
    nav.addEventListener('touchstart', e => touchStartY = e.touches[0].clientY, {passive: true});
    nav.addEventListener('touchend', e => {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchEndY - touchStartY;
        if (diff > 50 && !navCollapsed) toggleNav(true);
        else if (diff < -50 && navCollapsed) toggleNav(false);
    }, {passive: true});

    // Also allow clicking the FAB to toggle when collapsed
    if (fab) {
        fab.addEventListener('click', (e) => {
            if (navCollapsed) {
                e.preventDefault();
                e.stopPropagation();
                toggleNav(false);
            }
        });
    }
}

function toggleNav(collapse) {
    const nav = document.querySelector('nav');
    if (!nav) return;

    navCollapsed = collapse;
    if (collapse) {
        nav.style.transform = 'translateY(80%)';
        nav.style.opacity = '0.9';
    } else {
        nav.style.transform = 'translateY(0)';
        nav.style.opacity = '1';
    }
}

// Call init on load
document.addEventListener('DOMContentLoaded', () => {
    initCollapsibleNav();
});

