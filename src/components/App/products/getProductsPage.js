import { getProducts } from "./functions/getProducts.js";
import { createHeader } from "./functions/dom/createHeader.js";
import { createHeaderLogo } from "./functions/dom/createHeaderLogo.js";
import { createHeaderCart } from "./functions/dom/createHeaderCart.js";
import { createHeaderItemsInCartDescription } from "./functions/dom/createHeaderItemsInCartDescription.js";
import { createHeaderItemsInCart } from "./functions/dom/createHeaderItemsInCart.js";
import { createHeaderPriceDescription } from "./functions/dom/createHeaderPriceDescription.js";
import { createHeaderPrice } from "./functions/dom/createHeaderPrice.js";
import { createContainer } from "./functions/dom/createContainer.js";
import { createTitle } from "./functions/dom/createTitle.js";
import { createProductsContainer } from "./functions/dom/createProductsContainer.js";
import { createProductCard } from "./functions/dom/createProductCard.js";
import { createProductCardImage } from "./functions/dom/createProductCardImage.js";
import { createProductCardTitle } from "./functions/dom/createProductCardTitle.js";
import { getTotalItemCount } from "./functions/getTotalItemCount.js";
import { getTotalPrice } from "./functions/getTotalPrice.js";
import { toInt } from "./functions/toInt.js";
import { createProductCardDescription } from "./functions/dom/createProductCardDescription.js";
import { createProductCardPrice } from "./functions/dom/createProductCardPrice.js";
import { createProductCardCartBtn } from "./functions/dom/createProductCardCartBtn.js";
import { addDefaultStyleToBtn } from "./functions/dom/addDefaultStyleToBtn.js";
import { createProductCardInput } from "./functions/dom/productCardInput.js";
import { createProductCardLabel } from "./functions/dom/createProductCardLabel.js";

export const getProductsPage = async () => {
  const { products } = await getProducts();
  const { header } = createHeader();

  const { headerLogo } = createHeaderLogo();
  header.appendChild(headerLogo);

  const { headerItemsInCartDescription } = createHeaderItemsInCartDescription();
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
  const itemCountData = {};
  const itemPriceData = {};
  products.forEach((product) => {
    const { productCard } = createProductCard({ productId: product.id });

    const { productCardImage } = createProductCardImage({ product });
    productCard.appendChild(productCardImage);

    // create a product card text info
    const productCardTextInfo = document.createElement("div");
    const { productCardTitle } = createProductCardTitle({ product });
    productCardTextInfo.appendChild(productCardTitle);

    const { productCardDescription } = createProductCardDescription({
      product,
    });
    productCardTextInfo.appendChild(productCardDescription);

    const { productCardPrice } = createProductCardPrice({ product });
    productCardTextInfo.appendChild(productCardPrice);

    // create a product card button
    const { productCardCartBtn } = createProductCardCartBtn();
    addDefaultStyleToBtn({ btn: productCardCartBtn });
    productCardCartBtn.onclick = () => {
      if (productCardCartBtn.textContent === "Add to Cart") {
        productCardCartBtn.textContent = "Remove from Cart";
        productCardCartBtn.style.backgroundColor = "skyblue";

        itemCountData[product.id] = 1;
        headerItemsInCart.textContent = String(
          getTotalItemCount(itemCountData)
        );

        itemPriceData[product.id] = product.price;
        headerPrice.textContent = String(getTotalPrice(itemPriceData));

        // create a product card quantity input
        const { productCardLabel } = createProductCardLabel({ product });
        productCardTextInfo.appendChild(productCardLabel);

        const { productCardInput } = createProductCardInput({ product });
        productCardInput.onchange = (event) => {
          const inputValue = event.target.value;
          const quantity = parseInt(inputValue);
          if (inputValue === "" || quantity < 1) {
            const minQuantity = 1;
            productCardInput.value = minQuantity;
            // update item count in cart
            itemCountData[product.id] = minQuantity;
            headerItemsInCart.textContent = String(
              Object.values(itemCountData).reduce((acc, curr) => acc + curr, 0)
            );
            // update total price
            itemPriceData[product.id] = product.price;
            headerPrice.textContent = String(getTotalPrice(itemPriceData));
            return;
          }
          // update item count in cart
          itemCountData[product.id] = quantity;
          headerItemsInCart.textContent = String(
            Object.values(itemCountData).reduce((acc, curr) => acc + curr, 0)
          );
          // update total price
          itemPriceData[product.id] = (toInt(product.price) * quantity) / 20;
          headerPrice.textContent = String(getTotalPrice(itemPriceData));
        };
        productCardTextInfo.appendChild(productCardInput);
        return;
      }

      addDefaultStyleToBtn({ btn: productCardCartBtn });
      itemCountData[product.id] = 0;
      headerItemsInCart.textContent = String(getTotalItemCount(itemCountData));
      itemPriceData[product.id] = 0;
      headerPrice.textContent = String(getTotalPrice(itemPriceData));

      // remove product card quantity input
      document.querySelector(`#productCardLabel-${product.id}`).remove();
      document.querySelector(`#productCardInput-${product.id}`).remove();
    };
    productCardTextInfo.appendChild(productCardCartBtn);

    productCard.appendChild(productCardTextInfo);

    productsContainer.appendChild(productCard);
  });

  container.appendChild(productsContainer);
  wrapper.appendChild(container);
  return wrapper;
};
