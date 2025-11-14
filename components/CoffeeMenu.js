export default function CoffeeMenu({ coffees, onSelectCoffee }) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-amber-900 mb-4">Our Coffee Selection</h2>
        <p className="text-amber-700 text-lg">Choose your favorite brew and we'll deliver it to you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coffees.map((coffee) => (
          <div 
            key={coffee.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1 transition-transform"
            onClick={() => onSelectCoffee(coffee)}
          >
            <div className="h-48 bg-amber-200 flex items-center justify-center">
              <span className="text-6xl">☕</span>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-amber-900">{coffee.name}</h3>
                <span className="text-amber-600 font-bold">₱{coffee.price}</span>
              </div>
              <p className="text-amber-700 mb-4">{coffee.description}</p>
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}