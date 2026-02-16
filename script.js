const apiURL = "https://fakestoreapi.com/products";
const container = document.getElementById("product-container");
const searchInput = document.getElementById("searchInput");
let allProducts = [];

// Load all products
async function loadProducts() {
  const res = await fetch(apiURL);
  allProducts = await res.json();
  displayProducts(allProducts);
}

// Display products in cards
function displayProducts(products) {
  container.innerHTML = "";
  if (products.length === 0) {
    container.innerHTML =
      "<h2 style='text-align:center;'>No products found 😢</h2>";
    return;
  }
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p class="price">$${product.price}</p>
          <button onclick="addToCart('${product.id}', '${product.title}', '${product.price}', '${product.image}')">
            Add to Cart
          </button>
        `;
    container.appendChild(card);
  });
}

// Add to cart
function addToCart(id, title, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ id, title, price, image });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${title} added to cart!`);
}

// Search Function
function searchProducts() {
  const query = searchInput.value.toLowerCase();
  const filtered = allProducts.filter((product) =>
    product.title.toLowerCase().includes(query)
  );
  displayProducts(filtered);
}

loadProducts();
