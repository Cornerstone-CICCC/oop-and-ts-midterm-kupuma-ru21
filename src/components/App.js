import { Component } from "../common/Component.js";

export class App extends Component {
  async render() {
    try {
      // fetch products data
      const productsData = await fetch("https://fakestoreapi.com/products");
      const products = await productsData.json();

      // create a wrapper
      const wrapper = document.createElement("div");

      // create a header
      const header = document.createElement("header");
      header.style.display = "flex";
      header.style.justifyContent = "space-between";
      header.style.alignItems = "center";
      header.style.outline = "1px solid gray";
      header.style.padding = "8px";
      header.style.position = "sticky";
      header.style.top = "0";
      header.style.backgroundColor = "#0F141A";
      header.style.color = "#fff";

      const headerLogo = document.createElement("img");
      headerLogo.src = "/public/logo.svg";
      headerLogo.alt = "logo";
      headerLogo.style.width = "130px";
      headerLogo.style.height = "50px";
      header.appendChild(headerLogo);

      const headerCart = document.createElement("div");
      headerCart.style.display = "flex";
      headerCart.style.gap = "8px";

      const headerItemsInCartDescription = document.createElement("span");
      headerItemsInCartDescription.textContent = "Items in Cart: ";
      const headerItemsInCart = document.createElement("span");
      headerItemsInCart.textContent = "0";
      headerItemsInCartDescription.appendChild(headerItemsInCart);
      headerCart.appendChild(headerItemsInCartDescription);

      const headerPriceDescription = document.createElement("span");
      headerPriceDescription.textContent = "/ Total Price: $ ";
      const headerPrice = document.createElement("span");
      headerPrice.textContent = "0";
      headerPriceDescription.appendChild(headerPrice);

      headerCart.appendChild(headerPriceDescription);
      header.appendChild(headerCart);

      wrapper.appendChild(header);

      // create a container
      const container = document.createElement("div");
      container.style.padding = "20px";

      // create a title
      const title = document.createElement("h1");
      title.textContent = "Products";
      title.style.marginBottom = "20px";
      container.appendChild(title);

      // create a productsContainer
      const productsContainer = document.createElement("div");
      productsContainer.style.display = "flex";
      productsContainer.style.flexDirection = "column";
      productsContainer.style.justifyContent = "center";
      productsContainer.style.gap = "8px";

      // create a product card
      products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.style.display = "flex";
        productCard.style.gap = "20px";
        productCard.style.outline = "1px solid gray";

        // create a product card image
        const productCardImage = document.createElement("img");
        productCardImage.src = product.image;
        productCardImage.alt = product.title;
        productCardImage.style.width = "200px";
        productCardImage.style.height = "200px";
        productCardImage.style.minWidth = "200px";
        productCardImage.style.outline = "1px solid gray";
        productCard.appendChild(productCardImage);

        // create a product card text info
        const productCardTextInfo = document.createElement("div");
        const productCardTitle = document.createElement("h2");
        productCardTitle.textContent = product.title;
        productCardTitle.className = "productCardTitle";
        productCardTextInfo.appendChild(productCardTitle);

        const productCardDescription = document.createElement("p");
        productCardDescription.textContent = product.description;
        productCardDescription.className = "productCardDescription";
        productCardTextInfo.appendChild(productCardDescription);

        const productCardPrice = document.createElement("span");
        productCardPrice.textContent = `Price: $${product.price}`;
        productCardPrice.style.marginRight = "10px";
        productCardTextInfo.appendChild(productCardPrice);

        // create a product card button
        const productCardCartBtn = document.createElement("button");
        productCardCartBtn.style.marginRight = "10px";
        productCardCartBtn.style.border = "none";
        productCardCartBtn.style.padding = "8px";
        productCardCartBtn.style.borderRadius = "8px";
        productCardCartBtn.style.cursor = "pointer";
        const changeToDefaultBtn = () => {
          productCardCartBtn.textContent = "Add to Cart";
          productCardCartBtn.style.backgroundColor = "#FFD712";
        };
        changeToDefaultBtn();
        productCardCartBtn.onclick = () => {
          const itemCount = parseInt(headerItemsInCart.textContent);
          const totalPrice = Number(headerPrice.textContent);
          const toInt = (num) => Math.trunc(num * 20);

          if (productCardCartBtn.textContent === "Add to Cart") {
            productCardCartBtn.textContent = "Remove from Cart";
            productCardCartBtn.style.backgroundColor = "skyblue";
            headerItemsInCart.textContent = itemCount + 1;
            headerPrice.textContent =
              (toInt(totalPrice) + toInt(product.price)) / 20;

            // create a product card quantity input
            const productCardLabel = document.createElement("label");
            productCardLabel.textContent = "Quantity: ";
            productCardLabel.id = `productCardLabel-${product.id}`;
            productCardLabel.htmlFor = `productCardInput-${product.id}`;
            productCardTextInfo.appendChild(productCardLabel);
            const productCardInput = document.createElement("input");
            productCardInput.type = "number";
            productCardInput.defaultValue = "1";
            productCardInput.onchange = (event) => {
              const quantity = parseInt(event.target.value);
              if (quantity < 1) {
                const minQuantity = 1;
                productCardInput.value = minQuantity;
                // update item count in cart
                headerItemsInCart.textContent = itemCount + minQuantity;
                // update total price
                headerPrice.textContent =
                  (toInt(totalPrice) + toInt(product.price) * minQuantity) / 20;
                return;
              }
              // update item count in cart
              headerItemsInCart.textContent = itemCount + quantity;
              // update total price
              headerPrice.textContent =
                (toInt(totalPrice) + toInt(product.price) * quantity) / 20;
            };
            productCardInput.id = `productCardInput-${product.id}`;
            productCardInput.style.borderRadius = "8px";
            productCardInput.style.padding = "8px";
            productCardInput.style.border = "1px solid gray";
            productCardTextInfo.appendChild(productCardInput);
            return;
          }

          changeToDefaultBtn();
          headerItemsInCart.textContent = itemCount - 1;
          headerPrice.textContent =
            parseFloat(headerPrice.textContent) - product.price;

          // remove product card quantity input
          const productCardInput = document.querySelector(
            `#productCardInput-${product.id}`
          );
          headerItemsInCart.textContent = itemCount - productCardInput.value;
          headerPrice.textContent =
            (toInt(totalPrice) -
              toInt(product.price) * Number(productCardInput.value)) /
            20;

          productCardInput.remove();
          document.querySelector(`#productCardLabel-${product.id}`).remove();
        };
        productCardTextInfo.appendChild(productCardCartBtn);

        productCard.appendChild(productCardTextInfo);

        productsContainer.appendChild(productCard);
      });

      container.appendChild(productsContainer);
      wrapper.appendChild(container);
      return wrapper;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
