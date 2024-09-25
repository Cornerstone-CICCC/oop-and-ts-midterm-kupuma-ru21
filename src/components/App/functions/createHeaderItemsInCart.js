export const createHeaderItemsInCart = () => {
  const headerItemsInCart = document.createElement("span");
  headerItemsInCart.textContent = "0";

  return { headerItemsInCart };
};
