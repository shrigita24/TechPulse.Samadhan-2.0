import ProductCard from "./ProductCard";

const products = [
  { name: "Laptop", price: 999, image: "https://via.placeholder.com/150" },
  { name: "Headphones", price: 199, image: "https://via.placeholder.com/150" },
  { name: "Smartphone", price: 699, image: "https://via.placeholder.com/150" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
    </div>
  );
}
