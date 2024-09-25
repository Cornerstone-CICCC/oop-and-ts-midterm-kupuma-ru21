export const createHeaderLogo = () => {
  const headerLogo = document.createElement("img");
  headerLogo.src = "/public/logo.svg";
  headerLogo.alt = "logo";
  headerLogo.style.width = "130px";
  headerLogo.style.height = "50px";

  return { headerLogo };
};
