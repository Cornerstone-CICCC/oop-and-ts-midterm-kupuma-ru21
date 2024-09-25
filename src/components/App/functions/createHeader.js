export const createHeader = () => {
  const header = document.createElement("header");
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";
  header.style.outline = "1px solid gray";
  header.style.padding = "8px";
  header.style.position = "sticky";
  header.style.top = "0";
  header.style.backgroundColor = "#0F141A";
  header.style.color = "#fff";

  return { header };
};
