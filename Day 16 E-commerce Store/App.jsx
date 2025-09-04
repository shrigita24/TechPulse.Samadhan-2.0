import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/products").then((res) => setProducts(res.data));
  }, []);

  const addToCart = (product) => setCart([...cart, product]);

  const checkout = async () => {
    const res = await axios.post("http://localhost:5000/checkout", { cart });
    alert(res.data.message);
    setCart([]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🛒 My Store</h1>

      {/* Product Catalog */}
      <div className="grid grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="border p-4 rounded shadow">
            <img src={p.image} alt={p.name} className="mb-2" />
            <h2 className="font-semibold">{p.name}</h2>
            <p>${p.price}</p>
            <button
              onClick={() => addToCart(p)}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart */}
      <div className="mt-8 p-4 border rounded">
        <h2 className="text-xl font-bold">🛍 Cart ({cart.length})</h2>
        {cart.map((c, i) => (
          <p key={i}>{c.name} - ${c.price}</p>
        ))}
        {cart.length > 0 && (
          <button
            onClick={checkout}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
