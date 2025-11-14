export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">☕</span>
            </div>
            <h1 className="text-2xl font-bold text-amber-800">BrewDelivery</h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-amber-700 hover:text-amber-900 font-medium">Home</a>
            <a href="#" className="text-amber-700 hover:text-amber-900 font-medium">Menu</a>
            <a href="#" className="text-amber-700 hover:text-amber-900 font-medium">Orders</a>
          </nav>
        </div>
      </div>
    </header>
  );
}