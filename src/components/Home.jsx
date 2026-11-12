
import HomeSlider from "./HomeSlider";
import ProductSlider from "./ProductSlider";
import { cat } from "../Data";
import { useEffect, useState } from "react";
function Home() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const results = await Promise.all(
          cat.map(async (cat) => {
            const res = await fetch(
              `https://dummyjson.com/products/category/${cat}`,
            );
            const data = await res.json();
            return { [cat]: data.products };
          }),
        );

        const productsData = Object.assign({}, ...results);
        setProducts(productsData);
      } catch (error) {
        console.error("Error Fetching", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      <HomeSlider />
      {loading ? (
        <p style={{ textAlign: "center", marginTop: "60px" }}>Loading...</p>
      ) : (
        cat.map((catt, index) => {
          return (
            <ProductSlider
              key={index}
              title={catt.replace("-", " ")}
              data={products[catt]}
            />
          );
        })
      )}
    </>
  );
}
export default Home;
