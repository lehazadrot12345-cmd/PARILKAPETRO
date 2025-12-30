document.addEventListener('DOMContentLoaded', () => {
    // Корзина товаров (localStorage)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const navItems = [
        { id: 'home', name: 'Home' },
        { id: 'shop', name: 'Shop' },
        { id: 'about', name: 'About' },
        { id: 'contact', name: 'Contact' }
    ];

    const nav = document.querySelector('.nav');
    const content = document.getElementById('content');

    navItems.forEach(item => {
        const link = document.createElement('a');
        link.textContent = item.name;
        link.href = '#';
        link.onclick = () => loadSection(item.id);
        nav.appendChild(link);
    });

    function addToCart(product, price) {
        const item = {
            id: Date.now(),
            product: product,
            price: parseFloat(price)
        };
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Переходим на форму заказа
        loadSection('contact');
    }

    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadSection('contact'); // Обновляем форму
    }

    function getTotalPrice() {
        const DELIVERY_COST = 1000; // Стоимость доставки
        return cart.reduce((sum, item) => sum + item.price, 0) + DELIVERY_COST;
    }

    // Экспортируем функции в глобальный scope
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.getTotalPrice = getTotalPrice;

    function loadSection(section) {
        if (section === 'home') {
            content.innerHTML = `
                <div class="section">
                    <h2>Street Energy</h2>
                    <p>PARILKAPETRO — underground nicotin shop with pure street style.</p>
                </div>
            `;
        }

        if (section === 'shop') {
            content.innerHTML = `
                <div class="section">
                    <h2>Products</h2>
                    
                    <div class="category-tabs">
                        <button class="category-btn active" data-category="dymoxody">Дымоходы</button>
                        <button class="category-btn" data-category="zhidkosti">Жидкости</button>
                        <button class="category-btn" data-category="rasxodniki">Расходники</button>
                        <button class="category-btn" data-category="snyus">Снюс</button>
                    </div>

                    <div class="category-content" id="dymoxody" style="display: block;">
                        <div class="products">
                            <div class="product">
                                <h3>Pro Dym 3000</h3>
                                <p class="price">4500 ₸</p>
                                <button class="btn" onclick="window.addToCart('Pro Dym 3000', 4500)">Buy</button>
                            </div>
                            <div class="product">
                                <h3>Street Style Dym</h3>
                                <p class="price">3800 ₸</p>
                                <button class="btn" onclick="window.addToCart('Street Style Dym', 3800)">Buy</button>
                            </div>
                            <div class="product">
                                <h3>Neon Dym Max</h3>
                                <p class="price">5200 ₸</p>
                                <button class="btn" onclick="window.addToCart('Neon Dym Max', 5200)">Buy</button>
                            </div>
                        </div>
                    </div>

                    <div class="category-content" id="zhidkosti" style="display: none;">
                        <div class="products">
                            <div class="product">
                                <h3>Dark Grape Liquid</h3>
                                <p class="price">2500 ₸</p>
                                <button class="btn" onclick="window.addToCart('Dark Grape Liquid', 2500)">Buy</button>
                            </div>
                            <div class="product">
                                <h3>Neon Mint Liquid</h3>
                                <p class="price">2300 ₸</p>
                                <button class="btn" onclick="window.addToCart('Neon Mint Liquid', 2300)">Buy</button>
                            </div>
                            <div class="product">
                                <h3>Violet Smoke Liquid</h3>
                                <p class="price">2700 ₸</p>
                                <button class="btn" onclick="window.addToCart('Violet Smoke Liquid', 2700)">Buy</button>
                            </div>
                        </div>
                    </div>

                    <div class="category-content" id="rasxodniki" style="display: none;">
                        <div class="products">
                            <div class="product">
                                <h3>Coil Pack</h3>
                                <p class="price">1200 ₸</p>
                                <button class="btn" onclick="window.addToCart('Coil Pack', 1200)">Buy</button>
                            </div>
                            <div class="product">
                                <h3>Filter Cartridge</h3>
                                <p class="price">800 ₸</p>
                                <button class="btn" onclick="window.addToCart('Filter Cartridge', 800)">Buy</button>
                            </div>
                            <div class="product">
                                <h3>Battery 5000mah</h3>
                                <p class="price">2500 ₸</p>
                                <button class="btn" onclick="window.addToCart('Battery 5000mah', 2500)">Buy</button>
                            </div>
                        </div>
                    </div>

                    <div class="category-content" id="snyus" style="display: none;">
                        <div class="products">
                            <div class="product">
                                <h3>Dark Mint Snyus</h3>
                                <p class="price">1500 ₸</p>
                                <button class="btn" onclick="window.addToCart('Dark Mint Snyus', 1500)">Buy</button>
                            </div>
                            <div class="product">
                                <h3>Strong Ice</h3>
                                <p class="price">1800 ₸</p>
                                <button class="btn" onclick="window.addToCart('Strong Ice', 1800)">Buy</button>
                            </div>
                            <div class="product">
                                <h3>Violet Pepper</h3>
                                <p class="price">1600 ₸</p>
                                <button class="btn" onclick="window.addToCart('Violet Pepper', 1600)">Buy</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Обработчик для кнопок категорий
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    document.querySelectorAll('.category-content').forEach(cat => cat.style.display = 'none');
                    const categoryId = btn.getAttribute('data-category');
                    document.getElementById(categoryId).style.display = 'block';
                });
            });
        }

        if (section === 'about') {
            content.innerHTML = `
                <div class="section">
                    <h2>About PARILKAPETRO</h2>
                    <p>We mix street culture, neon vibes and dark violet aesthetics.</p>
                </div>
            `;
        }

        if (section === 'contact') {
            let cartHtml = '<h3 style="color: #a78bfa; margin-bottom: 20px;">🛒 Ваша корзина:</h3>';
            
            if (cart.length === 0) {
                cartHtml += '<p style="color: #c4b5fd;">Корзина пуста. <a href="#" onclick="location.reload()" style="color: #a78bfa; text-decoration: underline;">Вернуться в магазин</a></p>';
            } else {
                cartHtml += '<div style="background: rgba(90, 45, 143, 0.2); border: 1px solid rgba(167, 139, 250, 0.3); border-radius: 12px; padding: 15px; margin-bottom: 20px;">';
                
                cart.forEach((item) => {
                    cartHtml += `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid rgba(167, 139, 250, 0.2); color: #c4b5fd;">
                            <div>
                                <strong>${item.product}</strong>
                                <p style="margin: 5px 0 0 0; color: #a78bfa; font-size: 14px;">${item.price} ₸</p>
                            </div>
                            <button onclick="window.removeFromCart(${item.id})" style="background: rgba(255, 0, 0, 0.3); border: 1px solid #ff6b6b; color: #ff8787; padding: 5px 15px; border-radius: 6px; cursor: pointer;">Удалить</button>
                        </div>
                    `;
                });
                
                cartHtml += `
                    <div style="padding-top: 15px; border-top: 1px solid rgba(167, 139, 250, 0.5); color: #c4b5fd; margin-bottom: 10px;">
                        Сумма товаров: ${cart.reduce((sum, item) => sum + item.price, 0)} ₸
                    </div>
                    <div style="color: #a78bfa; margin-bottom: 15px;">
                        Доставка: 1000 ₸
                    </div>
                    <div style="padding-top: 10px; border-top: 2px solid rgba(167, 139, 250, 0.5); color: #a78bfa; font-size: 18px; font-weight: bold;">
                        📊 Итого: ${getTotalPrice()} ₸
                    </div>
                </div>`;
            }

            content.innerHTML = `
                <div class="section">
                    <h2>Contact & Order</h2>
                    <div style="background: rgba(90, 45, 143, 0.2); border: 1px solid rgba(167, 139, 250, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                        <h3 style="color: #a78bfa; margin-bottom: 15px;">📞 Нужна помощь?</h3>
                        <p style="color: #c4b5fd; margin-bottom: 15px;">Напишите нам в поддержку:</p>
                        <a href="https://t.me/PARILKAPETROHELP_bot?start=help" target="_blank" style="display: inline-block; padding: 12px 30px; background: #5a2d8f; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; transition: 0.3s;" onmouseover="this.style.background='#8b6ba8'" onmouseout="this.style.background='#5a2d8f'">💬 Написать в поддержку</a>
                    </div>

                    <div style="background: rgba(90, 45, 143, 0.2); border: 1px solid rgba(167, 139, 250, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                        <h3 style="color: #a78bfa; margin-bottom: 15px;">📱 Контакты</h3>
                        <p style="color: #c4b5fd;">
                            <strong>Telegram:</strong> <a href="https://t.me/phantom_c0de" target="_blank" style="color: #a78bfa; text-decoration: none; font-weight: bold;">@phantom_c0de</a>
                        </p>
                    </div>
                    
                    ${cartHtml}

                    <h3 style="color: #a78bfa; margin-top: 30px; margin-bottom: 15px;">📝 Оформить заказ</h3>
                    <form id="orderForm" style="max-width: 500px; margin: 0 auto;">
                        <div style="margin-bottom: 15px;">
                            <label style="color: #c4b5fd; display: block; margin-bottom: 5px;">Адрес доставки <span style="color: #ff6b6b;">*</span></label>
                            <input type="text" id="address" required placeholder="Введите адрес" style="width: 100%; padding: 10px; background: rgba(90, 45, 143, 0.3); border: 1px solid rgba(167, 139, 250, 0.5); color: #c4b5fd; border-radius: 8px; box-sizing: border-box;">
                        </div>

                        <div style="margin-bottom: 15px;">
                            <label style="color: #c4b5fd; display: block; margin-bottom: 5px;">Номер телефона <span style="color: #ff6b6b;">*</span></label>
                            <input type="tel" id="phone" required placeholder="+7 (999) 999-99-99" style="width: 100%; padding: 10px; background: rgba(90, 45, 143, 0.3); border: 1px solid rgba(167, 139, 250, 0.5); color: #c4b5fd; border-radius: 8px; box-sizing: border-box;">
                        </div>

                        <button type="submit" class="btn" style="width: 100%; margin-top: 20px;" ${cart.length === 0 ? 'disabled' : ''}>Отправить заказ</button>
                    </form>
                    <p id="orderStatus" style="color: #a78bfa; text-align: center; margin-top: 15px;"></p>
                </div>
            `;

            // Обработчик формы заказа
            if (cart.length > 0) {
                document.getElementById('orderForm').addEventListener('submit', async (e) => {
                    e.preventDefault();
                    
                    const address = document.getElementById('address').value;
                    const phone = document.getElementById('phone').value;
                    const statusEl = document.getElementById('orderStatus');

                    if (!address || !phone) {
                        statusEl.textContent = '⚠️ Заполните все обязательные поля';
                        return;
                    }

                    const BOT_TOKEN = '8462541929:AAEAG9yz3lWK218_fDqD8QAZHIPGsYd5j_Q';
                    const CHAT_ID = '5092507567';

                    let cartItems = '';
                    cart.forEach(item => {
                        cartItems += `${item.product} - ${item.price}₸\n`;
                    });

                    const totalPrice = getTotalPrice();

                    const message = `📦 Новый заказ!

🛍️ Товары:
${cartItems}
� Сумма товаров: ${cart.reduce((sum, item) => sum + item.price, 0)}₸
🚚 Доставка: 1000₸
�💰 Итого: ${totalPrice}₸

📍 Адрес: ${address}
📞 Телефон: ${phone}`;

                    try {
                        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                chat_id: CHAT_ID,
                                text: message
                            })
                        });

                        if (response.ok) {
                            statusEl.textContent = '✅ Заказ отправлен! Ожидайте подтверждения в Telegram';
                            cart = [];
                            localStorage.setItem('cart', JSON.stringify(cart));
                            document.getElementById('orderForm').reset();
                            setTimeout(() => loadSection('home'), 2000);
                        } else {
                            statusEl.textContent = '⚠️ Ошибка при отправке. Свяжитесь с нами в Telegram';
                        }
                    } catch (error) {
                        statusEl.textContent = '⚠️ Ошибка подключения. Попробуйте позже';
                    }
                });
            }
        }
    }

    loadSection('home');
});
