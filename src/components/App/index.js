import { Component } from "../Component.js";
import { getProducts } from "./products/functions/getProducts.js";
import { getProductsPage } from "./products/getProductsPage.js";

export class App extends Component {
  async render() {
    let test = null;
    const originalPushState = history.pushState;
    history.pushState = function (...args) {
      const result = originalPushState.apply(this, args);
      window.dispatchEvent(new Event("urlchange"));
      return result;
    };
    window.addEventListener("urlchange", () => {
      console.log("URL changed:", window.location.href);
      location.reload();
    });

    if (location.search === "?sort=desc") {
      try {
        const productsDescData = await fetch(
          "https://fakestoreapi.com/products?sort=desc"
        );
        const productsDesc = await productsDescData.json();
        const sortBtn = document.createElement("button");
        sortBtn.textContent = "Asc";
        sortBtn.onclick = () => {
          history.pushState({}, "", "/");
        };
        return getProductsPage({ products: productsDesc, sortBtn });
      } catch (error) {
        console.log(error);
        return null;
      }
    }

    try {
      const { products } = await getProducts();
      const sortBtn = document.createElement("button");
      sortBtn.textContent = "Desc";
      sortBtn.onclick = () => {
        const url = new URL(location);
        url.searchParams.set("sort", "desc");
        history.pushState({}, "", url);
      };
      return getProductsPage({ products, sortBtn });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
