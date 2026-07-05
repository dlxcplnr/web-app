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

    // 1. Deleting the button
    const oldBtn = document.querySelector(".load-more-btn");
    if (oldBtn) {
        oldBtn.remove();
    }

    //// !!!! Attention! There request for giving Object - start
    // Data
    const cheesecake = {
        // title: "Чізкейк",
        // description: "Відмінно смакує до кави",
        price: "85 грн",
        img: "img/cake_select.png"
    };

    // 2. making a card
    const card = document.createElement("article");
    card.classList.add("menu-card");
    // Data, including those from API
    card.innerHTML = `
        <h3 class="menu-title">${posts[currentIndex].title}</h3>
        <p class="menu-description">${posts[currentIndex].description}</p>
        <p class="menu-price">${cheesecake.price}</p>
        <img src="${cheesecake.img}">
        <a onclick="select_order_item('cheesecake')">Отримати</a>
    `;

        //// !!!! Attention! There request for giving Object - end

    currentIndex++;

    menuSection.appendChild(card);

    // 3. Creating button again
    const newBtn = document.createElement("a");
    newBtn.textContent = "Відкрити ще";
    newBtn.classList.add("load-more-btn");

    // Because better from addEventListener, than onclick
    newBtn.addEventListener("click", Download_new_article);

    menuSection.appendChild(newBtn);
}

// table of products (product - cost)
const products = {
    espresso: { name: "Еспресо", price: 60 },
    capuccino: { name: "Капучино", price: 85 },
    cheesecake: { name: "Чизкейк", price: 85 }
};

// orders (void at start)
let order = {};

// adding a product
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

/// output to the block 'Orders'
function renderOrder() {
    const container = document.getElementById("order");
    container.innerHTML = "";

    for (let key in order) {
        const item = order[key];

        const p = document.createElement("p");
        p.textContent = `${item.name} - ${item.quantity}`;

        container.appendChild(p);
    }

    // result
    const total = calculateTotal();

    const totalP = document.createElement("p");
    totalP.innerHTML = `<strong>Всього: ${total} грн</strong>`;

    container.appendChild(totalP);
}

// remaked for online-cafe "Coffee mood"

// API for test

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

