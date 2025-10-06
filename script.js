/* Café Aroma - script.js
   Safe, DOMContentLoaded wrapped, no console errors.
*/

const coffees = [
  { id: 1,  name: "Espresso", price: 120, category: "Hot",     image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tazzina_di_caff%C3%A8_a_Ventimiglia.jpg/500px-Tazzina_di_caff%C3%A8_a_Ventimiglia.jpg" },
  { id: 2,  name: "Americano", price: 130, category: "Hot",    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80" },
  { id: 3,  name: "Cappuccino", price: 150, category: "Hot",   image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80" },
  { id: 4,  name: "Latte", price: 140, category: "Hot",       image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=801&q=80" },
  { id: 5,  name: "Flat White", price: 145, category: "Hot",  image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&q=80" },
  { id: 6,  name: "Macchiato", price: 135, category: "Hot",   image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Macchiato_%287199366530%29.jpg/500px-Macchiato_%287199366530%29.jpg" },
  { id: 7,  name: "Turkish Coffee", price: 160, category: "Hot", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/T%C3%BCrk_Kahvesi_-_Bakir_Cezve.jpg/500px-T%C3%BCrk_Kahvesi_-_Bakir_Cezve.jpg" },

  { id: 8,  name: "Iced Latte", price: 180, category: "Cold",  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Affogato_al_Caffe.jpg/500px-Affogato_al_Caffe.jpg" },
  { id: 9,  name: "Cold Brew", price: 170, category: "Cold",  image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80" },
  { id: 10, name: "Iced Americano", price: 150, category: "Cold", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Espresso_Americano.jpeg/500px-Espresso_Americano.jpeg" },
  { id: 11, name: "Affogato", price: 190, category: "Cold",   image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Vinoteca%2C_Smithfield%2C_London_%284485849609%29.jpg/500px-Vinoteca%2C_Smithfield%2C_London_%284485849609%29.jpg" },
  { id: 12, name: "Nitro Cold Brew", price: 220, category: "Cold", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/ColdBrewCoffeein_Cans.png/500px-ColdBrewCoffeein_Cans.png" },
  { id: 13, name: "Iced Mocha", price: 200, category: "Cold",  image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=803&q=80" },
  { id: 14, name: "Frappé", price: 160, category: "Cold",     image: "https://images.unsplash.com/photo-1587731556938-38755b4803a6?w=800&q=80" },

  { id: 15, name: "Hazelnut Latte", price: 200, category: "Special", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Caffe_Latte_at_Pulse_Cafe.jpg/500px-Caffe_Latte_at_Pulse_Cafe.jpg" },
  { id: 16, name: "Caramel Macchiato", price: 210, category: "Special", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Latte_macchiato_with_coffee_beans.jpg/500px-Latte_macchiato_with_coffee_beans.jpg" },
  { id: 17, name: "Vanilla Latte", price: 200, category: "Special", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Double_flower_%28latte_art%29.jpg/500px-Double_flower_%28latte_art%29.jpg" },
  { id: 18, name: "Mocha Deluxe", price: 220, category: "Special", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=805&q=80" },
  { id: 19, name: "Signature Blend", price: 250, category: "Special", image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=806&q=80" },
  { id: 20, name: "Seasonal Spice", price: 230, category: "Special", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Latte_and_dark_coffee.jpg/500px-Latte_and_dark_coffee.jpg" }
];

const TAX_RATE = 0.05; // 5% GST

document.addEventListener('DOMContentLoaded', () => {

  // DOM refs
  const coffeeList = document.getElementById('coffee-list');
  const searchInput = document.getElementById('search');
  const categorySelect = document.getElementById('category');

  const cartDiv = document.getElementById('cart');
  const subtotalSpan = document.getElementById('subtotal');
  const taxSpan = document.getElementById('tax');
  const totalSpan = document.getElementById('total');
  const clearCartBtn = document.getElementById('clearCartBtn');
  const generateBillBtn = document.getElementById('generateBillBtn');
  const billMessage = document.getElementById('billMessage');

  const bookForm = document.getElementById('bookForm');
  const bookMessage = document.getElementById('bookMessage');

  const contactForm = document.getElementById('contactForm');
  const contactMessage = document.getElementById('contactMessage');

  // Cart state: array of { id, name, price, qty }
  let cart = [];

  // Render functions
  function renderCoffees(list) {
    coffeeList.innerHTML = '';
    if (!list || list.length === 0) {
      coffeeList.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--muted)">No coffees match your search.</div>`;
      return;
    }

    list.forEach(coffee => {
      const card = document.createElement('div');
      card.className = 'menu-item';
      card.innerHTML = `
        <div class="thumb"><img src="${coffee.image}" alt="${coffee.name}"></div>
        <h3>${coffee.name}</h3>
        <div class="muted">${coffee.category} • ₹${coffee.price}</div>
        <div class="meta">
          <div><strong>₹${coffee.price}</strong></div>
          <div style="display:flex;gap:8px">
            <button class="btn ghost view-btn" data-id="${coffee.id}">View</button>
            <button class="btn primary add-btn" data-id="${coffee.id}">Add</button>
          </div>
        </div>
      `;
      coffeeList.appendChild(card);
    });

    // attach event listeners to the new buttons
    coffeeList.querySelectorAll('.add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(e.currentTarget.dataset.id);
        addToCartById(id);
      });
    });
    coffeeList.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(e.currentTarget.dataset.id);
        const c = coffees.find(x => x.id === id);
        if (c) alert(`${c.name}\n\nCategory: ${c.category}\nPrice: ₹${c.price}\n\n${c.name} — ${c.category}`);
      });
    });
  }

  // Filtering: by search + category
  function filterAndRender() {
    const q = (searchInput.value || '').trim().toLowerCase();
    const cat = categorySelect.value || 'All';
    const filtered = coffees.filter(c => {
      const matchCat = (cat === 'All') || (c.category === cat);
      const matchQ = c.name.toLowerCase().includes(q) || (c.category.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
    renderCoffees(filtered);
  }

  // Cart helpers
  function addToCartById(id) {
    const coffee = coffees.find(c => c.id === id);
    if (!coffee) return;
    const existing = cart.find(it => it.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ id: coffee.id, name: coffee.name, price: coffee.price, qty: 1 });
    updateCartUI();
    showToast(`${coffee.name} added to cart`);
  }

  function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(id);
    updateCartUI();
  }

  function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
  }

  function clearCart() {
    if (!cart.length) return;
    if (!confirm('Clear your cart?')) return;
    cart = [];
    updateCartUI();
    billMessage.textContent = '';
  }

  function calculateTotals() {
    const subtotal = cart.reduce((s, it) => s + (it.price * it.qty), 0);
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }

  function updateCartUI() {
    // render cart area
    cartDiv.innerHTML = '';
    if (!cart.length) {
      cartDiv.innerHTML = `<div style="color:var(--muted)">Your cart is empty. Add coffees from the menu.</div>`;
    } else {
      cart.forEach(it => {
        const row = document.createElement('div');
        row.className = 'cart-row';
        row.style.display = 'flex';
        row.style.justifyContent = 'space-between';
        row.style.alignItems = 'center';
        row.style.padding = '8px 0';
        row.innerHTML = `
          <div>
            <div style="font-weight:700">${it.name}</div>
            <div style="color:var(--muted);font-size:0.95rem">₹${it.price} × <span class="qty">${it.qty}</span></div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
            <div>
              <button class="btn" data-action="inc" data-id="${it.id}">+</button>
              <button class="btn" data-action="dec" data-id="${it.id}">-</button>
            </div>
            <button class="btn" data-action="remove" data-id="${it.id}">Remove</button>
          </div>
        `;
        cartDiv.appendChild(row);
      });
    }

    // update totals
    const t = calculateTotals();
    subtotalSpan.textContent = t.subtotal;
    taxSpan.textContent = t.tax;
    totalSpan.textContent = t.total;
  }

  // event delegation for cart buttons
  cartDiv.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const action = btn.dataset.action;
    const id = btn.dataset.id ? Number(btn.dataset.id) : null;
    if (!action || !id) return;
    if (action === 'inc') changeQty(id, 1);
    if (action === 'dec') changeQty(id, -1);
    if (action === 'remove') removeFromCart(id);
  });

  // generate bill
  function generateBill() {
    if (!cart.length) {
      billMessage.textContent = 'Add some coffees to generate a bill.';
      return;
    }
    const t = calculateTotals();
    const lines = cart.map(it => `${it.name} × ${it.qty} = ₹${it.qty * it.price}`).join('\n');
    const receipt = `Café Aroma\n\n${lines}\n\nSubtotal: ₹${t.subtotal}\nGST (5%): ₹${t.tax}\nTotal: ₹${t.total}\n\nThank you!`;
    alert(receipt);
    billMessage.textContent = `Bill generated: ₹${t.total}. (Shown in popup)`;
  }

  // small toast
  let toastTimer = null;
  function showToast(txt) {
    let el = document.getElementById('cafToast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'cafToast';
      el.style.position = 'fixed';
      el.style.right = '16px';
      el.style.bottom = '18px';
      el.style.background = 'var(--accent)';
      el.style.color = '#fff';
      el.style.padding = '10px 14px';
      el.style.borderRadius = '10px';
      el.style.boxShadow = '0 6px 20px rgba(0,0,0,0.12)';
      document.body.appendChild(el);
    }
    el.textContent = txt;
    el.style.opacity = '1';
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.style.opacity = '0'; }, 1800);
  }

  // Booking form
  bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('bk_name').value.trim();
    const people = document.getElementById('bk_people').value.trim();
    const date = document.getElementById('bk_date').value;
    const time = document.getElementById('bk_time').value;
    if (!name || !people || !date || !time) { bookMessage.textContent = 'Please fill all fields'; return; }
    const booking = { id: Date.now(), name, people, date, time };
    // save to localStorage (append)
    const existing = JSON.parse(localStorage.getItem('cafearoma_bookings') || '[]');
    existing.push(booking);
    localStorage.setItem('cafearoma_bookings', JSON.stringify(existing));
    bookMessage.textContent = `✅ Table booked for ${people} person(s) on ${date} at ${time}. See you, ${name}!`;
    bookForm.reset();
  });

  // Contact form
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const n = document.getElementById('ct_name').value.trim();
    const em = document.getElementById('ct_email').value.trim();
    const msg = document.getElementById('ct_msg').value.trim();
    if (!n || !em || !msg) { contactMessage.textContent = 'Please fill all fields.'; return; }
    contactMessage.textContent = '✅ Message sent. We will contact you soon!';
    contactForm.reset();
  });

  // wired buttons
  clearCartBtn.addEventListener('click', clearCart);
  generateBillBtn.addEventListener('click', generateBill);

  // search + category
  searchInput.addEventListener('input', filterAndRender);
  categorySelect.addEventListener('change', filterAndRender);

  // initial render
  document.getElementById('year').textContent = new Date().getFullYear();
  filterAndRender();
  updateCartUI();
});
