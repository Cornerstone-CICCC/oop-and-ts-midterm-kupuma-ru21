export const createProductsContainer = () => {
  const productsContainer = document.createElement("div");
  productsContainer.style.display = "flex";
  productsContainer.style.flexDirection = "column";
  productsContainer.style.justifyContent = "center";
  productsContainer.style.gap = "8px";

  return { productsContainer };
};
