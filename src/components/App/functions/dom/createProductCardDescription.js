export const createProductCardDescription = ({ product }) => {
  const productCardDescription = document.createElement("p");
  productCardDescription.textContent = product.description;
  productCardDescription.className = "productCardDescription";

  return { productCardDescription };
};
