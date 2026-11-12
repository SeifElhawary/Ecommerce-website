import Product from "./Product";
import "../styles/SlideProduct.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
function ProductSlider({ title, desc, data }) {
  return (
    <div className="productSlider">
      <div className="container">
        <div className="top">
          <h2>{title}</h2>
          <p>{desc}</p>
        </div>
        <Splide
          options={{
            perPage: 5,
            arrows: true,
            pagination: false,
            gap: 0,
            breakpoints: {
              1200: {
                perPage: 4,
              },
              992: {
                perPage: 3,
              },
              768: {
                perPage: 2,
              },
              480: {
                perPage: 1,
              },
            },
          }}
        >
          {data.length > 0
            ? data.map((item, index) => {
                return (
                  <SplideSlide key={index}>
                    <Product
                      key={index}
                      name={item.title}
                      img={item.images[0]}
                      price={item.price}
                      id = {item.id}
                      item ={item}
                      oldprice={
                        item.discountPercentage * item.price + item.price ||
                        0
                      }
                    />
                  </SplideSlide>
                );
              })
            : ""}
        </Splide>
      </div>
    </div>
  );
}

export default ProductSlider;
