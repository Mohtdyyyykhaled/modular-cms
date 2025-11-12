import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Search, Star, ShoppingBag } from 'lucide-react';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Prodotti di esempio
  const products = [
    {
      id: 1,
      name: 'Prodotto Premium',
      description: 'Descrizione del prodotto premium con caratteristiche avanzate',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      category: 'electronics',
      rating: 4.5,
      stock: 15,
    },
    {
      id: 2,
      name: 'Accessorio Elegante',
      description: 'Accessorio di alta qualità per il tuo stile',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      category: 'accessories',
      rating: 4.8,
      stock: 8,
    },
    {
      id: 3,
      name: 'Gadget Moderno',
      description: 'Il gadget più moderno del momento',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
      category: 'electronics',
      rating: 4.2,
      stock: 12,
    },
    {
      id: 4,
      name: 'Prodotto Esclusivo',
      description: 'Edizione limitata disponibile solo qui',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
      category: 'premium',
      rating: 5.0,
      stock: 5,
    },
    {
      id: 5,
      name: 'Accessorio Base',
      description: 'Accessorio essenziale per uso quotidiano',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      category: 'accessories',
      rating: 4.0,
      stock: 20,
    },
    {
      id: 6,
      name: 'Prodotto Standard',
      description: 'Prodotto di qualità standard a prezzo accessibile',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400',
      category: 'standard',
      rating: 4.3,
      stock: 25,
    },
  ];

  const categories = [
    { id: 'all', name: 'Tutti' },
    { id: 'electronics', name: 'Elettronica' },
    { id: 'accessories', name: 'Accessori' },
    { id: 'premium', name: 'Premium' },
    { id: 'standard', name: 'Standard' },
  ];

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(
      cart.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0
            ? { ...item, quantity: newQuantity }
            : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <ShoppingBag className="text-accent" size={32} />
            Shop
          </h1>
          <p className="text-gray-400">Esplora i nostri prodotti</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="glass px-4 py-2 rounded-lg flex items-center gap-3">
            <ShoppingCart size={20} />
            <span className="font-medium">
              Carrello ({totalItems} {totalItems === 1 ? 'prodotto' : 'prodotti'})
            </span>
            {totalPrice > 0 && (
              <span className="text-accent font-bold">
                €{totalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Filtri e ricerca */}
      <div className="glass p-4 rounded-xl space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cerca prodotti..."
            className="input-glass w-full pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedCategory === category.id
                  ? 'bg-accent text-white'
                  : 'glass hover:bg-white/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Carrello espandibile */}
      {cart.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 rounded-xl"
        >
          <h2 className="text-xl font-bold mb-4">Carrello</h2>
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="glass-light p-4 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-400">
                      €{item.price.toFixed(2)} ciascuno
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="btn-glass p-2"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-medium w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="btn-glass p-2"
                  >
                    <Plus size={16} />
                  </button>
                  <span className="font-bold text-accent w-20 text-right">
                    €{(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="btn-glass text-danger hover:bg-danger/20 p-2 ml-2"
                  >
                    Rimuovi
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
            <span className="text-xl font-bold">Totale:</span>
            <span className="text-2xl font-bold text-accent">
              €{totalPrice.toFixed(2)}
            </span>
          </div>
          <button className="w-full mt-4 btn-primary flex items-center justify-center gap-2">
            <ShoppingCart size={20} />
            Procedi al Checkout
          </button>
        </motion.div>
      )}

      {/* Griglia prodotti */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-6 rounded-xl hover:bg-white/15 transition-all group"
          >
            <div className="mb-4 rounded-lg overflow-hidden relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 glass px-2 py-1 rounded flex items-center gap-1">
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <span className="text-xs font-medium">{product.rating}</span>
              </div>
              {product.stock < 10 && (
                <div className="absolute top-2 left-2 bg-danger/80 text-white px-2 py-1 rounded text-xs font-medium">
                  Pochi disponibili
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-accent">
                €{product.price.toFixed(2)}
              </span>
              <span className="text-xs text-gray-400">
                {product.stock} disponibili
              </span>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              Aggiungi al Carrello
            </button>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 glass rounded-xl">
          <p className="text-gray-400">Nessun prodotto trovato</p>
        </div>
      )}
    </div>
  );
};

export default Shop;



