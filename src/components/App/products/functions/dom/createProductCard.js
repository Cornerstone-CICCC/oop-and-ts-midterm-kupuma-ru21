export const createProductCard = ({ productId }) => {
  const productCard = document.createElement("div");
  productCard.style.display = "flex";
  productCard.style.gap = "20px";
  productCard.style.outline = "1px solid gray";

  return { productCard };
};
