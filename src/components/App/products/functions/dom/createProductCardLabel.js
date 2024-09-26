export const createProductCardLabel = ({ product }) => {
  const productCardLabel = document.createElement("label");
  productCardLabel.textContent = "Quantity: ";
  productCardLabel.id = `productCardLabel-${product.id}`;
  productCardLabel.htmlFor = `productCardInput-${product.id}`;

  return { productCardLabel };
};
