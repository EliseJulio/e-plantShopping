import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/cart/CartSlice.jsx';

const photo = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;

export const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { id: 'monstera-deliciosa', name: 'Monstera Deliciosa', price: 38, image: photo('photo-1501004318641-b39e6451bec6'), description: 'A sculptural favorite with iconic split leaves.' },
      { id: 'snake-plant', name: 'Golden Snake Plant', price: 26, image: photo('photo-1509423350716-97f9360b4e09'), description: 'A resilient, upright beauty for any bright corner.' },
      { id: 'peace-lily', name: 'Peace Lily', price: 32, image: photo('photo-1593691509543-c55fb32e5cee'), description: 'Glossy foliage and elegant, soft white blooms.' },
      { id: 'golden-pothos', name: 'Golden Pothos', price: 22, image: photo('photo-1614594975525-e45190c55d0b'), description: 'A cheerful trailing plant that loves to climb.' },
      { id: 'rubber-plant', name: 'Ruby Rubber Plant', price: 44, image: photo('photo-1597055181300-a8dd5f4e6ec4'), description: 'Deep burgundy leaves bring a rich, bold color.' },
      { id: 'calathea-orbifolia', name: 'Calathea Orbifolia', price: 36, image: photo('photo-1597055181449-b9b5c0a1d531'), description: 'Silvery patterned leaves with a gentle presence.' }
    ]
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { id: 'zz-plant', name: 'ZZ Plant', price: 29, image: photo('photo-1509423350716-97f9360b4e09'), description: 'Glossy leaves and an easygoing nature.' },
      { id: 'jade-plant', name: 'Jade Plant', price: 19, image: photo('photo-1501004318641-b39e6451bec6'), description: 'A compact succulent for a sunny windowsill.' },
      { id: 'aloe-vera', name: 'Aloe Vera', price: 21, image: photo('photo-1593691509543-c55fb32e5cee'), description: 'A useful, sun-loving succulent with sculptural leaves.' },
      { id: 'cast-iron-plant', name: 'Cast Iron Plant', price: 34, image: photo('photo-1597055181449-b9b5c0a1d531'), description: 'A dependable leafy plant for relaxed care routines.' },
      { id: 'spider-plant', name: 'Spider Plant', price: 24, image: photo('photo-1614594975525-e45190c55d0b'), description: 'Arching green leaves bring a playful touch.' },
      { id: 'heartleaf-philodendron', name: 'Heartleaf Philodendron', price: 27, image: photo('photo-1597055181300-a8dd5f4e6ec4'), description: 'A classic trailing plant with heart-shaped leaves.' }
    ]
  },
  {
    category: 'Flowering Plants',
    plants: [
      { id: 'anthurium', name: 'Red Anthurium', price: 39, image: photo('photo-1593691509543-c55fb32e5cee'), description: 'Bright, heart-shaped blooms stand out in any room.' },
      { id: 'orchid', name: 'White Orchid', price: 42, image: photo('photo-1501004318641-b39e6451bec6'), description: 'Elegant blooms add a graceful finishing touch.' },
      { id: 'african-violet', name: 'African Violet', price: 18, image: photo('photo-1614594975525-e45190c55d0b'), description: 'Colorful flowers for a cheerful tabletop.' },
      { id: 'bromeliad', name: 'Bromeliad', price: 35, image: photo('photo-1597055181300-a8dd5f4e6ec4'), description: 'A tropical rosette with a vivid center.' },
      { id: 'kalanchoe', name: 'Kalanchoe', price: 20, image: photo('photo-1597055181449-b9b5c0a1d531'), description: 'Long-lasting clusters of colorful little flowers.' },
      { id: 'lipstick-plant', name: 'Lipstick Plant', price: 31, image: photo('photo-1593691509543-c55fb32e5cee'), description: 'Trailing foliage with striking red blooms.' }
    ]
  },
  {
    category: 'Pet Friendly Plants',
    plants: [
      { id: 'parlor-palm', name: 'Parlor Palm', price: 28, image: photo('photo-1509423350716-97f9360b4e09'), description: 'A graceful palm that is happy in soft light.' },
      { id: 'boston-fern', name: 'Boston Fern', price: 25, image: photo('photo-1614594975525-e45190c55d0b'), description: 'Feathery green fronds bring a woodland feel.' },
      { id: 'calathea-medallion', name: 'Calathea Medallion', price: 33, image: photo('photo-1597055181449-b9b5c0a1d531'), description: 'Patterned leaves open and fold with the light.' },
      { id: 'prayer-plant', name: 'Prayer Plant', price: 27, image: photo('photo-1597055181300-a8dd5f4e6ec4'), description: 'Colorful leaf markings make this plant a standout.' },
      { id: 'ponytail-palm', name: 'Ponytail Palm', price: 37, image: photo('photo-1501004318641-b39e6451bec6'), description: 'A playful sculptural plant for a sunny spot.' },
      { id: 'haworthia', name: 'Haworthia', price: 16, image: photo('photo-1593691509543-c55fb32e5cee'), description: 'A petite succulent with distinctive striped leaves.' }
    ]
  }
];

