let posts = [];
let currentIndex = 3;
const maxPosts = 6;

function Download_new_article() {

    if (currentIndex === maxPosts) {
        const loadbtn_info = document.querySelector('.load-more-btn');
        loadbtn_info.textContent = 'Наразі, це всі страви та кавові напої. Бажаєте побачити більше?' ;
        return;
    }

    const menuSection = document.querySelector(".menu");

    // 1. Видаляємо кнопку
    const oldBtn = document.querySelector(".load-more-btn");
    if (oldBtn) {
        oldBtn.remove();
    }

    //// !!!! UVAGA OTUT ZAPIT NA OTRIMANNYA objectu - pochatok
    // Дані
    const cheesecake = {
        // title: "Чізкейк",
        // description: "Відмінно смакує до кави",
        price: "85 грн",
        img: "img/cake_select.png"
    };

    // 2. Створюємо картку
    const card = document.createElement("article");
    card.classList.add("menu-card");
    // Дані, включаючи ті, що з API
    card.innerHTML = `
        <h3 class="menu-title">${posts[currentIndex].title}</h3>
        <p class="menu-description">${posts[currentIndex].description}</p>
        <p class="menu-price">${cheesecake.price}</p>
        <img src="${cheesecake.img}">
        <a onclick="select_order_item('cheesecake')">Отримати</a>
    `;

        //// !!!! UVAGA OTUT ZAPIT NA OTRIMANNYA objectu - cinec

    currentIndex++;

    menuSection.appendChild(card);

    // 3. Створюємо кнопку заново
    const newBtn = document.createElement("a");
    newBtn.textContent = "Відкрити ще";
    newBtn.classList.add("load-more-btn");

    // оскільки краще через addEventListener, аніж onclick
    newBtn.addEventListener("click", Download_new_article);

    menuSection.appendChild(newBtn);
}

// перелік товарів (продукт - ціна)
const products = {
    espresso: { name: "Еспресо", price: 60 },
    capuccino: { name: "Капучино", price: 85 },
    cheesecake: { name: "Чизкейк", price: 85 }
};

// замовлення (пусте спочатку)
let order = {};

// додавання товару
function select_order_item(productKey) {
    const product = products[productKey];
    if (!product) return;

    if (order[productKey]) {
        order[productKey].quantity++;
    } else {
        order[productKey] = {
            name: product.name,
            price: product.price,
            quantity: 1
        };
    }

    renderOrder();

    //makeVisibleOrderbtn();
    const orderBtn = document.getElementById("hidden_order_btn");
    orderBtn.style.display = "inline";
}

function calculateTotal() {
    let total = 0;

    for (let key in order) {
        const item = order[key];
        total += item.price * item.quantity;
    }

    return total;
}

/// вивід у блок Замовлення
function renderOrder() {
    const container = document.getElementById("order");
    container.innerHTML = "";

    for (let key in order) {
        const item = order[key];

        const p = document.createElement("p");
        p.textContent = `${item.name} - ${item.quantity}`;

        container.appendChild(p);
    }

    // результат
    const total = calculateTotal();

    const totalP = document.createElement("p");
    totalP.innerHTML = `<strong>Всього: ${total} грн</strong>`;

    container.appendChild(totalP);
}

// переробив під магазин кави

// API тестове

async function loadPosts() {
    const loadbtn_info = document.querySelector('.load-more-btn');

    try {
        const response = await fetch('/api/posts.php');

        if (!response.ok) {
            throw new Error('HTTP помилка: ' + response.status);
        }

        const result = await response.json();

        if (result.status === 'success') {
            posts = result.data;

            // posts.forEach(post => {
            //     post.description = post.description.slice(0, 20);
            // });

        } else {
            throw new Error(result.message);
        }

    } catch (err) {
        if (loadbtn_info) {
            loadbtn_info.textContent = 'Не вдалося завантажити інформацію';
        }
        console.error(err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
});

