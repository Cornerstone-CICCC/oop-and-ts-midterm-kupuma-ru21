import { Component } from "../Component.js";
import { getProductsPage } from "./products/getProductsPage.js";

export class App extends Component {
  async render() {
    try {
      return await getProductsPage();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
