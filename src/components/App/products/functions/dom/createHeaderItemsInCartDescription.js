export const createHeaderItemsInCartDescription = () => {
  const headerItemsInCartDescription = document.createElement("span");
  headerItemsInCartDescription.textContent = "Items in Cart: ";

  return { headerItemsInCartDescription };
};
