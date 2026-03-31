import logging
import asyncio
import json
import os
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass
from aiogram import Bot, Dispatcher, Router, types, F
from aiogram.filters import CommandStart
from aiogram.types import PreCheckoutQuery, LabeledPrice, WebAppInfo
from aiogram.utils.keyboard import InlineKeyboardBuilder
from aiohttp import web
import aiosqlite

# ================= НАСТРОЙКИ =================
BOT_TOKEN = "8465311912:AAGEVTxHRr3-tc6vCBAUE_9Flni26APK-lk"
ADMIN_ID = os.environ.get("ADMIN_ID") # ID вашего аккаунта в ТГ
PRICE_STARS = 500  # 500 Telegram Stars

# Явно прописываем домен VPS вместо Replit
BASE_URL = "https://tg.swapkids.org"
# =============================================

logging.basicConfig(level=logging.INFO)
dp = Dispatcher()
router = Router()
dp.include_router(router)

if not BOT_TOKEN:
    print("⚠️ BOT_TOKEN не установлен! Задайте через переменные окружения или .env файл")
    print("   Для Replit: Secrets → BOT_TOKEN")
    print("   Локально: создайте .env файл с BOT_TOKEN=ваш_токен")

try:
    bot = Bot(token=BOT_TOKEN or "12345678:placeholder")
except Exception as e:
    print(f"⚠️ Ошибка инициализации бота: {e}")
    print("   Режим тестирования UI без функционала бота.")
    bot = None


