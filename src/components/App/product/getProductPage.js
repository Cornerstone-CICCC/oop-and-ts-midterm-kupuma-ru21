import { createHeader } from "../products/functions/dom/createHeader.js";
import { createHeaderCart } from "../products/functions/dom/createHeaderCart.js";
import { createHeaderItemsInCart } from "../products/functions/dom/createHeaderItemsInCart.js";
import { createHeaderItemsInCartDescription } from "../products/functions/dom/createHeaderItemsInCartDescription.js";
import { createHeaderLogo } from "../products/functions/dom/createHeaderLogo.js";
import { createHeaderPrice } from "../products/functions/dom/createHeaderPrice.js";
import { createHeaderPriceDescription } from "../products/functions/dom/createHeaderPriceDescription.js";

export const getProductPage = async ({ productId }) => {
  try {
    const productData = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    );
    const product = await productData.json();

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

    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.gap = "40px";
    container.style.padding = "50px";

    const productImg = document.createElement("img");
    productImg.src = product.image;
    productImg.style.width = "300px";
    productImg.style.height = "300px";
    container.appendChild(productImg);

    const productInfo = document.createElement("div");
    const productTitle = document.createElement("h1");
    productTitle.textContent = product.title;
    productInfo.appendChild(productTitle);

    const divider = document.createElement("hr");
    productInfo.appendChild(divider);

    const productPrice = document.createElement("h2");
    productPrice.textContent = `Price: $${product.price}`;
    productInfo.appendChild(productPrice);

    const productDescription = document.createElement("p");
    productDescription.textContent = product.description;
    productDescription.style.fontSize = "20px";
    productInfo.appendChild(productDescription);

    const shareProductBtn = document.createElement("button");
    shareProductBtn.textContent = "Share";
    shareProductBtn.style.cursor = "pointer";
    shareProductBtn.onclick = async () => {
      try {
        await navigator.share({ title: document.title, url: "" });
      } catch (error) {
        console.error("Failed to share:", error);
      }
    };
    productInfo.appendChild(shareProductBtn);

    container.appendChild(productInfo);

    wrapper.appendChild(container);
    return wrapper;
  } catch (error) {
    console.log(error);
    return null;
  }
};
