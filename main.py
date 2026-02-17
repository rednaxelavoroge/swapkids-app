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
BOT_TOKEN = os.environ.get("BOT_TOKEN", "")
PRICE_STARS = 500  # 500 Telegram Stars

# Автоматическая ссылка для Replit
DOMAIN = os.environ.get("REPLIT_DEV_DOMAIN")
if DOMAIN:
    BASE_URL = f"https://{DOMAIN}"
else:
    BASE_URL = "http://localhost:8080"
# =============================================

logging.basicConfig(level=logging.INFO)
dp = Dispatcher()
router = Router()
dp.include_router(router)

if not BOT_TOKEN:
    print("⚠️ BOT_TOKEN не установлен! Задайте через переменные окружения или .env файл")
    print("   Для Replit: Secrets → BOT_TOKEN")
    print("   Локально: создайте .env файл с BOT_TOKEN=ваш_токен")

bot = Bot(token=BOT_TOKEN or "placeholder")

# --- БАЗА ДАННЫХ ---
async def init_db():
    async with aiosqlite.connect('swap_global.db') as db:
        await db.execute('''CREATE TABLE IF NOT EXISTS users 
                            (user_id INTEGER PRIMARY KEY, is_premium BOOLEAN DEFAULT 0,
                             username TEXT, first_name TEXT, last_name TEXT)''')
        await db.execute('''CREATE TABLE IF NOT EXISTS items 
                            (id INTEGER PRIMARY KEY AUTOINCREMENT, owner_id INTEGER, title TEXT, 
                             country TEXT, city TEXT, category TEXT, district TEXT,
                             contact TEXT, image_url TEXT, 
                             status TEXT DEFAULT 'active',
                             receiver_id INTEGER,
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
        # Включаем внешние ключи и миграцию (на случай если колонки не создались)
        try:
            await db.execute("ALTER TABLE items ADD COLUMN status TEXT DEFAULT 'active'")
        except: pass
        try:
            await db.execute("ALTER TABLE items ADD COLUMN receiver_id INTEGER")
        except: pass
        
        await db.execute('''CREATE TABLE IF NOT EXISTS favorites 
                            (user_id INTEGER, item_id INTEGER, 
                             PRIMARY KEY (user_id, item_id))''')
        await db.execute('''CREATE TABLE IF NOT EXISTS chats 
                            (id INTEGER PRIMARY KEY AUTOINCREMENT, item_id INTEGER, 
                             buyer_id INTEGER, seller_id INTEGER, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
        await db.execute('''CREATE TABLE IF NOT EXISTS messages 
                            (id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER, 
                             sender_id INTEGER, text TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
        await db.execute('''CREATE TABLE IF NOT EXISTS likes 
                            (user_id INTEGER, item_id INTEGER, 
                             PRIMARY KEY (user_id, item_id))''')
        await db.commit()

# --- ЛОГИКА ТЕЛЕГРАМ БОТА ---
@router.message(CommandStart())
async def command_start(message: types.Message):
    user = message.from_user
    async with aiosqlite.connect('swap_global.db') as db:
        await db.execute("""INSERT OR REPLACE INTO users 
                           (user_id, username, first_name, last_name) 
                           VALUES (?, ?, ?, ?)""", 
                        (user.id, user.username, user.first_name, user.last_name))
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
    kb.button(text="🌍 Открыть Swap Kids", web_app=WebAppInfo(url=f"{BASE_URL}/"))
    
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
    with open('templates/index.html', 'r', encoding='utf-8') as f:
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
    
    query = """
        SELECT i.*, 
               (SELECT COUNT(*) FROM likes WHERE item_id = i.id) as likes_count,
               (SELECT 1 FROM likes WHERE item_id = i.id AND user_id = ?) as is_liked
        FROM items i 
        WHERE i.status = 'active'
    """
    params = [user_id]
    
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
            """INSERT INTO items (owner_id, title, country, city, category, district, contact, image_url) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
            (data['user_id'], data['title'], data.get('country', ''), data.get('city', ''),
             data['category'], data.get('district', ''), data['contact'], data.get('image', ''))
        )
        await db.commit()
        return web.json_response({'ok': True, 'id': cursor.lastrowid})

async def api_mark_item_given(request):
    """Отметить вещь как отданную"""
    data = await request.json()
    item_id = data.get('item_id')
    user_id = data.get('user_id') # owner
    receiver_id = data.get('receiver_id') # who received it
    
    async with aiosqlite.connect('swap_global.db') as db:
        await db.execute(
            "UPDATE items SET status = 'given', receiver_id = ? WHERE id = ? AND owner_id = ?",
            (receiver_id, item_id, user_id)
        )
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
    
    app = web.Application()
    
    # Роуты
    app.router.add_get('/', handle_index)
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
    app.router.add_post('/api/items/toggle_like', api_toggle_like)
    app.router.add_get('/api/chats', api_get_chats)
    app.router.add_get('/api/messages', api_get_messages)
    app.router.add_post('/api/messages', api_send_message)
    app.router.add_post('/api/chats', api_create_chat)
    
    runner = web.AppRunner(app)
    await runner.setup()
    
    # Для Replit важно 0.0.0.0
    site = web.TCPSite(runner, '0.0.0.0', 8080)
    await site.start()
    
    print(f"✅ Сервер работает: {BASE_URL}")
    print(f"🤖 Бот запущен")
    
    # Удаляем вебхук и пропускаем старые обновления, чтобы избежать Conflict
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot, skip_updates=True)

if __name__ == "__main__":
    asyncio.run(main())