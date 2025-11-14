export default function CoffeeMenu({ coffees, onSelectCoffee }) {
  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent mb-6">
          Our Artisan Coffee Selection
        </h2>
        <p className="text-amber-700 text-xl max-w-2xl mx-auto leading-relaxed">
          Handcrafted with premium beans and delivered fresh to your location. 
          Experience the perfect brew every time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {coffees.map((coffee, index) => (
          <div 
            key={coffee.id}
            className="coffee-card rounded-3xl shadow-xl overflow-hidden border border-amber-100 cursor-pointer animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onSelectCoffee(coffee)}
          >
            <div className="h-56 bg-gradient-to-br from-amber-300 to-amber-400 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <span className="text-7xl relative z-10">☕</span>
              <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                ₱{coffee.price}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold text-amber-900">{coffee.name}</h3>
              </div>
              <p className="text-amber-700 mb-6 leading-relaxed">{coffee.description}</p>
              <button className="btn-primary w-full text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg">
                Order This Brew
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <div className="inline-flex items-center space-x-4 text-amber-700 bg-amber-50 px-6 py-3 rounded-2xl">
          <span>🚚</span>
          <span className="font-medium">Free delivery on orders over ₱300</span>
        </div>
      </div>
    </div>
  );
}