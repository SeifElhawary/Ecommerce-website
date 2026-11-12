import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Img1 from '../assets/banner_Hero1.jpg'
import Img2 from '../assets/banner_Hero2.jpg'
import Img3 from '../assets/banner_Hero3.jpg'
function HomeSlider() {
  return (
    <div className="container homeSlider">
<Splide options={{
    perPage: 1,
    arrows: true,
    pagination: true,
  }}>
  <SplideSlide className="slide">
    <img src={Img1} />
    <div className="info">
        <span>INTRODUCING THE NEW</span>
        <h2>Microsoft Xbox 360 Controller</h2>
        <p>Windows Xp/10/7/8 Ps3, Tv Box</p>
        <button>Shop Now</button>
    </div>
  </SplideSlide>
  <SplideSlide className="slide">
    <img src={Img2} />
    <div className="info">
        <span>INTRODUCING THE NEW</span>
        <h2>Smart Wireless Audio Hub</h2>
        <p>Crystal Clear Sound, Compact Design</p>
        <button>Shop Now</button>
    </div>
  </SplideSlide>
  <SplideSlide className="slide">
    <img src={Img3} />
    <div className="info">
        <span>INTRODUCING THE NEW</span>
        <h2>Classic Digital Media Player</h2>
        <p>High-Fidelity Sound On-The-Go</p>
        <button>Shop Now</button>
    </div>
  </SplideSlide>
</Splide>
    </div>
  )
}

export default HomeSlider