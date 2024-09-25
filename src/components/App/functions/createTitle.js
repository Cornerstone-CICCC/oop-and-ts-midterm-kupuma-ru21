export const createTitle = () => {
  const title = document.createElement("h1");
  title.textContent = "Products";
  title.style.marginBottom = "20px";

  return { title };
};
