let products = JSON.parse(localStorage.getItem("products")) || [];
const container = document.getElementById("product-container");
const search = document.getElementById("search");
const categoryFilter = document.getElementById("category-filter");
const sortSelect = document.getElementById("sort");
let scrollIndex = 0;
const cardWidth = 240;
const visibleCards = 3;


function renderProducts() {
  let filtered = [...products];

  const searchValue = search.value.toLowerCase();
  filtered = filtered.filter(p => p.name.toLowerCase().includes(searchValue));

  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  const sortBy = sortSelect.value;
  if (sortBy === "asc") filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "desc") filtered.sort((a, b) => b.price - a.price);

  container.innerHTML = "";
  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <p><small>${product.category}</small></p>
    `;
    container.appendChild(card);
  });
}


function scrollSlider(direction) {
  const container = document.getElementById("product-container");
  const totalCards = container.children.length;
  const maxIndex = Math.max(0, totalCards - visibleCards);

  scrollIndex += direction;
  scrollIndex = Math.max(0, Math.min(scrollIndex, maxIndex));

  const newTransform = -(scrollIndex * cardWidth);
  container.style.transform = `translateX(${newTransform}px)`;
}

function populateCategories() {
  const categories = new Set(products.map(p => p.category));
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

[search, categoryFilter, sortSelect].forEach(el => 
  el.addEventListener("input", renderProducts));



  populateCategories();
renderProducts();
