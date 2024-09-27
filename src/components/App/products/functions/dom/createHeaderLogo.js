export const createHeaderLogo = () => {
  const headerLogo = document.createElement("button");
  headerLogo.style.all = "unset";
  headerLogo.style.cursor = "pointer";
  headerLogo.onclick = () => {
    history.pushState({}, "", "/");
  };

  const headerImg = document.createElement("img");
  headerImg.src = "/public/logo.svg";
  headerImg.alt = "logo";
  headerImg.style.width = "130px";
  headerImg.style.height = "50px";
  headerLogo.appendChild(headerImg);

  return { headerLogo };
};
