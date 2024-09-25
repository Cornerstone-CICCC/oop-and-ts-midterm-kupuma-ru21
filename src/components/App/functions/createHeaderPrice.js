export const createHeaderPrice = () => {
  const headerPrice = document.createElement("span");
  headerPrice.textContent = "0";

  return { headerPrice };
};
