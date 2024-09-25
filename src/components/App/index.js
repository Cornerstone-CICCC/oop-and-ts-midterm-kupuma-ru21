import { Component } from "../Component.js";
import { getProducts } from "./functions/getProducts.js";
import { createHeader } from "./functions/createHeader.js";
import { createHeaderLogo } from "./functions/createHeaderLogo.js";
import { createHeaderCart } from "./functions/createHeaderCart.js";
import { createHeaderItemsInCartDescription } from "./functions/createHeaderItemsInCartDescription.js";
import { createHeaderItemsInCart } from "./functions/createHeaderItemsInCart.js";
import { createHeaderPriceDescription } from "./functions/createHeaderPriceDescription.js";
import { createHeaderPrice } from "./functions/createHeaderPrice.js";
import { createContainer } from "./functions/createContainer.js";
import { createTitle } from "./functions/createTitle.js";
import { createProductsContainer } from "./functions/createProductsContainer.js";
import { createProductCard } from "./functions/createProductCard.js";
import { createProductCardImage } from "./functions/createProductCardImage.js";
import { createProductCardTitle } from "./functions/createProductCardTitle.js";

export class App extends Component {
  async render() {
    try {
      const { products } = await getProducts();
      const { header } = createHeader();

      const { headerLogo } = createHeaderLogo();
      header.appendChild(headerLogo);

      const { headerItemsInCartDescription } =
        createHeaderItemsInCartDescription();
      const { headerItemsInCart } = createHeaderItemsInCart();
      headerItemsInCartDescription.appendChild(headerItemsInCart);

      const { headerCart } = createHeaderCart();
      headerCart.appendChild(headerItemsInCartDescription);

      const { headerPriceDescription } = createHeaderPriceDescription();
      const { headerPrice } = createHeaderPrice();
      headerPriceDescription.appendChild(headerPrice);

      headerCart.appendChild(headerPriceDescription);
      header.appendChild(headerCart);

      const wrapper = document.createElement("div");
      wrapper.appendChild(header);

      const { title } = createTitle();
      const { container } = createContainer();
      container.appendChild(title);

      const { productsContainer } = createProductsContainer();

      // create a product card
      products.forEach((product) => {
        const { productCard } = createProductCard();

        const { productCardImage } = createProductCardImage({ product });
        productCard.appendChild(productCardImage);

        // create a product card text info
        const productCardTextInfo = document.createElement("div");
        const { productCardTitle } = createProductCardTitle({ product });
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
            headerItemsInCart.textContent = String(itemCount + 1);
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
              const inputValue = event.target.value;
              const quantity = parseInt(inputValue);
              if (inputValue === "" || quantity < 1) {
                const minQuantity = 1;
                productCardInput.value = minQuantity;
                // update item count in cart
                headerItemsInCart.textContent = String(itemCount + minQuantity);
                // update total price
                headerPrice.textContent =
                  (toInt(totalPrice) + toInt(product.price) * minQuantity) / 20;
                return;
              }
              // update item count in cart
              headerItemsInCart.textContent = String(itemCount + quantity);
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
          headerItemsInCart.textContent = String(itemCount - 1);
          headerPrice.textContent =
            parseFloat(headerPrice.textContent) - product.price;

          // remove product card quantity input
          const productCardInput = document.querySelector(
            `#productCardInput-${product.id}`
          );

          headerItemsInCart.textContent = String(
            itemCount - Math.trunc(productCardInput.value)
          );
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
