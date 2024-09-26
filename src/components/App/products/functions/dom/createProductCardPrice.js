export const createProductCardPrice = ({ product }) => {
  const productCardPrice = document.createElement("span");
  productCardPrice.textContent = `Price: $${product.price}`;
  productCardPrice.style.marginRight = "10px";

  return { productCardPrice };
};
