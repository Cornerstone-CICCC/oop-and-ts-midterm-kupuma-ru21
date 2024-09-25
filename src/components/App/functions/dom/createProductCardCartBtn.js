export const createProductCardCartBtn = () => {
  const productCardCartBtn = document.createElement("button");
  productCardCartBtn.style.marginRight = "10px";
  productCardCartBtn.style.border = "none";
  productCardCartBtn.style.padding = "8px";
  productCardCartBtn.style.borderRadius = "8px";
  productCardCartBtn.style.cursor = "pointer";

  return { productCardCartBtn };
};
