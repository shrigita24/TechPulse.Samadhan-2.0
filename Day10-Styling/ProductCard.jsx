const ProductCard = ({ name, price, image }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-64 hover:scale-105 transition-transform duration-300">
      <img src={image} alt={name} className="h-40 w-full object-cover rounded-lg" />
      <h2 className="text-lg font-semibold mt-2">{name}</h2>
      <p className="text-gray-600">${price}</p>
      <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