const allPlants = plantsArray.flatMap(({ category, plants }) =>
  plants.map((plant) => ({ ...plant, category }))
);

export function Navbar({ currentPage, onNavigate }) {
  const cartItems = useSelector((state) => state.cart.items);
  const cart_quantity_count = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="navbar site-header">
      <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); onNavigate('home'); }}>
        <span className="brand-mark" aria-hidden="true">✿</span>
        <span>Paradise <em>Nursery</em></span>
      </a>
      <nav aria-label="Main navigation">
        <button className={currentPage === 'home' ? 'nav-link active' : 'nav-link'} onClick={() => onNavigate('home')} type="button">Home</button>
        <button className={currentPage === 'shop' ? 'nav-link active' : 'nav-link'} onClick={() => onNavigate('shop')} type="button">Plants</button>
        <button className={currentPage === 'about' ? 'nav-link active' : 'nav-link'} onClick={() => onNavigate('about')} type="button">About</button>
        <button className={currentPage === 'cart' ? 'cart-link active' : 'cart-link'} onClick={() => onNavigate('cart')} type="button" aria-label={`Cart, ${cart_quantity_count} items`}>
          <span className="cart-icon" aria-hidden="true">🛒</span> Cart <span className="cart_quantity_count">{cart_quantity_count}</span>
        </button>
      </nav>
    </header>
  );
}

export default function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cart_quantity_count = cartItems.reduce((total, item) => total + item.quantity, 0);
  const addedToCart = Object.fromEntries(cartItems.map((item) => [item.name, true]));
  const [category, setCategory] = useState('All plants');
  const [search, setSearch] = useState('');
  const visiblePlants = useMemo(
    () => allPlants.filter((plant) => {
      const matchesCategory = category === 'All plants' || plant.category === category;
      const matchesSearch = plant.name.toLowerCase().includes(search.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    }),
    [category, search]
  );

  return (
    <>
    <Navbar currentPage="shop" onNavigate={onNavigate} />
    <section className="catalog-section" aria-labelledby="catalog-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Find your new favorite</p>
          <h2 id="catalog-title">Plants for every kind of home</h2>
          <p className="cart-count-summary">Plants in your cart: <span className="cart_quantity_count">{cart_quantity_count}</span></p>
        </div>
        <label className="search-label">
          <span className="sr-only">Search plants</span>
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search plants" />
        </label>
      </div>

      <div className="category-list" aria-label="Filter plants by category">
        {['All plants', ...plantsArray.map(({ category: name }) => name)].map((name) => (
          <button className={`category-button${category === name ? ' selected' : ''}`} key={name} onClick={() => setCategory(name)} type="button">
            {name}
          </button>
        ))}
      </div>

      {plantsArray
        .filter(({ category: name }) => category === 'All plants' || category === name)
        .map(({ category: name, plants }) => {
          const categoryPlants = plants.filter((plant) =>
            plant.name.toLowerCase().includes(search.trim().toLowerCase())
          );
          if (categoryPlants.length === 0) return null;
          return (
            <section className="plant-category" key={name} aria-labelledby={`category-${name}`}>
              <h3 id={`category-${name}`}>{name}</h3>
              <div className="product-grid">
                {categoryPlants.map((plant) => (
                  <article className="product-card" key={plant.id}>
                    <img alt={plant.name} loading="lazy" src={plant.image} />
                    <div className="product-info">
                      <p className="product-category">{name}</p>
                      <h4>{plant.name}</h4>
                      <p className="product-description">{plant.description}</p>
                      <div className="product-buy-row">
                        <strong>${plant.price.toFixed(2)}</strong>
                        <button
                          className="button button-small"
                          disabled={Boolean(addedToCart[plant.name])}
                          onClick={() => dispatch(addItem(plant))}
                          type="button"
                        >
                          {addedToCart[plant.name] ? 'Added to cart' : 'Add to cart'}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      {visiblePlants.length === 0 && <p className="empty-state">No plants match that search. Try another name.</p>}
    </section>
    </>
  );
}
