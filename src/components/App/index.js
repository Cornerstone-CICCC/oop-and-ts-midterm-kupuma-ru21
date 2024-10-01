import { Component } from "../Component.js";
import { addStylesToSortBtn } from "./functions/addStylesToSortBtn.js";
import { getProductPage } from "./product/getProductPage.js";
import { getProducts } from "./products/functions/getProducts.js";
import { getProductsPage } from "./products/getProductsPage.js";

window.historyInitiated = true;

export class App extends Component {
  async render() {
    const originalPushState = history.pushState;
    history.pushState = function (...args) {
      const result = originalPushState.apply(this, args);
      window.dispatchEvent(new Event("urlchange"));
      return result;
    };
    window.addEventListener("urlchange", () => {
      location.reload();
    });

    window.addEventListener("popstate", () => {
      if (window.historyInitiated) {
        window.location.reload();
      }
    });

    if (location.search.startsWith("?id=")) {
      const productId = location.search.split("=")[1];
      return getProductPage({ productId });
    }

    if (location.search === "?sort=desc") {
      try {
        const productsDescData = await fetch(
          "https://fakestoreapi.com/products?sort=desc"
        );
        const productsDesc = await productsDescData.json();
        const sortBtn = document.createElement("button");
        sortBtn.textContent = "Asc";
        sortBtn.style.cursor = "pointer";
        sortBtn.onclick = () => {
          history.pushState({}, "", "/");
        };
        addStylesToSortBtn({ sortBtn });
        return getProductsPage({ products: productsDesc, sortBtn });
      } catch (error) {
        console.log(error);
        return null;
      }
    }

    try {
      const { products } = await getProducts();
      const sortBtn = document.createElement("button");
      sortBtn.style.cursor = "pointer";
      sortBtn.textContent = "Desc";
      sortBtn.onclick = () => {
        const url = new URL(location);
        url.searchParams.set("sort", "desc");
        history.pushState({}, "", url);
      };
      addStylesToSortBtn({ sortBtn });
      return getProductsPage({ products, sortBtn });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
