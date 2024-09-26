export const getProducts = async () => {
  const productsData = await fetch("https://fakestoreapi.com/products");
  const products = await productsData.json();
  return { products };
};
