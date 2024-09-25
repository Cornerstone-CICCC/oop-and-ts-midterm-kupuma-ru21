export const createProductCardTitle = ({ product }) => {
  const productCardTitle = document.createElement("h2");
  productCardTitle.textContent = product.title;
  productCardTitle.className = "productCardTitle";

  return { productCardTitle };
};
