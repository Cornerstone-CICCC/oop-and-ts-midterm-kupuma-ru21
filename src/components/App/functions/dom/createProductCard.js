export const createProductCard = ({ productId }) => {
  const productCard = document.createElement("a");
  productCard.style.display = "flex";
  productCard.style.gap = "20px";
  productCard.style.outline = "1px solid gray";

  productCard.onclick = () => {
    console.log("productCard clicked");
    history.pushState({}, "", productId);
  };

  return { productCard };
};
