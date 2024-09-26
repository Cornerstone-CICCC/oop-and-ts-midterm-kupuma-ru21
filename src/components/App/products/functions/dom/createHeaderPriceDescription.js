export const createHeaderPriceDescription = () => {
  const headerPriceDescription = document.createElement("span");
  headerPriceDescription.textContent = "/ Total Price: $ ";

  return { headerPriceDescription };
};