# --- БАЗА ДАННЫХ ---
async def init_db():
    async with aiosqlite.connect('swap_global.db') as db:
        await db.execute('''CREATE TABLE IF NOT EXISTS users 
                            (user_id INTEGER PRIMARY KEY, is_premium BOOLEAN DEFAULT 0,
                             username TEXT, first_name TEXT, last_name TEXT,
                             given_count INTEGER DEFAULT 0,
                             karma INTEGER DEFAULT 0,
                             referred_by INTEGER)''')
        await db.execute('''CREATE TABLE IF NOT EXISTS items 
                            (id INTEGER PRIMARY KEY AUTOINCREMENT, owner_id INTEGER, title TEXT, 
                             country TEXT, city TEXT, category TEXT, district TEXT,
                             contact TEXT, image_url TEXT, 
                             status TEXT DEFAULT 'active',
                             receiver_id INTEGER,
                             item_type TEXT DEFAULT 'giveaway',
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
        # Включаем внешние ключи и миграцию (на случай если колонки не создались)
        try:
            await db.execute("ALTER TABLE items ADD COLUMN status TEXT DEFAULT 'active'")
        except: pass
        try:
            await db.execute("ALTER TABLE items ADD COLUMN receiver_id INTEGER")
        except: pass
        try:
            await db.execute("ALTER TABLE items ADD COLUMN item_type TEXT DEFAULT 'giveaway'")
        except: pass
        try:
            await db.execute("ALTER TABLE users ADD COLUMN given_count INTEGER DEFAULT 0")
        except: pass
        try:
            await db.execute("ALTER TABLE users ADD COLUMN karma INTEGER DEFAULT 0")
        except: pass
        try:
            await db.execute("ALTER TABLE users ADD COLUMN referred_by INTEGER")
        except: pass
        
        await db.execute('''CREATE TABLE IF NOT EXISTS favorites 
                            (user_id INTEGER, item_id INTEGER, 
                             PRIMARY KEY (user_id, item_id))''')
        await db.execute('''CREATE TABLE IF NOT EXISTS activities 
                            (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                             user_id INTEGER, item_id INTEGER, 
                             activity_type TEXT, item_title TEXT, user_name TEXT,
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
        await db.execute('''CREATE TABLE IF NOT EXISTS chats 
                            (id INTEGER PRIMARY KEY AUTOINCREMENT, item_id INTEGER, 
                             buyer_id INTEGER, seller_id INTEGER, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
        await db.execute('''CREATE TABLE IF NOT EXISTS messages 
                            (id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER, 
                             sender_id INTEGER, text TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
        await db.execute('''CREATE TABLE IF NOT EXISTS likes 
                            (user_id INTEGER, item_id INTEGER, 
                             PRIMARY KEY (user_id, item_id))''')
        await db.execute('''CREATE TABLE IF NOT EXISTS referrals 
                            (id INTEGER PRIMARY KEY AUTOINCREMENT,
                             referrer_id INTEGER, referred_id INTEGER,
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             UNIQUE(referred_id))''')
        await db.commit()

async def seed_demo_data():
    """Заполнить ленту демо-данными если она пустая"""
    async with aiosqlite.connect('swap_global.db') as db:
        async with db.execute("SELECT COUNT(*) FROM items") as cur:
            count = (await cur.fetchone())[0]
        if count > 0:
            return  # Уже есть данные
        
        # Демо пользователь
        await db.execute("INSERT OR IGNORE INTO users (user_id, username, first_name, karma) VALUES (0, 'demo', 'SwapKids Demo', 0)")
        
        # === GIVEAWAY ITEMS ===
        demo_items = [
            # (title, country, city, category, district, image_url)
            ("Коляска Bugaboo Fox 3", "GE", "Тбилиси", "strollers", "Ваке",
             "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=400&h=300&fit=crop"),
            ("Комбинезон зимний 80 см", "GE", "Тбилиси", "clothes", "Сабуртало",
             "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&h=300&fit=crop"),
            ("LEGO Duplo набор", "GE", "Батуми", "toys", "Старый город",
             "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=400&h=300&fit=crop"),
            ("Автокресло Maxi-Cosi 0-13 кг", "ES", "Барселона", "car_seats", "Эшампле",
             "https://images.unsplash.com/photo-1594583388647-364ea6532257?w=400&h=300&fit=crop"),
            ("Пакет одежды мальчик 3-6 мес", "ES", "Мадрид", "clothes", "Центр",
             "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&h=300&fit=crop"),
            ("Беговел Strider 12", "RU", "Москва", "toys", "Хамовники",
             "https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=400&h=300&fit=crop"),
            ("Манеж складной", "RU", "Москва", "furniture", "Арбат",
             "https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=400&h=300&fit=crop"),
            ("Конверт в коляску зимний", "UA", "Киев", "strollers", "Печерск",
             "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"),
            ("Набор пазлов 2+", "PT", "Лиссабон", "toys", "Шиаду",
             "https://images.unsplash.com/photo-1606503153255-59d5e417c4ed?w=400&h=300&fit=crop"),
            ("Куртка демисезонная 98 см", "GE", "Тбилиси", "clothes", "Дидубе",
             "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=300&fit=crop"),
            ("Развивающий коврик Tiny Love", "GE", "Тбилиси", "toys", "Глдани",
             "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop"),
            ("Бустер для авто 15-36 кг", "ES", "Валенсия", "car_seats", "Русафа",
             "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=300&fit=crop"),
            ("Платье нарядное 110 см", "RU", "Санкт-Петербург", "clothes", "Центральный",
             "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=300&fit=crop"),
            ("Самокат Micro Mini", "UA", "Одесса", "toys", "Приморский",
             "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=400&h=300&fit=crop"),
            ("Стульчик для кормления IKEA", "GE", "Батуми", "furniture", "Новый бульвар",
             "https://images.unsplash.com/photo-1586105449897-20b5efeb3233?w=400&h=300&fit=crop"),
            ("Рюкзак-переноска Ergobaby", "PT", "Порту", "strollers", "Рибейра",
             "https://images.unsplash.com/photo-1544413660-299165566b1d?w=400&h=300&fit=crop"),
            ("Книжки детские 20 шт", "RU", "Казань", "toys", "Вахитовский",
             "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop"),
            ("Ботинки зимние 26 размер", "UA", "Львов", "clothes", "Галицкий",
             "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"),
            ("Качели детские подвесные", "GE", "Тбилиси", "furniture", "Исани",
             "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=400&h=300&fit=crop"),
            ("Набор посуды детский", "ES", "Малага", "other", "Центр",
             "https://images.unsplash.com/photo-1590005354167-6da97870c757?w=400&h=300&fit=crop"),
        ]
        
        import random
        for title, country, city, cat, district, img in demo_items:
            await db.execute(
                """INSERT INTO items (owner_id, title, country, city, category, district, contact, image_url, item_type)
                   VALUES (0, ?, ?, ?, ?, ?, '@swapkids_demo', ?, 'giveaway')""",
                (title, country, city, cat, district, img))
        
        # === WISH ITEMS (Доска желаний) ===
        demo_wishes = [
            ("Ищу зимний комбинезон 86 см", "GE", "Тбилиси", "clothes", "Ваке",
             "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=400&h=300&fit=crop"),
            ("Нужна коляска-трость лёгкая", "RU", "Москва", "strollers", "Марьино", ""),
            ("Ищу конструктор Duplo/Mega Bloks", "ES", "Барселона", "toys", "Грасия",
             "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=300&fit=crop"),
            ("Нужен велосипед 14 дюймов", "UA", "Киев", "toys", "Оболонь", ""),
            ("Ищу автокресло 9-18 кг", "GE", "Батуми", "car_seats", "Центр", ""),
            ("Нужна ванночка для купания", "PT", "Лиссабон", "other", "Байша",
             "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"),
        ]
        
        for title, country, city, cat, district, img in demo_wishes:
            await db.execute(
                """INSERT INTO items (owner_id, title, country, city, category, district, contact, image_url, item_type)
                   VALUES (0, ?, ?, ?, ?, ?, '@swapkids_demo', ?, 'wish')""",
                (title, country, city, cat, district, img))
        
        # === DEMO LIKES (рандомные лайки) ===
        async with db.execute("SELECT id FROM items") as cur:
            item_ids = [row[0] for row in await cur.fetchall()]
        
        # Создаём фейковых «лайкеров»
        for fake_uid in range(100001, 100020):
            await db.execute("INSERT OR IGNORE INTO users (user_id, username, first_name) VALUES (?, ?, ?)",
                           (fake_uid, f'user{fake_uid}', f'Parent{fake_uid-100000}'))
        
        for item_id in item_ids:
            num_likes = random.randint(1, 12)
            likers = random.sample(range(100001, 100020), min(num_likes, 19))
            for uid in likers:
                try:
                    await db.execute("INSERT OR IGNORE INTO likes (user_id, item_id) VALUES (?, ?)", (uid, item_id))
                except: pass
        
        # === DEMO ACTIVITIES ===
        demo_activities = [
            (0, 'new_item', "Коляска Bugaboo Fox 3", "Мария"),
            (0, 'new_item', "LEGO Duplo набор", "Анна"),
            (0, 'item_given', "Автокресло Maxi-Cosi", "Елена"),
            (0, 'new_item', "Беговел Strider 12", "Наталья"),
            (0, 'item_given', "Комбинезон зимний", "Ольга"),
            (0, 'new_wish', "Ищу коляску-трость", "Давид"),
            (0, 'new_item', "Развивающий коврик", "Софи"),
            (0, 'item_given', "Книжки детские 20 шт", "Тамара"),
            (0, 'new_item', "Самокат Micro Mini", "Ирина"),
            (0, 'item_given', "Набор посуды детский", "Лейла"),
            (0, 'new_item', "Стульчик IKEA", "Нино"),
            (0, 'new_wish', "Нужен велосипед 14\"", "Андрей"),
        ]
        
        for uid, atype, title, name in demo_activities:
            await db.execute(
                "INSERT INTO activities (user_id, item_id, activity_type, item_title, user_name) VALUES (?, 1, ?, ?, ?)",
                (uid, atype, title, name))
        
        await db.commit()
        print("✅ Demo data seeded!")

# --- ЛОГИКА ТЕЛЕГРАМ БОТА ---
@router.message(CommandStart())
async def command_start(message: types.Message):
    user = message.from_user
    async with aiosqlite.connect('swap_global.db') as db:
        # Проверяем, существует ли пользователь уже
        async with db.execute("SELECT user_id FROM users WHERE user_id = ?", (user.id,)) as cur:
            existing = await cur.fetchone()
        
        if not existing:
            await db.execute("""INSERT INTO users 
                               (user_id, username, first_name, last_name) 
                               VALUES (?, ?, ?, ?)""", 
                            (user.id, user.username, user.first_name, user.last_name))
        else:
            await db.execute("""UPDATE users SET username = ?, first_name = ?, last_name = ?
                               WHERE user_id = ?""",
                            (user.username, user.first_name, user.last_name, user.id))
        
        # Обработка реферального deep link: /start ref_123456
        args = message.text.split(maxsplit=1)
        if len(args) > 1 and args[1].startswith('ref_'):
            try:
                referrer_id = int(args[1][4:])
                # Нельзя реферить самого себя, и только для новых пользователей
                if referrer_id != user.id and not existing:
                    # Записываем реферал
                    try:
                        await db.execute(
                            "INSERT INTO referrals (referrer_id, referred_id) VALUES (?, ?)",
                            (referrer_id, user.id))
                        await db.execute(
                            "UPDATE users SET referred_by = ? WHERE user_id = ?",
                            (referrer_id, user.id))
                        # +30 кармы рефереру
                        await db.execute(
                            "UPDATE users SET karma = karma + 30 WHERE user_id = ?",
                            (referrer_id,))
                        
                        # Проверяем: если 3+ рефералов — Premium навсегда
                        async with db.execute(
                            "SELECT COUNT(*) FROM referrals WHERE referrer_id = ?",
                            (referrer_id,)) as ref_cur:
                            ref_count = (await ref_cur.fetchone())[0]
                        if ref_count >= 3:
                            await db.execute(
                                "UPDATE users SET is_premium = 1 WHERE user_id = ?",
                                (referrer_id,))
                            # Уведомляем реферера
                            try:
                                await bot.send_message(
                                    referrer_id,
                                    "🎉 <b>Поздравляем!</b>\n\n"
                                    "Вы пригласили 3 друзей и получили <b>Premium навсегда</b>! 🌟\n"
                                    "Теперь все контакты продавцов доступны вам бесплатно.",
                                    parse_mode="HTML")
                            except: pass
                    except: pass  # UNIQUE constraint — уже реферил
            except ValueError: pass
        
        await db.commit()
    
    # Determine user language
    lang = (user.language_code or 'ru')[:2]
    
    greetings = {
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
            "📍 Selecciona tu país y ciudad en la app\n"
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
            "დააჭირეთ ღილაკს დასაწყებად 👇"
        ),
    }
    
    text = greetings.get(lang, greetings['en'])
    
    kb = InlineKeyboardBuilder()
    kb.button(text="🌍 Открыть Swap Kids", web_app=WebAppInfo(url=f"{BASE_URL}/app?lang={lang}"))
    
    await message.answer(text, reply_markup=kb.as_markup(), parse_mode="HTML")

@router.pre_checkout_query()
async def on_pre_checkout(pre_checkout_query: PreCheckoutQuery):
    await pre_checkout_query.answer(ok=True)

@router.message(F.successful_payment)
async def on_successful_payment(message: types.Message):
    async with aiosqlite.connect('swap_global.db') as db:
        await db.execute("UPDATE users SET is_premium = 1 WHERE user_id = ?", (message.from_user.id,))
        await db.commit()
    await message.answer("🎉 <b>Поздравляем!</b>\n\nПремиум доступ активирован!\nТеперь вы можете видеть контакты всех продавцов.", parse_mode="HTML")

# --- ВЕБ-СЕРВЕР ---
async def handle_index(request):
    import os
    # Путь к шаблону
    template_path = os.path.join(os.path.dirname(__file__), 'templates', 'index.html')
    with open(template_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    return web.Response(text=html_content, content_type='text/html')

# --- API ENDPOINTS ---
async def api_get_user(request):
    """Получить информацию о пользователе"""
    user_id = request.query.get('user_id')
    async with aiosqlite.connect('swap_global.db') as db:
        async with db.execute("SELECT * FROM users WHERE user_id = ?", (user_id,)) as cur:
            row = await cur.fetchone()
            if row:
                return web.json_response({
                    'user_id': row[0],
                    'is_premium': bool(row[1]),
                    'username': row[2],
                    'first_name': row[3],
                    'last_name': row[4]
                })
    return web.json_response({'error': 'User not found'}, status=404)

async def api_get_leaderboard(request):
    """Топ 10 дарителей"""
    async with aiosqlite.connect('swap_global.db') as db:
        db.row_factory = aiosqlite.Row
        query = """
            SELECT user_id, username, first_name, last_name, given_count 
            FROM users 
            WHERE given_count > 0 
            ORDER BY given_count DESC 
            LIMIT 10
        """
        async with db.execute(query) as cur:
            rows = await cur.fetchall()
            return web.json_response([dict(r) for r in rows])

async def api_get_activities(request):
    """Последние 10 активностей сообщества"""
    async with aiosqlite.connect('swap_global.db') as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("SELECT * FROM activities ORDER BY id DESC LIMIT 10") as cur:
            rows = await cur.fetchall()
            return web.json_response([dict(r) for r in rows])

async def api_register_user(request):
    """Register user from WebApp (if not yet in DB)"""
    data = await request.json()
    user_id = data.get('user_id')
    if not user_id:
        return web.json_response({'error': 'user_id required'}, status=400)
    async with aiosqlite.connect('swap_global.db') as db:
        await db.execute(
            """INSERT OR IGNORE INTO users (user_id, username, first_name, last_name) 
               VALUES (?, ?, ?, ?)""",
            (user_id, data.get('username', ''), data.get('first_name', ''), data.get('last_name', ''))
        )
        await db.commit()
    return web.json_response({'ok': True})

async def api_get_items(request):
    """Получить список вещей с фильтрами"""
    country = request.query.get('country', '')
    city = request.query.get('city', '')
    category = request.query.get('category', 'all')
    search = request.query.get('search', '')
    user_id = request.query.get('user_id')
    
    item_type = request.query.get('type', 'giveaway')
    
    query = """
        SELECT i.*, 
               (SELECT COUNT(*) FROM likes WHERE item_id = i.id) as likes_count,
               (SELECT 1 FROM likes WHERE item_id = i.id AND user_id = ?) as is_liked
        FROM items i 
        WHERE i.status = 'active' AND i.item_type = ?
    """
    params = [user_id, item_type]
    
    if country:
        query += " AND i.country = ?"
        params.append(country)
    if city:
        query += " AND i.city = ?"
        params.append(city)
    if category and category != 'all':
        query += " AND i.category = ?"
        params.append(category)
    if search:
        query += " AND (i.title LIKE ? OR i.district LIKE ?)"
        params.extend([f'%{search}%', f'%{search}%'])
    
    query += " ORDER BY i.id DESC"
    
    async with aiosqlite.connect('swap_global.db') as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(query, params) as cur:
            rows = await cur.fetchall()
            items = []
            for row in rows:
                item = dict(row)
                # Проверяем, есть ли в избранном
                async with db.execute("SELECT 1 FROM favorites WHERE user_id = ? AND item_id = ?", 
                                     (user_id, item['id'])) as fav_cur:
                    item['is_favorite'] = await fav_cur.fetchone() is not None
                items.append(item)
    return web.json_response(items)

async def api_add_item(request):
    """Добавить новую вещь"""
    data = await request.json()
    async with aiosqlite.connect('swap_global.db') as db:
        cursor = await db.execute(
            """INSERT INTO items (owner_id, title, country, city, category, district, contact, image_url, item_type) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (data['user_id'], data['title'], data.get('country', ''), data.get('city', ''),
             data['category'], data.get('district', ''), data['contact'], data.get('image', ''),
             data.get('item_type', 'giveaway'))
        )
        item_id = cursor.lastrowid
        
        # Activity Logging
        activity_type = 'new_item' if data.get('item_type') != 'wish' else 'new_wish'
        async with db.execute("SELECT first_name FROM users WHERE user_id = ?", (data['user_id'],)) as cur:
            user_row = await cur.fetchone()
            user_name = user_row[0] if user_row else 'Пользователь'
            
        await db.execute(
            "INSERT INTO activities (user_id, item_id, activity_type, item_title, user_name) VALUES (?, ?, ?, ?, ?)",
            (data['user_id'], item_id, activity_type, data['title'], user_name)
        )
        
        # Начисляем +10 кармы за публикацию
        await db.execute("UPDATE users SET karma = karma + 10 WHERE user_id = ?", (data['user_id'],))
        
        await db.commit()
        return web.json_response({'ok': True, 'id': item_id})

async def api_mark_item_given(request):
    """Отметить вещь как отданную"""
    data = await request.json()
    item_id = data.get('item_id')
    user_id = data.get('user_id') # owner
    receiver_id = data.get('receiver_id') # who received it
    
    async with aiosqlite.connect('swap_global.db') as db:
        async with db.execute("SELECT title, item_type FROM items WHERE id = ?", (item_id,)) as cur:
            item_row = await cur.fetchone()
            if not item_row: return web.json_response({'error': 'Not found'}, status=404)
            title, i_type = item_row
            
        await db.execute(
            "UPDATE items SET status = 'given', receiver_id = ? WHERE id = ? AND owner_id = ?",
            (receiver_id, item_id, user_id)
        )
        
        # Update given_count and log activity for giveaway
        if i_type == 'giveaway':
            await db.execute("UPDATE users SET given_count = given_count + 1 WHERE user_id = ?", (user_id,))
            
            async with db.execute("SELECT first_name FROM users WHERE user_id = ?", (user_id,)) as cur:
                u_row = await cur.fetchone()
                u_name = u_row[0] if u_row else 'Пользователь'
            
            await db.execute(
                "INSERT INTO activities (user_id, item_id, activity_type, item_title, user_name) VALUES (?, ?, ?, ?, ?)",
                (user_id, item_id, 'item_given', title, u_name)
            )
            # Начисляем +50 кармы за отданную вещь
            await db.execute("UPDATE users SET karma = karma + 50 WHERE user_id = ?", (user_id,))
            
        await db.commit()
        return web.json_response({'ok': True})

async def api_get_user_stats(request):
    """Получить статистику пользователя (сколько отдал)"""
    user_id = request.query.get('user_id')
    async with aiosqlite.connect('swap_global.db') as db:
        async with db.execute(
            "SELECT COUNT(*) FROM items WHERE owner_id = ? AND status = 'given'",
            (user_id,)
        ) as cur:
            row = await cur.fetchone()
            count = row[0] if row else 0
            return web.json_response({'given_count': count})

async def api_delete_item(request):
    """Удалить свою вещь"""
    item_id = request.query.get('id')
    user_id = request.query.get('user_id')
    async with aiosqlite.connect('swap_global.db') as db:
        await db.execute("DELETE FROM items WHERE id = ? AND owner_id = ?", (item_id, user_id))
        await db.commit()
    return web.json_response({'ok': True})

async def api_toggle_favorite(request):
    """Добавить/удалить из избранного"""
    data = await request.json()
    user_id = data['user_id']
    item_id = data['item_id']
    
    async with aiosqlite.connect('swap_global.db') as db:
        # Проверяем, есть ли уже в избранном
        async with db.execute("SELECT 1 FROM favorites WHERE user_id = ? AND item_id = ?", 
                             (user_id, item_id)) as cur:
            exists = await cur.fetchone() is not None
        
        if exists:
            await db.execute("DELETE FROM favorites WHERE user_id = ? AND item_id = ?", (user_id, item_id))
            action = 'removed'
        else:
            await db.execute("INSERT INTO favorites (user_id, item_id) VALUES (?, ?)", (user_id, item_id))
            action = 'added'
        
        await db.commit()
    return web.json_response({'ok': True, 'action': action})

async def api_get_favorites(request):
    """Получить избранные вещи пользователя"""
    user_id = request.query.get('user_id')
    async with aiosqlite.connect('swap_global.db') as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("""
            SELECT i.* FROM items i
            JOIN favorites f ON i.id = f.item_id
            WHERE f.user_id = ?
            ORDER BY i.id DESC
        """, (user_id,)) as cur:
            rows = await cur.fetchall()
            items = [dict(row) for row in rows]
            for item in items:
                item['is_favorite'] = True
    return web.json_response(items)

async def api_get_contact(request):
    """Получить контакт продавца (требует премиум)"""
    user_id = request.query.get('user_id')
    item_id = request.query.get('item_id')
    
    async with aiosqlite.connect('swap_global.db') as db:
        # Проверяем премиум
        async with db.execute("SELECT is_premium FROM users WHERE user_id = ?", (user_id,)) as cur:
            row = await cur.fetchone()
            is_premium = row and row[0]
        
        if is_premium:
            async with db.execute("SELECT contact FROM items WHERE id = ?", (item_id,)) as cur:
                row = await cur.fetchone()
                if row:
                    return web.json_response({
                        'status': 'paid',
                        'contact': row[0],
                        'is_premium': True
                    })
        
        return web.json_response({
            'status': 'free',
            'message': 'Для просмотра контактов необходим Премиум доступ',
            'is_premium': False
        })

async def api_create_invoice(request):
    """Создать счет на оплату (мультиязычный)"""
    user_id = request.query.get('user_id')
    lang = request.query.get('lang', 'ru')
    
    invoice_texts = {
        'ru': ('Премиум доступ Swap Kids', 'Доступ к контактам всех продавцов навсегда', 'Премиум доступ'),
        'en': ('Swap Kids Premium', 'Lifetime access to all seller contacts', 'Premium Access'),
        'es': ('Swap Kids Premium', 'Acceso de por vida a todos los contactos', 'Acceso Premium'),
        'pt': ('Swap Kids Premium', 'Acesso vitalício a todos os contatos', 'Acesso Premium'),
        'uk': ('Преміум доступ Swap Kids', 'Доступ до контактів усіх продавців назавжди', 'Преміум доступ'),
        'ka': ('Swap Kids პრემიუმი', 'სამუდამო წვდომა ყველა კონტაქტთან', 'პრემიუმი'),
    }
    
    title, desc, label = invoice_texts.get(lang, invoice_texts['en'])
    
    try:
        await bot.send_invoice(
            chat_id=int(user_id),
            title=title,
            description=desc,
            payload="premium_access",
            currency="XTR",
            prices=[LabeledPrice(label=label, amount=PRICE_STARS)]
        )
        return web.json_response({'ok': True})
    except Exception as e:
        return web.json_response({'ok': False, 'error': str(e)})

async def api_get_my_items(request):
    """Получить мои объявления со статистикой лайков"""
    user_id = request.query.get('user_id')
    async with aiosqlite.connect('swap_global.db') as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("""
            SELECT *, (SELECT COUNT(*) FROM likes WHERE item_id = items.id) as likes_count
            FROM items 
            WHERE owner_id = ? 
            ORDER BY id DESC""", (user_id,)) as cur:
            rows = await cur.fetchall()
            return web.json_response([dict(row) for row in rows])

async def api_toggle_like(request):
    """Поставить или убрать лайк"""
    data = await request.json()
    user_id = data.get('user_id')
    item_id = data.get('item_id')
    
    async with aiosqlite.connect('swap_global.db') as db:
        async with db.execute("SELECT 1 FROM likes WHERE user_id = ? AND item_id = ?", (user_id, item_id)) as cur:
            if await cur.fetchone():
                await db.execute("DELETE FROM likes WHERE user_id = ? AND item_id = ?", (user_id, item_id))
                action = 'removed'
            else:
                await db.execute("INSERT INTO likes (user_id, item_id) VALUES (?, ?)", (user_id, item_id))
                action = 'added'
        await db.commit()
        
        async with db.execute("SELECT COUNT(*) FROM likes WHERE item_id = ?", (item_id,)) as cur:
            row = await cur.fetchone()
            count = row[0] if row else 0
            
        return web.json_response({'ok': True, 'action': action, 'likes_count': count})

async def api_get_chats(request):
    """Получить список чатов пользователя"""
    user_id = request.query.get('user_id')
    async with aiosqlite.connect('swap_global.db') as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("""
            SELECT c.*, i.title as item_title, i.image_url 
            FROM chats c
            JOIN items i ON c.item_id = i.id
            WHERE c.buyer_id = ? OR c.seller_id = ?
            ORDER BY c.created_at DESC
        """, (user_id, user_id)) as cur:
            rows = await cur.fetchall()
            chats = []
            for row in rows:
                chat = dict(row)
                # Получаем последнее сообщение
                async with db.execute(
                    "SELECT text, created_at FROM messages WHERE chat_id = ? ORDER BY id DESC LIMIT 1",
                    (chat['id'],)
                ) as msg_cur:
                    msg = await msg_cur.fetchone()
                    if msg:
                        chat['last_message'] = msg['text']
                        chat['last_time'] = msg['created_at']
                chats.append(chat)
    return web.json_response(chats)

async def api_get_messages(request):
    """Получить сообщения чата"""
    chat_id = request.query.get('chat_id')
    async with aiosqlite.connect('swap_global.db') as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            "SELECT * FROM messages WHERE chat_id = ? ORDER BY id ASC", (chat_id,)
        ) as cur:
            rows = await cur.fetchall()
            return web.json_response([dict(row) for row in rows])

async def api_send_message(request):
    """Отправить сообщение"""
    data = await request.json()
    async with aiosqlite.connect('swap_global.db') as db:
        cursor = await db.execute(
            "INSERT INTO messages (chat_id, sender_id, text) VALUES (?, ?, ?)",
            (data['chat_id'], data['sender_id'], data['text'])
        )
        await db.commit()
        return web.json_response({'ok': True, 'id': cursor.lastrowid})

async def api_create_chat(request):
    """Создать новый чат"""
    data = await request.json()
    async with aiosqlite.connect('swap_global.db') as db:
        # Проверяем, существует ли уже чат
        async with db.execute(
            "SELECT id FROM chats WHERE item_id = ? AND buyer_id = ?",
            (data['item_id'], data['buyer_id'])
        ) as cur:
            existing = await cur.fetchone()
            if existing:
                return web.json_response({'ok': True, 'chat_id': existing[0], 'exists': True})
        
        cursor = await db.execute(
            "INSERT INTO chats (item_id, buyer_id, seller_id) VALUES (?, ?, ?)",
            (data['item_id'], data['buyer_id'], data['seller_id'])
        )
        await db.commit()
        return web.json_response({'ok': True, 'chat_id': cursor.lastrowid, 'exists': False})


async def api_get_karma(request):
    """Получить баланс кармы пользователя"""
    user_id = request.query.get('user_id')
    async with aiosqlite.connect('swap_global.db') as db:
        async with db.execute("SELECT karma FROM users WHERE user_id = ?", (user_id,)) as cur:
            row = await cur.fetchone()
            karma = row[0] if row else 0
    return web.json_response({'karma': karma})

async def api_get_referral(request):
    """Получить реферальную ссылку и счётчик"""
    user_id = request.query.get('user_id')
    bot_info = None
    bot_username = 'SwapKidsBot'
    try:
        if bot:
            bot_info = await bot.get_me()
            bot_username = bot_info.username
    except: pass
    
    ref_link = f"https://t.me/{bot_username}?start=ref_{user_id}"
    
    async with aiosqlite.connect('swap_global.db') as db:
        async with db.execute(
            "SELECT COUNT(*) FROM referrals WHERE referrer_id = ?", (user_id,)
        ) as cur:
            row = await cur.fetchone()
            ref_count = row[0] if row else 0
        async with db.execute(
            "SELECT is_premium FROM users WHERE user_id = ?", (user_id,)
        ) as cur:
            row = await cur.fetchone()
            is_premium = bool(row[0]) if row else False
    
    return web.json_response({
        'ref_link': ref_link,
        'ref_count': ref_count,
        'ref_needed': 3,
        'is_premium': is_premium,
        'premium_earned': is_premium and ref_count >= 3
    })

# --- STATIC FILES ---
async def handle_static(request):
    """Отдавать статические файлы"""
    filename = request.match_info['filename']
    filepath = f'static/{filename}'
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        content_type = 'text/css' if filename.endswith('.css') else 'application/javascript'
        return web.Response(text=content, content_type=content_type)
    return web.Response(status=404)

# --- RUN ---
async def main():
    await init_db()
    await seed_demo_data()
    
    app = web.Application()
    
    # Роуты
    app.router.add_get('/', handle_landing)
    app.router.add_get('/app', handle_index)
    app.router.add_get('/static/{filename}', handle_static)
    
    # API
    app.router.add_get('/api/user', api_get_user)
    app.router.add_post('/api/user', api_register_user)
    app.router.add_get('/api/items', api_get_items)
    app.router.add_post('/api/items', api_add_item)
    app.router.add_delete('/api/items', api_delete_item)
    app.router.add_get('/api/favorites', api_get_favorites)
    app.router.add_post('/api/favorites', api_toggle_favorite)
    app.router.add_get('/api/contact', api_get_contact)
    app.router.add_get('/api/invoice', api_create_invoice)
    app.router.add_get('/api/my-items', api_get_my_items)
    app.router.add_post('/api/items/mark_given', api_mark_item_given)
    app.router.add_get('/api/user/stats', api_get_user_stats)
    app.router.add_get('/api/leaderboard', api_get_leaderboard)
    app.router.add_get('/api/activities', api_get_activities)
    app.router.add_post('/api/items/toggle_like', api_toggle_like)
    app.router.add_get('/api/chats', api_get_chats)
    app.router.add_get('/api/messages', api_get_messages)
    app.router.add_post('/api/messages', api_send_message)
    app.router.add_post('/api/chats', api_create_chat)
    app.router.add_get('/api/karma', api_get_karma)
    app.router.add_get('/api/referral', api_get_referral)
    
    runner = web.AppRunner(app)
    await runner.setup()
    
    # Поменяем порт на 8000, так как 8080 может быть занят на VPS
    site = web.TCPSite(runner, '0.0.0.0', 8000)
    await site.start()
    
    print(f"✅ Сервер работает: {BASE_URL}")
    
    if bot:
        print(f"🤖 Бот запущен")
        try:
            # Устанавливаем кнопку меню на актуальный домен
            await bot.set_chat_menu_button(
                menu_button=types.MenuButtonWebApp(
                    text="🌍 Swap Kids",
                    web_app=WebAppInfo(url=f"{BASE_URL}/app")
                )
            )
            print(f"✅ Кнопка меню установлена на: {BASE_URL}/app")
            
            # Удаляем вебхук и пропускаем старые обновления, чтобы избежать Conflict
            await bot.delete_webhook(drop_pending_updates=True)
            await dp.start_polling(bot, skip_updates=True)
        except Exception as e:
            print(f"⚠️ Ошибка при запуске бота: {e}")
            print("   Веб-сервер продолжает работу.")
            # Держим сервер запущенным, если бот упал
            while True:
                await asyncio.sleep(3600)
    else:
        print("⚠️ Бот не запущен (неверный токен). Только веб-интерфейс доступен.")
        # Держим сервер запущенным
        while True:
            await asyncio.sleep(3600)

if __name__ == "__main__":
    asyncio.run(main())