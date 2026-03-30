# api/index.py - оригинальный зелёный дизайн + мультиязычность
from flask import Flask, request, jsonify
import json
import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# In-memory storage
users_db = {}
items_db = {
    1: {'id': 1, 'title': 'Коляска Peg-Perego', 'category': 'gear', 'city': 'Москва', 'district': 'Центральный', 'image_url': 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=400', 'owner_id': 101, 'contact': '@mom_moscow'},
    2: {'id': 2, 'title': 'Детский комбинезон 6-9 мес', 'category': 'clothes', 'city': 'Москва', 'district': 'Арбат', 'image_url': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400', 'owner_id': 102, 'contact': '@dad_spb'},
    3: {'id': 3, 'title': 'Игрушка музыкальная', 'category': 'toys', 'city': 'Санкт-Петербург', 'district': 'Невский', 'image_url': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400', 'owner_id': 103, 'contact': '@toy_exchange'},
    4: {'id': 4, 'title': 'Автокресло Maxi-Cosi', 'category': 'seats', 'city': 'Киев', 'district': 'Печерск', 'image_url': 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=400', 'owner_id': 104, 'contact': '@kiev_mom'},
    5: {'id': 5, 'title': 'Платье нарядное 2 года', 'category': 'clothes', 'city': 'Москва', 'district': 'Таганка', 'image_url': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400', 'owner_id': 105, 'contact': '@dress_swap'},
    6: {'id': 6, 'title': 'Конструктор LEGO Duplo', 'category': 'toys', 'city': 'Екатеринбург', 'district': 'Центр', 'image_url': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400', 'owner_id': 106, 'contact': '@lego_ekb'},
    7: {'id': 7, 'title': 'Коляска-трость Babyzen', 'category': 'gear', 'city': 'Санкт-Петербург', 'district': 'Василеостровский', 'image_url': 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=400', 'owner_id': 107, 'contact': '@spb_stroller'},
    8: {'id': 8, 'title': 'Ботинки демисезонные 22 размер', 'category': 'clothes', 'city': 'Новосибирск', 'district': 'Ленинский', 'image_url': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400', 'owner_id': 108, 'contact': '@shoes_nsk'},
    9: {'id': 9, 'title': 'Кукла Barbie коллекционная', 'category': 'toys', 'city': 'Москва', 'district': 'Сокол', 'image_url': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400', 'owner_id': 109, 'contact': '@barbie_msk'},
    10: {'id': 10, 'title': 'Переноска Ergobaby', 'category': 'gear', 'city': 'Казань', 'district': 'Приволжский', 'image_url': 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=400', 'owner_id': 110, 'contact': '@ergo_kzn'},
    11: {'id': 11, 'title': 'Зимний комбинезон Reima 1 год', 'category': 'clothes', 'city': 'Москва', 'district': 'Марьино', 'image_url': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400', 'owner_id': 111, 'contact': '@reima_mom'},
    12: {'id': 12, 'title': 'Пазлы деревянные 24 шт', 'category': 'toys', 'city': 'Ростов-на-Дону', 'district': 'Центр', 'image_url': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400', 'owner_id': 112, 'contact': '@puzzle_rnd'},
    13: {'id': 13, 'title': 'Слинг-шарф Wrapsody', 'category': 'gear', 'city': 'Самара', 'district': 'Железнодорожный', 'image_url': 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=400', 'owner_id': 113, 'contact': '@sling_samara'},
    14: {'id': 14, 'title': 'Автокресло Cybex 9-36 кг', 'category': 'seats', 'city': 'Уфа', 'district': 'Советский', 'image_url': 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=400', 'owner_id': 114, 'contact': '@cybex_ufa'},
    15: {'id': 15, 'title': 'Костюмчик хлопковый 3 мес', 'category': 'clothes', 'city': 'Челябинск', 'district': 'Калининский', 'image_url': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400', 'owner_id': 115, 'contact': '@cotton_chel'},
    16: {'id': 16, 'title': 'Машинка каталка Chicco', 'category': 'toys', 'city': 'Омск', 'district': 'Центральный', 'image_url': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400', 'owner_id': 116, 'contact': '@chicco_omsk'},
    17: {'id': 17, 'title': 'Манеж-кроватка Graco', 'category': 'other', 'city': 'Воронеж', 'district': 'Левый берег', 'image_url': 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=400', 'owner_id': 117, 'contact': '@graco_vrn'},
    18: {'id': 18, 'title': 'Боди Carters набор 5 шт', 'category': 'clothes', 'city': 'Пермь', 'district': 'Индустриальный', 'image_url': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400', 'owner_id': 118, 'contact': '@carters_perm'},
    19: {'id': 19, 'title': 'Погремушки набор', 'category': 'toys', 'city': 'Волгоград', 'district': 'Центр', 'image_url': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400', 'owner_id': 119, 'contact': '@rattle_volg'},
    20: {'id': 20, 'title': 'Коляска 2в1 Noordi', 'category': 'gear', 'city': 'Краснодар', 'district': 'Центр', 'image_url': 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=400', 'owner_id': 120, 'contact': '@noordi_krd'},
}
user_locations = {}  # user_id -> {country, city}

BOT_TOKEN = os.environ.get("BOT_TOKEN", "8465311912:AAGEVTxHRr3-tc6vCBAUE_9Flni26APK-lk")
BASE_URL = "https://swapkids.org"

# Полные переводы для 6 языков
TRANSLATIONS = {
    'ru': {
        'welcome': "👋 Добро пожаловать в Swap Kids Global!\n\nЗдесь родители обмениваются детскими вещами по всему миру.\n📍 Выберите страну и город внутри приложения.\n\nНажмите кнопку ниже, чтобы начать 👇",
        'title': 'Swap Kids',
        'subtitle': 'Обмен детскими вещами',
        'search': 'Поиск вещей...',
        'all': 'Все',
        'clothes': 'Одежда',
        'toys': 'Игрушки',
        'gear': 'Коляски',
        'seats': 'Автокресла',
        'feed': 'Лента объявлений',
        'items_count': 'вещей',
        'no_items': 'Ничего не найдено',
        'change_filters': 'Попробуйте изменить фильтры',
        'my_item': 'Моё',
        'show_contact': 'Показать контакт',
        'delete': 'Удалить объявление',
        'premium_title': 'Премиум доступ',
        'premium_desc': 'Доступ к контактам закрыт. Оплатите единый взнос для просмотра всех контактов.',
        'price': '500 ⭐',
        'pay': 'Оплатить',
        'cancel': 'Отмена',
        'contact_seller': 'Контакт продавца',
        'write_telegram': 'Написать в Telegram',
        'close': 'Закрыть',
        'add_item': 'Добавить вещь',
        'photo': 'Фотография',
        'upload_photo': 'Нажмите для загрузки фото',
        'photo_loaded': 'Фото загружено',
        'name': 'Название',
        'name_placeholder': 'Например: Детская коляска',
        'category': 'Категория',
        'select_category': 'Выберите категорию',
        'clothes_cat': 'Одежда',
        'toys_cat': 'Игрушки',
        'gear_cat': 'Коляски и переноски',
        'seats_cat': 'Автокресла',
        'other_cat': 'Другое',
        'city': 'Город',
        'city_placeholder': 'Например: Батуми',
        'district': 'Район',
        'district_placeholder': 'Например: Сабуртало',
        'contact': 'Контакт (Telegram)',
        'contact_placeholder': '@username или +1...',
        'publish': 'Опубликовать',
        'success': 'Успешно!',
        'published': 'Объявление опубликовано! ✅',
        'deleted': 'Объявление удалено',
        'error': 'Ошибка',
        'select_location': '📍 Выберите локацию',
        'select_country': 'Выберите страну',
        'enter_city': 'Введите город',
        'apply': 'Применить',
        'country': 'Страна',
        'location_selected': 'Локация выбрана',
    },
    'en': {
        'welcome': "👋 Welcome to Swap Kids Global!\n\nParents exchange children's items worldwide here.\n📍 Select your country and city inside the app.\n\nTap the button below to start 👇",
        'title': 'Swap Kids',
        'subtitle': 'Exchange kids items',
        'search': 'Search items...',
        'all': 'All',
        'clothes': 'Clothes',
        'toys': 'Toys',
        'gear': 'Strollers',
        'seats': 'Car seats',
        'feed': 'Items feed',
        'items_count': 'items',
        'no_items': 'Nothing found',
        'change_filters': 'Try changing filters',
        'my_item': 'Mine',
        'show_contact': 'Show contact',
        'delete': 'Delete listing',
        'premium_title': 'Premium Access',
        'premium_desc': 'Contact access is closed. Pay a one-time fee to view all contacts.',
        'price': '500 ⭐',
        'pay': 'Pay',
        'cancel': 'Cancel',
        'contact_seller': 'Seller contact',
        'write_telegram': 'Write on Telegram',
        'close': 'Close',
        'add_item': 'Add item',
        'photo': 'Photo',
        'upload_photo': 'Click to upload photo',
        'photo_loaded': 'Photo loaded',
        'name': 'Name',
        'name_placeholder': 'e.g. Baby stroller',
        'category': 'Category',
        'select_category': 'Select category',
        'clothes_cat': 'Clothes',
        'toys_cat': 'Toys',
        'gear_cat': 'Strollers & carriers',
        'seats_cat': 'Car seats',
        'other_cat': 'Other',
        'city': 'City',
        'city_placeholder': 'e.g. Barcelona',
        'district': 'District',
        'district_placeholder': 'e.g. Downtown',
        'contact': 'Contact (Telegram)',
        'contact_placeholder': '@username or +1...',
        'publish': 'Publish',
        'success': 'Success!',
        'published': 'Item published! ✅',
        'deleted': 'Item deleted',
        'error': 'Error',
        'select_location': '📍 Select location',
        'select_country': 'Select country',
        'enter_city': 'Enter city',
        'apply': 'Apply',
        'country': 'Country',
        'location_selected': 'Location selected',
    },
    'es': {
        'welcome': "👋 ¡Bienvenido a Swap Kids Global!\n\nAquí los padres intercambian artículos infantiles en todo el mundo.\n📍 Selecciona tu país y ciudad dentro de la app.\n\nToca el botón para comenzar 👇",
        'title': 'Swap Kids',
        'subtitle': 'Intercambio infantil',
        'search': 'Buscar artículos...',
        'all': 'Todos',
        'clothes': 'Ropa',
        'toys': 'Juguetes',
        'gear': 'Carritos',
        'seats': 'Sillas auto',
        'feed': 'Artículos',
        'items_count': 'artículos',
        'no_items': 'Nada encontrado',
        'select_location': '📍 Seleccionar ubicación',
        'apply': 'Aplicar',
        'country': 'País',
        'city': 'Ciudad',
    },
    'pt': {
        'welcome': "👋 Bem-vindo ao Swap Kids Global!\n\nAqui os pais trocam itens infantis em todo o mundo.\n📍 Selecione seu país e cidade dentro do app.\n\nToque no botão para começar 👇",
        'title': 'Swap Kids',
        'subtitle': 'Troca infantil',
        'search': 'Procurar itens...',
        'all': 'Todos',
        'clothes': 'Roupas',
        'toys': 'Brinquedos',
        'gear': 'Carrinhos',
        'seats': 'Cadeiras',
        'feed': 'Itens',
        'items_count': 'itens',
        'no_items': 'Nada encontrado',
        'select_location': '📍 Selecionar localização',
        'apply': 'Aplicar',
        'country': 'País',
        'city': 'Cidade',
    },
    'uk': {
        'welcome': "👋 Ласкаво просимо до Swap Kids Global!\n\nТут батьки обмінюються дитячими речами по всьому світу.\n📍 Виберіть країну та місто всередині додатку.\n\nНатисніть кнопку нижче, щоб почати 👇",
        'title': 'Swap Kids',
        'subtitle': 'Обмін дитячими речами',
        'search': 'Пошук речей...',
        'all': 'Всі',
        'clothes': 'Одяг',
        'toys': 'Іграшки',
        'gear': 'Коляски',
        'seats': 'Автокрісла',
        'feed': 'Оголошення',
        'items_count': 'речей',
        'no_items': 'Нічого не знайдено',
        'select_location': '📍 Виберіть локацію',
        'apply': 'Застосувати',
        'country': 'Країна',
        'city': 'Місто',
    },
    'ka': {
        'welcome': "👋 კეთილი იყოს თქვენი მობრძანება Swap Kids Global-ში!\n\nაქ მშობლები აცვლიან ბავშვთა ნივთებს მთელს მსოფლიოში.\n📍 აირჩიეთ თქვენი ქვეყანა და ქალაქი აპლიკაციაში.\n\nდააჭირეთ ღილაკს დასაწყებად 👇",
        'title': 'Swap Kids',
        'subtitle': 'ბავშვთა ნივთების გაცვლა',
        'search': 'ნივთების ძიება...',
        'all': 'ყველა',
        'clothes': 'ტანსაცმელი',
        'toys': 'სათამაშოები',
        'gear': 'კალოსკები',
        'seats': 'ავტოკრესლები',
        'feed': 'განცხადებები',
        'items_count': 'ნივთი',
        'no_items': 'ვერაფერი მოიძებნა',
        'select_location': '📍 აირჩიეთ ლოკაცია',
        'apply': 'გამოყენება',
        'country': 'ქვეყანა',
        'city': 'ქალაქი',
    }
}

# Список стран с флагами
COUNTRIES = [
    ('RU', '🇷🇺 Russia'), ('UA', '🇺🇦 Ukraine'), ('BY', '🇧🇾 Belarus'),
    ('KZ', '🇰🇿 Kazakhstan'), ('GE', '🇬🇪 Georgia'), ('AZ', '🇦🇿 Azerbaijan'),
    ('AM', '🇦🇲 Armenia'), ('MD', '🇲🇩 Moldova'), ('UZ', '🇺🇿 Uzbekistan'),
    ('KG', '🇰🇬 Kyrgyzstan'), ('TJ', '🇹🇯 Tajikistan'), ('TM', '🇹🇲 Turkmenistan'),
    ('ES', '🇪🇸 Spain'), ('PT', '🇵🇹 Portugal'), ('PL', '🇵🇱 Poland'),
    ('DE', '🇩🇪 Germany'), ('FR', '🇫🇷 France'), ('IT', '🇮🇹 Italy'),
    ('GB', '🇬🇧 UK'), ('US', '🇺🇸 USA'), ('CA', '🇨🇦 Canada'),
    ('BR', '🇧🇷 Brazil'), ('MX', '🇲🇽 Mexico'), ('AR', '🇦🇷 Argentina'),
    ('IL', '🇮🇱 Israel'), ('TR', '🇹🇷 Turkey'), ('AE', '🇦🇪 UAE'),
    ('SA', '🇸🇦 Saudi Arabia'), ('EG', '🇪🇬 Egypt'), ('ZA', '🇿🇦 South Africa'),
    ('AU', '🇦🇺 Australia'), ('NZ', '🇳🇿 New Zealand'), ('JP', '🇯🇵 Japan'),
    ('KR', '🇰🇷 South Korea'), ('CN', '🇨🇳 China'), ('IN', '🇮🇳 India'),
    ('ID', '🇮🇩 Indonesia'), ('TH', '🇹🇭 Thailand'), ('VN', '🇻🇳 Vietnam'),
    ('MY', '🇲🇾 Malaysia'), ('PH', '🇵🇭 Philippines'), ('SG', '🇸🇬 Singapore'),
    ('CY', '🇨🇾 Cyprus'), ('GR', '🇬🇷 Greece'), ('BG', '🇧🇬 Bulgaria'),
    ('RO', '🇷🇴 Romania'), ('HU', '🇭🇺 Hungary'), ('CZ', '🇨🇿 Czech Republic'),
    ('SK', '🇸🇰 Slovakia'), ('AT', '🇦🇹 Austria'), ('CH', '🇨🇭 Switzerland'),
    ('NL', '🇳🇱 Netherlands'), ('BE', '🇧🇪 Belgium'), ('SE', '🇸🇪 Sweden'),
    ('NO', '🇳🇴 Norway'), ('DK', '🇩🇰 Denmark'), ('FI', '🇫🇮 Finland'),
    ('EE', '🇪🇪 Estonia'), ('LV', '🇱🇻 Latvia'), ('LT', '🇱🇹 Lithuania'),
    ('HR', '🇭🇷 Croatia'), ('SI', '🇸🇮 Slovenia'), ('BA', '🇧🇦 Bosnia'),
    ('RS', '🇷🇸 Serbia'), ('ME', '🇲🇪 Montenegro'), ('MK', '🇲🇰 Macedonia'),
    ('AL', '🇦🇱 Albania'),
]

def generate_html():
    """Генерация HTML с оригинальным зелёным дизайном"""
    countries_html = ''.join([f'<option value="{code}">{name}</option>' for code, name in COUNTRIES])
    
    return f'''<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Swap Kids Global</title>
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {{
            theme: {{
                extend: {{
                    colors: {{
                        teal: {{
                            50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4',
                            400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e',
                            800: '#115e59', 900: '#134e4a',
                        }}
                    }},
                    fontFamily: {{
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                    }}
                }}
            }}
        }}
    </script>
    <style>
        * {{ -webkit-tap-highlight-color: transparent; }}
        body {{
            font-family: 'Inter', system-ui, sans-serif;
            background: linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 50%, #f0f9ff 100%);
            min-height: 100vh;
        }}
        .card-hover {{
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }}
        .card-hover:hover {{
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }}
        .slide-up {{
            animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }}
        @keyframes slideUp {{
            from {{ transform: translateY(100%); }}
            to {{ transform: translateY(0); }}
        }}
        .item-card {{
            animation: fadeInUp 0.5s ease-out forwards;
        }}
        @keyframes fadeInUp {{
            from {{ opacity: 0; transform: translateY(20px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}
        .loading-spinner {{
            border: 3px solid #f3f3f3;
            border-top: 3px solid #14b8a6;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
        }}
        @keyframes spin {{
            0% {{ transform: rotate(0deg); }}
            100% {{ transform: rotate(360deg); }}
        }}
        .scrollbar-hide::-webkit-scrollbar {{ display: none; }}
        .scrollbar-hide {{ -ms-overflow-style: none; scrollbar-width: none; }}
    </style>
</head>
<body class="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 min-h-screen p-4">

    <!-- Phone Container -->
    <div class="max-w-md mx-auto bg-white rounded-[2.5rem] overflow-hidden min-h-[800px] mt-4 mb-8 relative shadow-2xl">
        
        <!-- Header -->
        <div class="bg-gradient-to-r from-teal-600 to-teal-500 px-6 pb-6 pt-4">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-white flex items-center gap-2">
                        <i class="fas fa-exchange-alt"></i>
                        <span id="appTitle">Swap Kids</span>
                    </h1>
                    <p class="text-teal-100 text-sm mt-1" id="appSubtitle">Обмен детскими вещами</p>
                </div>
                <div class="flex items-center gap-2">
                    <!-- Language Selector -->
                    <select id="langSelector" onchange="changeLanguage()" class="bg-white/20 text-white text-sm rounded-full px-3 py-1 border-0 outline-none cursor-pointer">
                        <option value="ru" class="text-gray-800">🇷🇺 RU</option>
                        <option value="en" class="text-gray-800">🇺🇸 EN</option>
                        <option value="es" class="text-gray-800">🇪🇸 ES</option>
                        <option value="pt" class="text-gray-800">🇵🇹 PT</option>
                        <option value="uk" class="text-gray-800">🇺🇦 UK</option>
                        <option value="ka" class="text-gray-800">🇬🇪 KA</option>
                    </select>
                    <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                        <i class="fas fa-gift text-white text-lg"></i>
                    </div>
                </div>
            </div>
            
            <!-- Search Bar -->
            <div class="mt-4 relative">
                <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-teal-400"></i>
                <input type="text" id="searchInput" placeholder="Поиск вещей..." 
                       class="w-full pl-11 pr-4 py-3 rounded-xl bg-white/95 border-0 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"/>
            </div>
        </div>

        <!-- Location Bar -->
        <div class="px-4 py-3 bg-white border-b border-gray-100">
            <div class="flex items-center justify-between">
                <span id="locationDisplay" class="text-sm text-gray-600">
                    <i class="fas fa-map-marker-alt text-teal-500 mr-1"></i>
                    📍 Выберите локацию
                </span>
                <button onclick="showLocationModal()" class="text-teal-600 text-sm font-medium hover:text-teal-700">
                    <i class="fas fa-edit mr-1"></i>
                    <span id="changeLocationBtn">Изменить</span>
                </button>
            </div>
        </div>

        <!-- Categories -->
        <div class="px-4 py-4 bg-white border-b border-gray-100">
            <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" id="categories">
                <button class="category-btn active px-4 py-2 bg-teal-500 text-white rounded-full text-sm font-medium whitespace-nowrap transition-all" data-category="all">
                    Все
                </button>
                <button class="category-btn px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium whitespace-nowrap transition-all hover:bg-gray-200" data-category="clothes">
                    <i class="fas fa-tshirt mr-1"></i>Одежда
                </button>
                <button class="category-btn px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium whitespace-nowrap transition-all hover:bg-gray-200" data-category="toys">
                    <i class="fas fa-gamepad mr-1"></i>Игрушки
                </button>
                <button class="category-btn px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium whitespace-nowrap transition-all hover:bg-gray-200" data-category="gear">
                    <i class="fas fa-baby-carriage mr-1"></i>Коляски
                </button>
                <button class="category-btn px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium whitespace-nowrap transition-all hover:bg-gray-200" data-category="seats">
                    <i class="fas fa-chair mr-1"></i>Автокресла
                </button>
            </div>
        </div>

        <!-- Welcome Message (First Visit) -->
        <div id="welcomeMessage" class="px-4 py-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-100">
            <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <i class="fas fa-hand-wave"></i>
                </div>
                <div>
                    <h3 class="font-semibold text-gray-800" id="welcomeTitle">Добро пожаловать! 👋</h3>
                    <p class="text-sm text-gray-700 mt-1 font-medium" id="welcomeSubtitle">
                        Здесь родители меняются детскими вещами по всему миру.
                    </p>
                    <p class="text-sm text-gray-600 mt-2" id="welcomeText">
                        Выберите свою страну и город, чтобы видеть объявления от родителей рядом с вами.
                    </p>
                    <button onclick="showLocationModal()" id="selectLocationBtn" class="mt-2 text-teal-600 text-sm font-medium hover:text-teal-700">
                        <i class="fas fa-map-marker-alt mr-1"></i>
                        <span id="selectLocationBtnText">Выбрать локацию</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Main Content - Items Grid -->
        <div class="px-4 py-4 pb-24 overflow-y-auto" style="max-height: calc(100vh - 320px);">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold text-gray-800" id="feedTitle">Лента объявлений</h2>
                <span class="text-sm text-gray-500" id="itemsCount">0 вещей</span>
            </div>
            <div id="itemsGrid" class="grid grid-cols-2 gap-3">
                <!-- Items will be rendered here -->
            </div>
        </div>

        <!-- Floating Action Button (Add Item) -->
        <button id="fabAdd" class="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full shadow-lg shadow-teal-500/40 flex items-center justify-center text-white text-2xl z-40 transition-transform hover:scale-110">
            <i class="fas fa-plus"></i>
        </button>

    </div>

    <!-- Location Selection Modal -->
    <div id="locationModal" class="fixed inset-0 z-50 hidden">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeLocationModal()"></div>
        <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-w-md mx-auto slide-up p-6">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-gray-800" id="locationModalTitle">📍 Выберите локацию</h3>
                <button onclick="closeLocationModal()" class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2" id="countryLabel">Страна:</label>
                <select id="countrySelect" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-white">
                    <option value="">Выберите страну...</option>
                    {countries_html}
                </select>
            </div>
            
            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2" id="cityLabel">Город:</label>
                <input type="text" id="cityInput" placeholder="Введите город..." 
                       class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"/>
            </div>
            
            <button onclick="saveLocation()" class="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all" id="applyBtn">
                Применить
            </button>
        </div>
    </div>

    <!-- Item Detail Modal -->
    <div id="itemModal" class="fixed inset-0 z-50 hidden">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeItemModal()"></div>
        <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-w-md mx-auto max-h-[90vh] overflow-y-auto slide-up">
            <div class="relative">
                <img id="modalImage" src="" alt="" class="w-full h-64 object-cover"/>
                <button onclick="closeItemModal()" class="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="p-6">
                <h3 id="modalTitle" class="text-xl font-bold text-gray-800 mb-2"></h3>
                <div class="flex items-center gap-2 text-gray-500 mb-4">
                    <i class="fas fa-map-marker-alt text-teal-500"></i>
                    <span id="modalLocation"></span>
                </div>
                <button onclick="showContact()" class="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2">
                    <i class="fas fa-phone"></i>
                    <span id="showContactBtn">Показать контакт</span>
                </button>
            </div>
        </div>
    </div>

    <!-- Add Item Modal -->
    <div id="addModal" class="fixed inset-0 z-50 hidden">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeAddModal()"></div>
        <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-w-md mx-auto h-[90vh] overflow-y-auto slide-up">
            <div class="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
                <h3 class="text-xl font-bold text-gray-800" id="addItemTitle">Добавить вещь</h3>
                <button onclick="closeAddModal()" class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="p-6">
                <form id="addItemForm" onsubmit="submitItem(event)">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2" id="photoLabel">Фотография</label>
                        <div class="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-teal-500 hover:bg-teal-50 transition-all" onclick="document.getElementById('itemPhoto').click()">
                            <i class="fas fa-camera text-4xl text-gray-400 mb-2"></i>
                            <p class="text-gray-500 text-sm" id="uploadPhotoText">Нажмите для загрузки фото</p>
                        </div>
                        <input type="file" id="itemPhoto" class="hidden" accept="image/*">
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2" id="nameLabel">Название</label>
                        <input type="text" id="itemTitle" required placeholder="Например: Детская коляска" 
                               class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"/>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2" id="categoryLabel">Категория</label>
                        <select id="itemCategory" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-white">
                            <option value="" id="selectCategory">Выберите категорию</option>
                            <option value="clothes" id="optClothes">Одежда</option>
                            <option value="toys" id="optToys">Игрушки</option>
                            <option value="gear" id="optGear">Коляски и переноски</option>
                            <option value="seats" id="optSeats">Автокресла</option>
                            <option value="other" id="optOther">Другое</option>
                        </select>
                    </div>
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2" id="contactLabel">Контакт (Telegram)</label>
                        <input type="text" id="itemContact" required placeholder="@username или +1..." 
                               class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"/>
                    </div>
                    <button type="submit" class="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all" id="publishBtn">
                        Опубликовать
                    </button>
                </form>
            </div>
        </div>
    </div>

    <script>
        // Telegram WebApp
        const tg = window.Telegram.WebApp;
        tg.expand();
        tg.ready();
        
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('user_id') || tg.initDataUnsafe.user?.id || '0';
        const urlLang = urlParams.get('lang') || 'ru';
        
        // State
        let currentLang = localStorage.getItem('lang') || urlLang;
        let currentCountry = localStorage.getItem('country') || '';
        let currentCity = localStorage.getItem('city') || '';
        
        // Translations object (embedded to avoid API calls)
        const texts = {{
            'ru': {{
                'appSubtitle': 'Обмен детскими вещами',
                'search': 'Поиск вещей...',
                'all': 'Все', 'clothes': 'Одежда', 'toys': 'Игрушки', 'gear': 'Коляски', 'seats': 'Автокресла',
                'feedTitle': 'Лента объявлений', 'itemsCount': 'вещей',
                'noItems': 'Ничего не найдено', 'change_filters': 'Попробуйте изменить фильтры',
                'welcomeTitle': 'Добро пожаловать! 👋',
                'welcomeSubtitle': 'Здесь родители меняются детскими вещами по всему миру.',
                'welcomeText': 'Выберите свою страну и город, чтобы видеть объявления от родителей рядом с вами.',
                'contact_seller': 'Контакт продавца',
                'selectLocationBtn': 'Выбрать локацию',
                'changeLocationBtn': 'Изменить',
                'locationDisplay': '📍 Выберите локацию',
                'locationModalTitle': '📍 Выберите локацию',
                'countryLabel': 'Страна:', 'cityLabel': 'Город:',
                'applyBtn': 'Применить',
                'addItemTitle': 'Добавить вещь',
                'photoLabel': 'Фотография', 'uploadPhotoText': 'Нажмите для загрузки фото',
                'nameLabel': 'Название', 'categoryLabel': 'Категория',
                'selectCategory': 'Выберите категорию',
                'optClothes': 'Одежда', 'optToys': 'Игрушки', 'optGear': 'Коляски и переноски', 'optSeats': 'Автокресла', 'optOther': 'Другое',
                'contactLabel': 'Контакт (Telegram)',
                'publishBtn': 'Опубликовать',
                'showContactBtn': 'Показать контакт'
            }},
            'en': {{
                'appSubtitle': 'Exchange kids items',
                'search': 'Search items...',
                'all': 'All', 'clothes': 'Clothes', 'toys': 'Toys', 'gear': 'Strollers', 'seats': 'Car seats',
                'feedTitle': 'Items feed', 'itemsCount': 'items',
                'noItems': 'Nothing found', 'change_filters': 'Try changing filters',
                'welcomeTitle': 'Welcome! 👋',
                'welcomeSubtitle': 'Parents exchange children\'s items worldwide here.',
                'welcomeText': 'Select your country and city to see listings from parents near you.',
                'selectLocationBtn': 'Select location',
                'changeLocationBtn': 'Change',
                'locationDisplay': '📍 Select location',
                'locationModalTitle': '📍 Select location',
                'countryLabel': 'Country:', 'cityLabel': 'City:',
                'applyBtn': 'Apply',
                'addItemTitle': 'Add item',
                'photoLabel': 'Photo', 'uploadPhotoText': 'Click to upload photo',
                'nameLabel': 'Name', 'categoryLabel': 'Category',
                'selectCategory': 'Select category',
                'optClothes': 'Clothes', 'optToys': 'Toys', 'optGear': 'Strollers & carriers', 'optSeats': 'Car seats', 'optOther': 'Other',
                'contactLabel': 'Contact (Telegram)',
                'publishBtn': 'Publish',
                'showContactBtn': 'Show contact'
            }},
            'es': {{
                'appSubtitle': 'Intercambio infantil',
                'search': 'Buscar artículos...',
                'all': 'Todos', 'clothes': 'Ropa', 'toys': 'Juguetes', 'gear': 'Carritos', 'seats': 'Sillas auto',
                'feedTitle': 'Artículos', 'itemsCount': 'artículos',
                'noItems': 'Nada encontrado',
                'welcomeTitle': '¡Bienvenido! 👋',
                'welcomeSubtitle': 'Aquí los padres intercambian artículos infantiles en todo el mundo.',
                'welcomeText': 'Selecciona tu país y ciudad para ver anuncios de padres cerca de ti.',
                'selectLocationBtn': 'Seleccionar ubicación',
                'changeLocationBtn': 'Cambiar',
                'locationDisplay': '📍 Seleccionar ubicación',
                'applyBtn': 'Aplicar',
                'addItemTitle': 'Agregar artículo',
                'publishBtn': 'Publicar'
            }},
            'pt': {{
                'appSubtitle': 'Troca infantil',
                'search': 'Procurar itens...',
                'all': 'Todos', 'clothes': 'Roupas', 'toys': 'Brinquedos', 'gear': 'Carrinhos', 'seats': 'Cadeiras',
                'feedTitle': 'Itens', 'itemsCount': 'itens',
                'noItems': 'Nada encontrado',
                'welcomeTitle': 'Bem-vindo! 👋',
                'welcomeSubtitle': 'Aqui os pais trocam itens infantis em todo o mundo.',
                'welcomeText': 'Selecione seu país e cidade para ver anúncios de pais perto de você.',
                'selectLocationBtn': 'Selecionar localização',
                'changeLocationBtn': 'Mudar',
                'locationDisplay': '📍 Selecionar localização',
                'applyBtn': 'Aplicar',
                'addItemTitle': 'Adicionar item',
                'publishBtn': 'Publicar'
            }},
            'uk': {{
                'appSubtitle': 'Обмін дитячими речами',
                'search': 'Пошук речей...',
                'all': 'Всі', 'clothes': 'Одяг', 'toys': 'Іграшки', 'gear': 'Коляски', 'seats': 'Автокрісла',
                'feedTitle': 'Оголошення', 'itemsCount': 'речей',
                'noItems': 'Нічого не знайдено',
                'welcomeTitle': 'Ласкаво просимо! 👋',
                'welcomeSubtitle': 'Тут батьки обмінюються дитячими речами по всьому світу.',
                'welcomeText': 'Виберіть країну та місто, щоб бачити оголошення від батьків поруч з вами.',
                'selectLocationBtn': 'Вибрати локацію',
                'changeLocationBtn': 'Змінити',
                'locationDisplay': '📍 Виберіть локацію',
                'applyBtn': 'Застосувати',
                'addItemTitle': 'Додати річ',
                'publishBtn': 'Опублікувати'
            }},
            'ka': {{
                'appSubtitle': 'ბავშვთა ნივთების გაცვლა',
                'search': 'ნივთების ძიება...',
                'all': 'ყველა', 'clothes': 'ტანსაცმელი', 'toys': 'სათამაშოები', 'gear': 'კალოსკები', 'seats': 'ავტოკრესლები',
                'feedTitle': 'განცხადებები', 'itemsCount': 'ნივთი',
                'noItems': 'ვერაფერი მოიძებნა',
                'welcomeTitle': 'კეთილი იყოს თქვენი მობრძანება! 👋',
                'welcomeSubtitle': 'აქ მშობლები აცვლიან ბავშვთა ნივთებს მთელს მსოფლიოში.',
                'welcomeText': 'აირჩიეთ ქვეყანა და ქალაქი, რომ ნახოთ განცხადებები მშობლებისგან თქვენს ახლოს.',
                'selectLocationBtn': 'აირჩიეთ ლოკაცია',
                'changeLocationBtn': 'შეცვლა',
                'locationDisplay': '📍 აირჩიეთ ლოკაცია',
                'applyBtn': 'გამოყენება',
                'addItemTitle': 'ნივთის დამატება',
                'publishBtn': 'გამოქვეყნება'
            }}
        }};
        
        function applyTranslations() {{
            const t = texts[currentLang] || texts['ru'];
            
            // Update all elements
            document.getElementById('appSubtitle').textContent = t.appSubtitle;
            document.getElementById('searchInput').placeholder = t.search;
            
            // Categories
            const catBtns = document.querySelectorAll('.category-btn');
            catBtns[0].textContent = t.all;
            catBtns[1].innerHTML = '<i class="fas fa-tshirt mr-1"></i>' + t.clothes;
            catBtns[2].innerHTML = '<i class="fas fa-gamepad mr-1"></i>' + t.toys;
            catBtns[3].innerHTML = '<i class="fas fa-baby-carriage mr-1"></i>' + t.gear;
            catBtns[4].innerHTML = '<i class="fas fa-chair mr-1"></i>' + t.seats;
            
            document.getElementById('feedTitle').textContent = t.feedTitle;
            document.getElementById('welcomeTitle').textContent = t.welcomeTitle;
            document.getElementById('welcomeSubtitle').textContent = t.welcomeSubtitle;
            document.getElementById('welcomeText').textContent = t.welcomeText;
            document.getElementById('selectLocationBtnText').textContent = t.selectLocationBtn;
            document.getElementById('changeLocationBtn').textContent = t.changeLocationBtn;
            document.getElementById('locationModalTitle').textContent = t.locationModalTitle;
            document.getElementById('countryLabel').textContent = t.countryLabel;
            document.getElementById('cityLabel').textContent = t.cityLabel;
            document.getElementById('applyBtn').textContent = t.applyBtn;
            document.getElementById('addItemTitle').textContent = t.addItemTitle;
            document.getElementById('photoLabel').textContent = t.photoLabel;
            document.getElementById('uploadPhotoText').textContent = t.uploadPhotoText;
            document.getElementById('nameLabel').textContent = t.nameLabel;
            document.getElementById('categoryLabel').textContent = t.categoryLabel;
            document.getElementById('selectCategory').textContent = t.selectCategory;
            document.getElementById('optClothes').textContent = t.optClothes;
            document.getElementById('optToys').textContent = t.optToys;
            document.getElementById('optGear').textContent = t.optGear;
            document.getElementById('optSeats').textContent = t.optSeats;
            document.getElementById('optOther').textContent = t.optOther;
            document.getElementById('contactLabel').textContent = t.contactLabel;
            document.getElementById('publishBtn').textContent = t.publishBtn;
            document.getElementById('showContactBtn').textContent = t.showContactBtn;
            
            // Update location display if selected
            if (currentCountry && currentCity) {{
                document.getElementById('locationDisplay').innerHTML = 
                    '<i class="fas fa-map-marker-alt text-teal-500 mr-1"></i>📍 ' + currentCountry + ', ' + currentCity;
            }} else {{
                document.getElementById('locationDisplay').innerHTML = 
                    '<i class="fas fa-map-marker-alt text-teal-500 mr-1"></i>' + t.locationDisplay;
            }}
        }}
        
        function changeLanguage() {{
            currentLang = document.getElementById('langSelector').value;
            localStorage.setItem('lang', currentLang);
            applyTranslations();
        }}
        
        function showLocationModal() {{
            document.getElementById('locationModal').classList.remove('hidden');
            if (currentCountry) document.getElementById('countrySelect').value = currentCountry;
            if (currentCity) document.getElementById('cityInput').value = currentCity;
        }}
        
        function closeLocationModal() {{
            document.getElementById('locationModal').classList.add('hidden');
        }}
        
        function saveLocation() {{
            const country = document.getElementById('countrySelect').value;
            const city = document.getElementById('cityInput').value.trim();
            
            if (country && city) {{
                currentCountry = country;
                currentCity = city;
                localStorage.setItem('country', country);
                localStorage.setItem('city', city);
                applyTranslations();
                closeLocationModal();
                
                // Hide welcome message
                document.getElementById('welcomeMessage').style.display = 'none';
                
                tg.showAlert(texts[currentLang].locationDisplay + ': ' + country + ', ' + city);
            }}
        }}
        
        function openAddModal() {{
            document.getElementById('addModal').classList.remove('hidden');
        }}
        
        function closeAddModal() {{
            document.getElementById('addModal').classList.add('hidden');
        }}
        
        let currentItem = null;
        
        function openItemModal(itemId) {{
            const item = allItems.find(i => i.id === itemId);
            if (!item) return;
            
            currentItem = item;
            
            document.getElementById('modalImage').src = item.image_url || `https://placehold.co/600x400/e0f2fe/0d9488?text=${{encodeURIComponent(item.title)}}`;
            document.getElementById('modalTitle').textContent = item.title;
            document.getElementById('modalLocation').textContent = `${{item.city || 'Город не указан'}}${{item.district ? ', ' + item.district : ''}}`;
            
            document.getElementById('itemModal').classList.remove('hidden');
        }}
        
        function closeItemModal() {{
            document.getElementById('itemModal').classList.add('hidden');
        }}
        
        async function showContact() {{
            if (!currentItem) return;
            
            try {{
                const res = await fetch(`/api/contact?user_id=${{userId}}&item_id=${{currentItem.id}}`);
                const data = await res.json();
                
                if (data.status === 'paid') {{
                    tg.showAlert(`${{texts[currentLang].contact_seller}}: ${{data.contact}}`);
                }} else {{
                    document.getElementById('premiumModal').classList.remove('hidden');
                }}
            }} catch (e) {{
                console.error('Error:', e);
                tg.showAlert('Error loading contact');
            }}
        }}
        
        function closePremiumModal() {{
            document.getElementById('premiumModal').classList.add('hidden');
        }}
        
        async function processPayment() {{
            try {{
                const res = await fetch(`/api/invoice?user_id=${{userId}}`);
                const data = await res.json();
                
                if (data.ok) {{
                    tg.showAlert('Invoice sent! Check your Telegram.');
                    closePremiumModal();
                }} else {{
                    tg.showAlert('Error creating invoice');
                }}
            }} catch (e) {{
                console.error('Error:', e);
                tg.showAlert('Payment error');
            }}
        }}
        
        function submitItem(e) {{
            e.preventDefault();
            tg.showAlert('Item added! (Demo mode)');
            closeAddModal();
        }}
        
        // Filter items
        let allItems = [];
        let filteredItems = [];
        let currentFilter = 'all';
        let currentSearch = '';
        
        function filterAndRenderItems() {{
            filteredItems = allItems.filter(item => {{
                // Filter by category
                if (currentFilter !== 'all' && item.category !== currentFilter) {{
                    return false;
                }}
                
                // Filter by search
                if (currentSearch) {{
                    const searchLower = currentSearch.toLowerCase();
                    const titleMatch = item.title && item.title.toLowerCase().includes(searchLower);
                    const cityMatch = item.city && item.city.toLowerCase().includes(searchLower);
                    const districtMatch = item.district && item.district.toLowerCase().includes(searchLower);
                    if (!titleMatch && !cityMatch && !districtMatch) {{
                        return false;
                    }}
                }}
                
                return true;
            }});
            
            renderItems();
        }}
        
        function renderItems() {{
            const grid = document.getElementById('itemsGrid');
            if (!grid) {{
                console.error('itemsGrid not found');
                return;
            }}
            const t = texts[currentLang] || texts['ru'];
            const itemsCountEl = document.getElementById('itemsCount');
            if (itemsCountEl) {{
                itemsCountEl.textContent = `${{filteredItems.length}} ${{t.itemsCount}}`;
            }}
            
            if (filteredItems.length === 0) {{
                grid.innerHTML = `
                    <div class="col-span-2 text-center py-12">
                        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-search text-gray-300 text-3xl"></i>
                        </div>
                        <p class="text-gray-500">${{t.noItems}}</p>
                        <p class="text-gray-400 text-sm mt-1">${{t.change_filters}}</p>
                    </div>
                `;
                return;
            }}
            
            grid.innerHTML = filteredItems.map((item, index) => `
                <div class="item-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover cursor-pointer" 
                     style="animation-delay: ${{index * 0.05}}s" 
                     onclick="openItemModal(${{item.id}})">
                    <div class="relative">
                        <img src="${{item.image_url || 'https://placehold.co/400x300/e0f2fe/0d9488?text=' + encodeURIComponent(item.title)}}" 
                             alt="${{item.title}}" 
                             class="w-full h-32 object-cover" 
                             loading="lazy">
                    </div>
                    <div class="p-3">
                        <h3 class="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">${{item.title}}</h3>
                        <div class="flex items-center gap-1 text-gray-500 text-xs">
                            <i class="fas fa-map-marker-alt text-teal-500"></i>
                            <span>${{item.city || 'Город не указан'}}${{item.district ? ', ' + item.district : ''}}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }}
        
        // Load items from API
        async function loadItems() {{
            try {{
                const res = await fetch(`/api/items?user_id=${{userId}}`);
                allItems = await res.json();
                filterAndRenderItems();
            }} catch (e) {{
                console.error('Error loading items:', e);
            }}
        }}
        
        // Initialize after DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {{
            document.getElementById('langSelector').value = currentLang;
            applyTranslations();
            
            // Load items
            loadItems();
            
            // Check if location selected - show welcome message if not
            if (!currentCountry || !currentCity) {{
                // Show welcome message (it's visible by default)
                // User needs to click "Select Location" button to open modal
            }} else {{
                document.getElementById('welcomeMessage').style.display = 'none';
            }}
            
            // Search input
            document.getElementById('searchInput').addEventListener('input', (e) => {{
                currentSearch = e.target.value;
                filterAndRenderItems();
            }});
            
            // Category buttons
            document.querySelectorAll('.category-btn').forEach(btn => {{
                btn.addEventListener('click', () => {{
                    // Update UI
                    document.querySelectorAll('.category-btn').forEach(b => {{
                        b.classList.remove('active', 'bg-teal-500', 'text-white');
                        b.classList.add('bg-gray-100', 'text-gray-600');
                    }});
                    btn.classList.add('active', 'bg-teal-500', 'text-white');
                    btn.classList.remove('bg-gray-100', 'text-gray-600');
                    
                    // Update filter and render
                    currentFilter = btn.dataset.category;
                    filterAndRenderItems();
                }});
            }});
            
            // FAB button
            document.getElementById('fabAdd').addEventListener('click', openAddModal);
        }}); // Close DOMContentLoaded
    </script>
</body>
</html>'''

@app.route('/app')
@app.route('/api/app')
def index():
    """Main page"""
    return generate_html()

@app.route('/api/webhook', methods=['POST'])
@app.route('/webhook', methods=['POST'])
def webhook():
    """Handle Telegram webhook"""
    try:
        data = request.get_json()
        logger.info(f"Webhook: {data}")
        
        if 'message' in data and 'text' in data['message']:
            text = data['message']['text']
            chat_id = data['message']['chat']['id']
            user = data['message']['from']
            
            if text == '/start' or text.startswith('/start'):
                # Определяем язык пользователя
                lang = user.get('language_code', 'en')[:2]
                if lang not in TRANSLATIONS:
                    lang = 'en'
                
                # Детальные приветствия (как в main.py)
                welcome_messages = {
                    'ru': (
                        "👋 <b>Добро пожаловать в Swap Kids Global!</b>\n\n"
                        "🌍 Здесь родители со всего мира обмениваются детскими вещами <b>бесплатно</b>!\n\n"
                        "👕 Одежда  •  🧸 Игрушки\n"
                        "🚗 Коляски  •  💺 Автокресла\n\n"
                        "📍 Выберите свою страну и город в приложении,\n"
                        "чтобы найти вещи рядом с вами.\n\n"
                        "✨ <i>Swap Kids — некоммерческий проект.\n"
                        "Делитесь вещами, помогайте друг другу!</i>\n\n"
                        "Нажмите кнопку ниже, чтобы начать 👇"
                    ),
                    'en': (
                        "👋 <b>Welcome to Swap Kids Global!</b>\n\n"
                        "🌍 Parents worldwide exchange children's items <b>for free</b>!\n\n"
                        "👕 Clothes  •  🧸 Toys\n"
                        "🚗 Strollers  •  💺 Car seats\n\n"
                        "📍 Select your country and city in the app\n"
                        "to find items near you.\n\n"
                        "✨ <i>Swap Kids is a non-profit project.\n"
                        "Share things, help each other!</i>\n\n"
                        "Tap the button below to start 👇"
                    ),
                    'es': (
                        "👋 <b>¡Bienvenido a Swap Kids Global!</b>\n\n"
                        "🌍 Los padres de todo el mundo intercambian artículos infantiles <b>gratis</b>!\n\n"
                        "👕 Ropa  •  🧸 Juguetes\n"
                        "🚗 Carritos  •  💺 Sillas auto\n\n"
                        "📍 Selecciona tu país и ciudad en la app\n"
                        "para encontrar artículos cerca de ti.\n\n"
                        "Toca el botón para comenzar 👇"
                    ),
                    'uk': (
                        "👋 <b>Ласкаво просимо до Swap Kids Global!</b>\n\n"
                        "🌍 Тут батьки з усього світу обмінюються дитячими речами <b>безкоштовно</b>!\n\n"
                        "👕 Одяг  •  🧸 Іграшки\n"
                        "🚗 Коляски  •  💺 Автокрісла\n\n"
                        "📍 Виберіть країну та місто в додатку,\n"
                        "щоб знайти речі поруч.\n\n"
                        "Натисніть кнопку нижче, щоб почати 👇"
                    ),
                    'ka': (
                        "👋 <b>კეთილი იყოს თქვენი მობრძანება Swap Kids Global-ში!</b>\n\n"
                        "🌍 მშობლები მთელს მსოფლიოში აცვლიან ბავშვთა ნივთებს <b>უფასოდ</b>!\n\n"
                        "👕 ტანსაცმელი  •  🧸 სათამაშოები\n"
                        "🚗 კალოსკები  •  💺 ავტოკრესლები\n\n"
                        "📍 აირჩიეთ ქვეყანა და ქალაქი აპლიკაციაში.\n\n"
                        "დააჭირეთ ღילაკს დასაწყებად 👇"
                    ),
                    'pt': (
                        "👋 <b>Bem-vindo ao Swap Kids Global!</b>\n\n"
                        "🌍 Aqui os pais trocam itens infantis <b>gratuitamente</b> em todo o mundo!\n\n"
                        "👕 Roupas  •  🧸 Brinquedos\n"
                        "🚗 Carrinhos  •  💺 Cadeiras\n\n"
                        "📍 Selecione seu país и cidade no app\n"
                        "para encontrar itens perto de você.\n\n"
                        "Toque no botão abaixo para começar 👇"
                    ),
                }
                
                welcome_text = welcome_messages.get(lang, welcome_messages['en'])
                
                # Текст кнопки на разных языках
                btn_texts = {
                    'ru': "🌍 Открыть Swap Kids",
                    'en': "🌍 Open Swap Kids",
                    'es': "🌍 Abrir Swap Kids",
                    'pt': "🌍 Abrir Swap Kids",
                    'uk': "🌍 Відкрити Swap Kids",
                    'ka': "🌍 Swap Kids-ის გახსნა"
                }
                btn_text = btn_texts.get(lang, btn_texts['en'])
                
                # Отправляем через Telegram API
                if BOT_TOKEN:
                    import requests
                    requests.post(
                        f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
                        json={
                            'chat_id': chat_id,
                            'text': welcome_text,
                            'parse_mode': 'HTML',
                            'reply_markup': {
                                'inline_keyboard': [[
                                    {
                                        'text': btn_text,
                                        'web_app': {'url': f"{BASE_URL}/app?lang={lang}"}
                                    }
                                ]]
                            }
                        },
                        timeout=10
                    )
        
        return jsonify({'ok': True})
    except Exception as e:
        logger.error(f"Webhook error: {e}")
        return jsonify({'ok': True})

@app.route('/api/countries')
def get_countries():
    """Get list of countries"""
    return jsonify([{'code': c[0], 'name': c[1]} for c in COUNTRIES])

@app.route('/api/items')
def get_items():
    """Get list of items"""
    user_id = request.args.get('user_id', '0')
    items_list = list(items_db.values())
    return jsonify(items_list)

@app.route('/api/contact')
def get_contact():
    """Get seller contact"""
    user_id = request.args.get('user_id', '0')
    item_id = request.args.get('item_id', '0')
    
    # For demo, return premium required
    return jsonify({
        'status': 'free',
        'message': 'Premium required',
        'is_premium': False
    })

@app.route('/api/invoice')
def create_invoice():
    """Create payment invoice"""
    user_id = request.args.get('user_id', '0')
    return jsonify({'ok': True})

if __name__ == '__main__':
    app.run(debug=True)
