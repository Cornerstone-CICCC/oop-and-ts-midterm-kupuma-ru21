export const createProductCardImage = ({ product }) => {
  const productCardImage = document.createElement("img");
  productCardImage.src = product.image;
  productCardImage.alt = product.title;
  productCardImage.style.width = "200px";
  productCardImage.style.height = "200px";
  productCardImage.style.minWidth = "200px";
  productCardImage.style.outline = "1px solid gray";

  return { productCardImage };
};
