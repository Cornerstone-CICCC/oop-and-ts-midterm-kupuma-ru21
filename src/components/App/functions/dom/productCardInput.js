export const createProductCardInput = ({ product }) => {
  const productCardInput = document.createElement("input");
  productCardInput.type = "number";
  productCardInput.defaultValue = "1";
  productCardInput.id = `productCardInput-${product.id}`;
  productCardInput.style.borderRadius = "8px";
  productCardInput.style.padding = "8px";
  productCardInput.style.border = "1px solid gray";

  return { productCardInput };
};
