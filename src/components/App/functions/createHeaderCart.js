export const createHeaderCart = () => {
  const headerCart = document.createElement("div");
  headerCart.style.display = "flex";
  headerCart.style.gap = "8px";

  return { headerCart };
};
