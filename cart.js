 const cartContainer = document.getElementById("cart-container");
    const totalDisplay = document.getElementById("total");

    function loadCart() {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cartContainer.innerHTML = "";
      let total = 0;

      if (cart.length === 0) {
        cartContainer.innerHTML = "<h2>Your cart is empty 🛒</h2>";
        totalDisplay.textContent = "";
        return;
      }

      cart.forEach((item, index) => {
        total += parseFloat(item.price);

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <div>
            <h3>${item.title}</h3>
            <p class="price">$${item.price}</p>
          </div>
          <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
      });

      totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
    }

    function removeItem(index) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    }

    loadCart();