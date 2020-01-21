import React from "react";
import { useSpring, animated } from "react-spring";
import "./App.css";

const products = [
  {
    name: "Plateau Comfy Chair",
    price: "$1,099.00",
    img:
      "https://images.eq3.com/product-definitions/ck2yw3xvx00a20106ws05xst6/instance/ck3dj3l4w0ppb014673adsufa/THUMBNAIL/c96ffac3-d665-424a-b9ce-2e82ea652fe5.jpg",
    description:
      "The Plateau collection is recognized for its elevated frame and architectural design aesthetic. It consists of a thin profile with wide range of movement, offering additional comfort. The seat cushions are made of various layers of foam and memory foam, which results in a balanced seating experience. Either a blind-pull back cushion or a feather-filled back cushion are cushion treatment options within the Plateau collection.",
    remaining: 5
  },
  {
    name: "Elise",
    price: "$799.00",
    img:
      "https://images.eq3.com/product-definitions/cjv42n6ou02dp01905o36g5ea/instance/cjv42q0a902e101903j28wyxs/THUMBNAIL/6bd25c6e-8a20-45a1-b14e-6f251b604553.jpg",
    description:
      "The vintage inspired Elise is ideal for small spaces. Tailored and compact, it features a button tufted bench seat and back, and no sag spring suspension.",
    remaining: 0
  }
];

export default function App() {
  return (
    <div className="container">
      <Nav />

      {products.map(product => (
        <Product {...product} key={product.name} />
      ))}
    </div>
  );
}

export const Nav = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <nav data-testid="nav" className={open ? "open" : null}>
      <button
        onClick={() => {
          setOpen(!open);
        }}
        data-testid="hamburger"
      >
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAKElEQVRIiWNgGAXDHjAisf/TwmwmKhs6CgYhGE1Fo4ByMJqKRsEQAADWCQMKYvEFtQAAAABJRU5ErkJggg=="
          alt="hamburger"
        />
      </button>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/products">Products</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    </nav>
  );
};

const Product = ({ name, price, description, img, remaining }) => {
  const [nameFirst, ...nameRest] = name.split(" ");

  return (
    <SpringIn>
      <div className="card row">
        <div className="half">
          <h2>
            <span className="product--title__large">{nameFirst}</span>
            {nameRest.length > 0 && (
              <span className="product--title__small">
                {nameRest.join(" ")}
              </span>
            )}
          </h2>
          <span className="product--price">{price}</span>

          <img className="product-image" src={img} alt={name} />
        </div>

        <div className="half">
          <p>{description}</p>

          {remaining === 0 ? (
            <span className="product-sold-out">Sold Out</span>
          ) : (
            <span className="product-remaining">{remaining} remaining</span>
          )}
        </div>

        <AddToCart available={remaining > 0} />
      </div>
    </SpringIn>
  );
};

export const AddToCart = ({ available }) => {
  if (!available) return null;

  return (
    <div className="full tr">
      <button className="product--cart-button">Add to Cart</button>
    </div>
  );
};

const SpringIn = ({ children, show = true }) => {
  const props = useSpring({
    opacity: show ? 1 : 0,
    from: { opacity: 0 },
    config: { mass: 10, tension: 10, friction: 10 }
  });
  return <animated.div style={props}>{children}</animated.div>;
};
