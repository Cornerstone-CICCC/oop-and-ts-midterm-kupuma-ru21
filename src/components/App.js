import { Component } from "../common/Component.js";

export class App extends Component {
  async render() {
    try {
      // fetch products data
      const productsData = await fetch("https://fakestoreapi.com/products");
      const products = await productsData.json();

      // create a container
      const container = document.createElement("div");

      // create a header
      const header = document.createElement("header");
      header.style.display = "flex";
      header.style.justifyContent = "space-between";
      header.style.outline = "1px solid gray";
      header.style.padding = "8px";
      header.style.position = "sticky";
      header.style.top = "0";
      header.style.backgroundColor = "white";

      const headerLogoText = document.createElement("span");
      headerLogoText.textContent = "Fake Store";
      header.appendChild(headerLogoText);

      const headerCart = document.createElement("div");
      headerCart.style.display = "flex";
      headerCart.style.gap = "8px";

      const headerItemsInCartDescription = document.createElement("span");
      headerItemsInCartDescription.textContent = "Items in Cart: ";
      const headerItemsInCart = document.createElement("span");
      headerItemsInCart.textContent = "0";
      headerItemsInCartDescription.appendChild(headerItemsInCart);
      headerCart.appendChild(headerItemsInCartDescription);
      header.appendChild(headerCart);

      const headerPriceDescription = document.createElement("span");
      headerPriceDescription.textContent = "/ Total Price: $ ";
      const headerPrice = document.createElement("span");
      headerPrice.textContent = "0";
      headerPriceDescription.appendChild(headerPrice);
      headerCart.appendChild(headerPriceDescription);
      header.appendChild(headerCart);

      container.appendChild(header);

      // create a title
      const title = document.createElement("h1");
      title.textContent = "Products";
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
        productCard.style.gap = "8px";
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

        const productCardPriceUnit = document.createElement("span");
        productCardPriceUnit.textContent = "Price: $";
        productCardTextInfo.appendChild(productCardPriceUnit);

        const productCardPrice = document.createElement("span");
        productCardPrice.textContent = `${product.price}`;
        productCardPrice.style.marginRight = "10px";
        productCardTextInfo.appendChild(productCardPrice);

        // create a product card button
        const productCardBtn = document.createElement("button");
        productCardBtn.textContent = "Add to Cart";
        productCardBtn.style.marginRight = "10px";
        productCardBtn.onclick = () => {
          const itemCount = parseInt(headerItemsInCart.textContent);

          if (productCardBtn.textContent === "Add to Cart") {
            productCardBtn.textContent = "Remove from Cart";
            headerItemsInCart.textContent = itemCount + 1;
            headerPrice.textContent =
              parseFloat(headerPrice.textContent) + product.price;

            // create a product card quantity input
            const productCardLabel = document.createElement("label");
            productCardLabel.textContent = "Quantity: ";
            productCardLabel.id = "productCardLabel";
            productCardTextInfo.appendChild(productCardLabel);
            const productCardInput = document.createElement("input");
            productCardInput.type = "number";
            productCardInput.min = "1";
            productCardInput.defaultValue = "1";
            productCardInput.onchange = (event) => {
              const quantity = parseInt(event.target.value);
              headerItemsInCart.textContent = itemCount + quantity;
            };
            productCardInput.id = "productCardInput";
            productCardTextInfo.appendChild(productCardInput);
            return;
          }

          headerItemsInCart.textContent = itemCount - 1;
          productCardBtn.textContent = "Add to Cart";
          headerPrice.textContent =
            parseFloat(headerPrice.textContent) - product.price;

          // remove product card quantity input
          const productCardInput = document.querySelector("#productCardInput");
          headerItemsInCart.textContent = itemCount - productCardInput.value;
          productCardInput.remove();

          document.querySelector("#productCardLabel").remove();
        };
        productCardTextInfo.appendChild(productCardBtn);

        productCard.appendChild(productCardTextInfo);

        productsContainer.appendChild(productCard);
      });

      container.appendChild(productsContainer);
      return container;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
