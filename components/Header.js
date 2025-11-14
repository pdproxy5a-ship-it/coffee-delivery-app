export default function Header() {
  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-amber-200/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">☕</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent">
                BrewDelivery
              </h1>
              <p className="text-amber-600 text-sm">Fresh Coffee to Your Door</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-amber-700 hover:text-amber-900 font-medium transition-colors duration-200 hover:scale-105 transform">
              Home
            </a>
            <a href="#" className="text-amber-700 hover:text-amber-900 font-medium transition-colors duration-200 hover:scale-105 transform">
              Menu
            </a>
            <a href="#" className="text-amber-700 hover:text-amber-900 font-medium transition-colors duration-200 hover:scale-105 transform">
              Orders
            </a>
            <a href="#" className="text-amber-700 hover:text-amber-900 font-medium transition-colors duration-200 hover:scale-105 transform">
              Contact
            </a>
          </nav>

          <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-amber-500/25">
            Order Now
          </button>
        </div>
      </div>
    </header>
  );
}